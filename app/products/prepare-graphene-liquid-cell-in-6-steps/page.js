import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Prepare Graphene Liquid Cell in 6 Steps",
  description:
    "Infographic guide to preparing Graphene Liquid Cells with the Naiad system.",
};

export default function PrepareGlcPage() {
  return (
    <main>
      <PageHero
        title="Prepare Graphene Liquid Cell in 6 Steps"
        lede="Our innovative Naiad system simplifies preparing Graphene Liquid Cells for TEM imaging."
      />

      <section className="section content-block">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            Infographic – Prepare Graphene Liquid Cell in 6 Steps
          </Reveal>
          <Reveal as="p">
            Our “Prepare Graphene Liquid Cell in 6 Steps” guide walks you through
            using our automated GLC preparation system, making it easy to achieve
            high-resolution imaging of liquid-phase samples without complicated
            sample preparation.
          </Reveal>
          <Reveal as="p">
            With the Naiad system, graphene liquid cell assembly becomes an easy
            task. The Naiad automates the preparation of graphene sheets and
            assembles GLCs containing liquid-based samples on standard TEM grids.
            GLC grids are ready to image in a matter of minutes.
          </Reveal>
          <Reveal as="ol" className="feature-list numbered">
            <li>Load Graphene-on-Copper Disk</li>
            <li>Automated copper etch and graphene rinse</li>
            <li>Transfer graphene to the TEM grid</li>
            <li>Introduce your liquid sample</li>
            <li>Seal the graphene liquid cell</li>
            <li>Image in a conventional TEM holder</li>
          </Reveal>
          <Reveal>
            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="https://www.youtube.com/watch?v=Op7mBZvriCw"
                target="_blank"
                rel="noreferrer"
              >
                Watch how it works
              </a>
              <Link className="btn btn-ghost" href="/contact">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
