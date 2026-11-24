import Link from "next/link";
import { FOOTER_NAV } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site-footer main-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            className="footer-mark"
            src="/images/Tekengebied-3@2x.png"
            alt=""
          />
          <p>
            Head Office
            <br />
            Science Park 106
            <br />
            1098 XG Amsterdam
            <br />
            The Netherlands
          </p>
          <p>Chamber of Commerce number: 76715221</p>
          <p>
            <a href="mailto:info@vitrotem.com">info@vitrotem.com</a>
          </p>
          <p className="footer-social">
            <a
              href="https://www.linkedin.com/company/vitrotem/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            {" · "}
            <a
              href="https://www.youtube.com/channel/UCz94uyWgc0cq6k14C_DmX0Q"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
          </p>
        </div>

        {FOOTER_NAV.map((column) => (
          <div key={column.title} className="footer-col">
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container footer-legal">
        <p>
          2020 © Copyright, VitroTEM. All Rights Reserved ·{" "}
          <a href="https://vitrotem.com/privacy-statement/" rel="noreferrer">
            Privacy statement
          </a>{" "}
          · Cookie policy
        </p>
      </div>
    </footer>
  );
}
