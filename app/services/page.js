import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Services",
  description:
    "GLC fabrication service and pioneering application discovery with VitroTEM.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="Services"
        lede="GLC fabrication and collaborative application discovery for your research."
      />

      <section className="section content-block">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            GLC fabrication service
          </Reveal>
          <Reveal as="p">
            Vitrotem offers GLC fabrication for your samples. The preparation can
            be performed within your own laboratory or at Vitrotem, depending on
            what your samples require. Contact us to find out how we can be of
            help with your in-vitro research.
          </Reveal>
        </div>
      </section>

      <section className="section content-block alt">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            Pioneering application discovery
          </Reveal>
          <Reveal as="p">
            Do you envision innovative application of our technology in your
            business or research? We welcome the opportunity to discuss with you.
            Vitrotem is continuously looking for new application areas of our
            proprietary graphene and transfer technology inside and outside the
            field of transmission electron microscopy.
          </Reveal>
          <Reveal as="p">
            Our in-house grown single layer graphene is unmatched in cleanliness
            and optimized for use as a substrate in transmission electron
            microscopy. Our unique graphene transfer technology avoids the use of
            transfer polymers, resulting in macroscopic area, contaminant-free
            graphene. Our transfer technology is suitable for automation.
          </Reveal>
          <Reveal>
            <Link className="btn btn-primary" href="/contact">
              Discuss services
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
