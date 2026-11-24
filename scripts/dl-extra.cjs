const https = require("https");
const fs = require("fs");
const path = require("path");

const files = [
  "https://vitrotem.com/wp-content/uploads/2020/11/triangle-left.png",
  "https://vitrotem.com/wp-content/uploads/2020/11/triangle-right.png",
  "https://vitrotem.com/wp-content/uploads/2023/04/Scherm-afbeelding-2023-04-21-om-12.50.38-e1682074296127.png",
];

function dl(url) {
  return new Promise((resolve, reject) => {
    const name = path.basename(new URL(url).pathname);
    const dest = path.join("public", "images", name);
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          dl(res.headers.location).then(resolve, reject);
          return;
        }
        console.log(name, res.statusCode);
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(name)));
      })
      .on("error", reject);
  });
}

(async () => {
  for (const u of files) await dl(u);
  console.log(fs.readdirSync("public/images").join("\n"));
})();
