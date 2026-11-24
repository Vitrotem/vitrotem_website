const fs = require("fs");
const https = require("https");
const http = require("http");
const { URL } = require("url");
const path = require("path");

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchText(res.headers.location).then(resolve, reject);
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          download(res.headers.location, dest).then(resolve, reject);
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(dest)));
      })
      .on("error", reject);
  });
}

(async () => {
  const html = await fetchText("https://vitrotem.com/");
  fs.writeFileSync("vitrotem-raw.html", html);
  const urls = [
    ...html.matchAll(
      /https:\/\/vitrotem\.com\/wp-content\/uploads\/[^"'\\\s>]+\.(?:jpg|jpeg|png|webp)/gi
    ),
  ].map((m) => m[0]);
  const unique = [...new Set(urls)];
  console.log(unique.join("\n"));

  const outDir = path.join("public", "images");
  fs.mkdirSync(outDir, { recursive: true });

  // Key visuals from homepage (hero/testimonials/apps/partners)
  const wanted = unique.filter((u) =>
    /LogoVitroTEM|Picture-|Scherm-afbeelding|AwardMM|Utrecht|Erasmus|Leiden|Radbout|TU-Delft|Naiad|hero|banner|slider|homepage|header/i.test(
      u
    )
  );

  // Also grab any large-ish named assets referenced near style backgrounds
  const styleUrls = [
    ...html.matchAll(/url\((['"]?)(https?:\/\/[^)'"]+)\1\)/gi),
  ].map((m) => m[2]);

  const all = [...new Set([...wanted, ...styleUrls.filter((u) => /uploads/i.test(u))])];
  console.log("\nDownloading", all.length, "assets...");
  for (const url of all) {
    const name = path.basename(new URL(url).pathname);
    const dest = path.join(outDir, name);
    try {
      await download(url, dest);
      console.log("ok", name);
    } catch (e) {
      console.log("fail", name, e.message);
    }
  }
})();
