import Link from "next/link";
import Reveal from "@/components/Reveal";
import { NEWS } from "@/lib/content";

export const metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-verloop" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow">VitroTEM</p>
          <h1>Graphene liquid cells at a click</h1>
          <p className="lede">
            Vitrotem automates graphene liquid cell assembly to bring
            high-resolution liquid phase TEM imaging within reach in your
            research. Innovate now.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/products">
              Explore products
            </Link>
            <Link className="btn btn-ghost" href="/applications">
              View applications
            </Link>
          </div>
        </div>
      </section>

      <section className="section intro triangles">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            Introducing Naiad
          </Reveal>
          <Reveal as="p" className="section-sub">
            The Future of Graphene Liquid Cell Fabrication
          </Reveal>
          <Reveal className="intro-with-media">
            <div>
              <p>
                Naiad automates graphene preparation and assembles Graphene
                Liquid Cells on standard TEM grids — ready to image in minutes,
                without specialized sample holders.
              </p>
              <div className="hero-actions" style={{ marginTop: "1.25rem" }}>
                <Link className="btn btn-primary" href="/products">
                  Products
                </Link>
                <Link className="btn btn-ghost" href="/download-brochure">
                  Download brochure
                </Link>
              </div>
            </div>
            <figure className="intro-award">
              <Link href="/news/vitrotem-wins-microscopy-today-innovation-award-2025">
                <img
                  src="/images/AwardMM-today-21082025.png"
                  alt="Microscopy Today Innovation Award 2025"
                />
              </Link>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section apps">
        <div className="container">
          <Reveal as="h2" className="seperator-title">
            Explore the site
          </Reveal>
          <Reveal as="p" className="section-sub">
            Each area of VitroTEM has its own page — pick a destination below.
          </Reveal>
          <div className="home-dir-grid">
            <Reveal as="article" className="home-dir-card">
              <h3>
                <Link href="/products">Products</Link>
              </h3>
              <p>Naiad, GLC Kit, Liquids Pack, and graphene.</p>
            </Reveal>
            <Reveal as="article" className="home-dir-card">
              <h3>
                <Link href="/applications">Applications</Link>
              </h3>
              <p>Life sciences, materials science, and GLC spacers.</p>
            </Reveal>
            <Reveal as="article" className="home-dir-card">
              <h3>
                <Link href="/about-us">Company</Link>
              </h3>
              <p>About us, team, vacancies, and locations.</p>
            </Reveal>
            <Reveal as="article" className="home-dir-card">
              <h3>
                <Link href="/services">Resources</Link>
              </h3>
              <p>Services, FAQ, brochure, references, and newsletter.</p>
            </Reveal>
            <Reveal as="article" className="home-dir-card">
              <h3>
                <Link href="/news-and-events">News &amp; Events</Link>
              </h3>
              <p>Awards, conferences, and product updates.</p>
            </Reveal>
            <Reveal as="article" className="home-dir-card">
              <h3>
                <Link href="/contact">Contact</Link>
              </h3>
              <p>Reach the VitroTEM team about your research.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section news-teaser">
        <div className="container">
          <Reveal as="h2" className="seperator-title">
            Latest news
          </Reveal>
          <div className="news-list">
            {NEWS.slice(0, 3).map((item) => (
              <Reveal as="article" key={item.slug}>
                <Link href={`/news/${item.slug}`}>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link className="btn btn-ghost" href="/news-and-events">
              All news &amp; events
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
