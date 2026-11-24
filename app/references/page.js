import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { REFERENCES } from "@/lib/content";

export const metadata = {
  title: "References",
  description:
    "Scientific references on graphene liquid cells and liquid-phase electron microscopy.",
};

export default function ReferencesPage() {
  return (
    <main>
      <PageHero
        title="References"
        lede="Key literature on graphene in electron microscopy and liquid-phase TEM."
      />

      {REFERENCES.map((block, index) => (
        <section
          key={block.section}
          className={`section content-block${index % 2 ? " alt" : ""}`}
        >
          <div className="container narrow">
            <Reveal as="h2" className="seperator-title">
              {block.section}
            </Reveal>
            <Reveal as="p">{block.intro}</Reveal>
            <Reveal as="ul" className="reference-list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Reveal>
          </div>
        </section>
      ))}
    </main>
  );
}
