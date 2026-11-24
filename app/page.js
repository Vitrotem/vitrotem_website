import Link from "next/link";
import Reveal from "@/components/Reveal";
import { NEWS } from "@/lib/content";

export const metadata = {
  title: "Home",
};

const APPLICATIONS = [
  {
    href: "/applications#Life-Sciences",
    title: "Life Sciences",
    image: "/images/0002_Picture-3.png",
    alt: "Life sciences graphene liquid cell imaging",
  },
  {
    href: "/applications#Materials-Sciences",
    title: "Materials Science",
    image: "/images/0000_Picture-4.png",
    alt: "Materials science liquid-phase TEM",
  },
  {
    href: "/applications#Graphene-Liquid-Phase-Electron-Microscopy",
    title: "Liquid-Phase TEM",
    image: "/images/0004_Picture-6.png",
    alt: "Graphene liquid-phase electron microscopy",
  },
  {
    href: "/applications",
    title: "Nanoparticles",
    image: "/images/0001_Picture-2.png",
    alt: "Nanoparticle imaging in graphene liquid cells",
  },
  {
    href: "/applications#GLC-Spacers",
    title: "GLC Spacers",
    image: "/images/GLC1b.jpg",
    alt: "Graphene liquid cell spacers",
  },
  {
    href: "/graphene",
    title: "VitroTEM Graphene",
    image: "/images/0004_Picture-6-300x300.png",
    alt: "VitroTEM graphene",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero hero--home">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-verloop" aria-hidden="true" />
        <div className="container hero-content hero-content--centered">
          <p className="hero-brand">VitroTEM</p>
          <h1>Graphene liquid cells at a click</h1>
          <p className="hero-sub">
            Automate graphene liquid cell assembly for high-resolution
            liquid-phase TEM — with Naiad.
          </p>
          <div className="hero-actions hero-actions--center">
            <Link className="btn btn-primary" href="/products">
              Explore products
            </Link>
            <Link className="btn btn-ghost" href="/applications">
              View applications
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-intro">
        <div className="container home-intro__grid">
          <div className="home-intro__copy">
            <Reveal as="h2" className="home-intro__title">
              Introducing Naiad
            </Reveal>
            <Reveal as="p" className="home-intro__lede">
              The future of graphene liquid cell fabrication
            </Reveal>
            <Reveal as="p" className="home-intro__body">
              Our technology simplifies the assembly of Graphene Liquid Cells
              (GLCs), eliminating the need for specialized sample holders. Naiad
              enables TEM imaging of whole biological cells and nanoparticles in
              liquid, providing reliable and reproducible results across biology,
              materials science, and nanotechnology.
            </Reveal>
            <Reveal as="p" className="home-intro__body">
              Assemble GLCs in minutes on a conventional TEM grid — no
              specialized holders required — and image cells and nanoparticles
              in liquid at unprecedented resolution.
            </Reveal>
            <Reveal className="home-intro__actions">
              <Link className="home-feature__cta" href="/products#Naiad">
                <span>See how Naiad works</span>
                <span className="home-feature__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <a
                className="btn btn-ghost btn-ghost--ink"
                href="https://www.youtube.com/watch?v=CLjdJ_F22rw"
                target="_blank"
                rel="noreferrer"
              >
                Watch testimonials
              </a>
            </Reveal>
          </div>
          <Reveal as="figure" className="home-intro__media">
            <img
              src="/images/NAIAD.249-header-image-newnew-1.jpg"
              alt="Naiad automated graphene liquid cell system"
            />
          </Reveal>
        </div>
      </section>

      <section className="section home-tech">
        <div className="container home-tech__grid">
          <Reveal>
            <p className="section-kicker">Recognition</p>
            <h2 className="home-tech__title">
              Microscopy Today Innovation Award 2025
            </h2>
            <p>
              Naiad automates graphene preparation and assembles Graphene Liquid
              Cells containing liquid-based samples on conventional TEM grids.
              VitroTEM received the Microscopy Today Innovation Award 2025 for
              the automated Graphene Liquid Cell system — recognising precise
              microfluidic encapsulation for real-time in situ electron
              microscopy at the atomic scale.
            </p>
            <p>
              Using VitroTEM&apos;s fully automated loop-assisted transfer
              method, GLC fabrication becomes far more reproducible than manual
              approaches — and no specialized TEM holder is required.
            </p>
            <Link className="home-bar-cta" href="/products">
              <span>Browse Naiad and consumables</span>
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal as="figure" className="home-tech__award">
            <Link href="/news/vitrotem-wins-microscopy-today-innovation-award-2025">
              <img
                src="/images/AwardMM-today-21082025.png"
                alt="Microscopy Today Innovation Award 2025"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section home-apps">
        <div className="container">
          <Reveal as="h2" className="home-apps__title">
            Applications
          </Reveal>
          <Reveal as="p" className="section-sub">
            Graphene liquid cell TEM across life sciences, materials science,
            and nanotechnology.
          </Reveal>
          <div className="home-apps__grid">
            {APPLICATIONS.map((app) => (
              <Reveal key={app.title} as="article" className="home-apps__tile">
                <Link href={app.href}>
                  <img src={app.image} alt={app.alt} />
                  <h3>{app.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta-band">
        <div className="container narrow">
          <Reveal as="h2">Graphene liquid cells in your research?</Reveal>
          <Reveal as="p">
            The Naiad is a fully automatic system for the fabrication of
            graphene liquid cells. Become part of the innovation.
          </Reveal>
          <Reveal className="hero-actions hero-actions--center">
            <Link className="btn btn-primary" href="/contact">
              Contact us
            </Link>
            <Link
              className="btn btn-ghost btn-ghost--dark"
              href="/download-brochure"
            >
              Download brochure
            </Link>
          </Reveal>
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
            <Link
              className="btn btn-ghost btn-ghost--ink"
              href="/news-and-events"
            >
              All news &amp; events
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
