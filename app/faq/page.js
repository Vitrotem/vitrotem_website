import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { FAQ } from "@/lib/content";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about graphene liquid cells and the Naiad system.",
};

export default function FaqPage() {
  return (
    <main>
      <PageHero
        title="FAQ"
        lede="Common questions about graphene liquid cells and the Naiad system."
      />

      <section className="section faq content-block">
        <div className="container narrow">
          {FAQ.map((item, index) => (
            <Reveal as="details" key={item.q} open={index === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </Reveal>
          ))}
          <Reveal>
            <div className="hero-actions" style={{ marginTop: "1.5rem" }}>
              <Link className="btn btn-primary" href="/contact">
                Ask a question
              </Link>
              <Link className="btn btn-ghost" href="/products">
                View products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
