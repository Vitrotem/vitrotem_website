import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Graphene",
  description:
    "Premium single-layer VitroTEM graphene — home-grown, every batch analysed and validated.",
};

export default function GraphenePage() {
  return (
    <main>
      <PageHero
        title="Graphene"
        lede="Premium single layer graphene. Home-grown. Every batch analysed and validated."
      />

      <section className="section content-block">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            Vitrotem Graphene
          </Reveal>
          <Reveal as="p">
            Vitrotem guarantees automated transfer to TEM grids leading to full
            graphene coverage of the grid area.
          </Reveal>
          <Reveal as="p">
            To deliver on this promise Vitrotem single-layer graphene needs
            macro-scale continuity and mechanical stability retained through the
            transfer process. Vitrotem achieves this through optimized in-house
            chemical vapor deposition growth and extensive analysis including
            Raman, transfer performance tests and cleanliness validation on
            every batch.
          </Reveal>
          <Reveal as="p">
            Graphene chips sent out to customers show a &gt;99% success rate in
            full-coverage transfer to TEM grids in the Naiad beta system.
          </Reveal>
        </div>
      </section>

      <section className="section content-block alt">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            In your research
          </Reveal>
          <Reveal as="p">
            Vitrotem is not a commercial supplier of graphene. However, Vitrotem
            is keen to collaborate and innovate with researchers and companies
            in the field of high-end graphene applications. If you see
            opportunities for the use of our graphene within your research,
            product development or business, we welcome the chance to hear from
            you. Contact us and we will explore the ways in which Vitrotem’s
            technology, expertise and graphene can boost your projects.
          </Reveal>
          <Reveal>
            <Link className="btn btn-primary" href="/contact">
              Contact us about graphene
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
