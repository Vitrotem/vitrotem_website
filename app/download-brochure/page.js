import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Download Brochure and Specification Sheet",
  description:
    "Request the Naiad brochure and specification sheet from VitroTEM.",
};

export default function DownloadBrochurePage() {
  return (
    <main>
      <PageHero
        title="Download Brochure and Specification Sheet"
        lede="I would like to download the Naiad brochure and Specification Sheet."
      />

      <section className="section content-block">
        <div className="container narrow">
          <Reveal as="p">
            We take great pride in introducing Naiad, a revolutionary system that
            automates the fabrication of Graphene Liquid Cells with unparalleled
            accuracy and productivity. Our cutting-edge system enables researchers
            to attain consistent and replicable outcomes, simplifying
            high-resolution liquid-phase TEM imaging like never before.
          </Reveal>
          <Reveal as="p">
            Our brochure provides comprehensive insights into Naiad&apos;s
            attributes, technical details, software, and its diverse applications
            across multiple research fields. Complete the form to request the
            brochure and discover the complete capabilities of Naiad.
          </Reveal>
          <Reveal>
            <ContactForm
              submitLabel="Request brochure"
              fields={["name", "email", "message"]}
              note="Your request opens an email to VitroTEM. On the live site this delivers the brochure download."
            />
          </Reveal>
          <Reveal as="p" style={{ marginTop: "1.5rem" }}>
            You can also view the{" "}
            <a
              href="https://vitrotem.com/wp-content/uploads/2025/09/AwardMM-today-21082025.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Microscopy Today Innovation Award 2025 announcement (PDF)
            </a>
            .
          </Reveal>
        </div>
      </section>
    </main>
  );
}
