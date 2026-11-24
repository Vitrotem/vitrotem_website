import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { PARTNERS } from "@/lib/content";

export const metadata = {
  title: "About Us",
  description:
    "Enabling in-vitro electron microscopy — VitroTEM’s mission, history, and locations.",
};

export default function AboutUsPage() {
  return (
    <main>
      <PageHero
        title="About Us"
        lede="Enabling in-vitro electron microscopy"
      />

      <section className="section content-block">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            Enabling in-vitro electron microscopy
          </Reveal>
          <Reveal as="p">
            At VitroTEM, our goal is to improve the fundamental understanding of
            life by unlocking the power of electron microscopy to the analysis of
            biological materials and processes in liquid water, the native
            environment of biology. We empower life science researchers with easy
            to use tools and systems for the fabrication and use of Graphene
            Liquid Cells that enable dynamic analysis of biological material and
            processes at unprecedented resolution in standard electron microscopy
            systems.
          </Reveal>
        </div>
      </section>

      <section className="section content-block alt">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            History
          </Reveal>
          <Reveal as="p">
            VitroTEM was founded in 2019 as a spin-off of the University of
            Leiden, the Netherlands. The technology for the fabrication of GLC
            was developed by Pauline van Deursen as part of her PhD research
            project at the Laboratory for 2D materials, Graphene chemistry and
            Bionanotechnology of Dr. Gregory Schneider. The company has received
            seed funding by a consortium of investors lead by Nascent Ventures
            and received public funding from the Dutch Research Council (NWO) and
            Innovatie Fonds Noord-Holland, a regional development fund. The
            company is located at Sciencepark Amsterdam with a lab in Delft at
            Biotech Campus.
          </Reveal>
          <Reveal>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/team">
                Meet the team
              </Link>
              <Link className="btn btn-ghost" href="/address">
                Our locations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section partners content-block">
        <div className="container">
          <Reveal as="h2" className="seperator-title">
            Partners
          </Reveal>
          <Reveal className="partner-row">
            {PARTNERS.map((partner) => (
              <img key={partner.src} src={partner.src} alt={partner.alt} />
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
