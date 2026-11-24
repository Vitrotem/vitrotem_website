import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Newsletter",
  description: "Subscribe to the VitroTEM newsletter and browse past editions.",
};

export default function NewsletterPage() {
  return (
    <main>
      <PageHero
        title="Newsletter"
        lede="Sign up to receive news and updates. Browse past editions below."
      />

      <section className="section content-block">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            Subscribe to our newsletter
          </Reveal>
          <Reveal>
            <ContactForm
              submitLabel="Subscribe"
              fields={["name", "email"]}
              note="We’ll open your email client so you can confirm your subscription request."
            />
          </Reveal>
        </div>
      </section>

      <section className="section content-block alt">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            2025
          </Reveal>
          <Reveal as="ul" className="feature-list">
            <li>
              [01-01-2025] Enhance Your Research with Ultra-Thin Graphene Liquid
              Cells
            </li>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
