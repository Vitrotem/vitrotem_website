import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Download Application Note",
  description:
    "Revolutionizing Wet Sample Electron Microscopy with LVEM and GLCs — Delong America and VitroTEM.",
};

export default function DownloadApplicationNotePage() {
  return (
    <main>
      <PageHero
        title="Download Application Note"
        lede="Revolutionizing Wet Sample Electron Microscopy with LVEM and GLCs — By Delong America and VitroTEM"
      />

      <section className="section content-block">
        <div className="container narrow">
          <Reveal as="p">
            Discover the future of molecular imaging with our groundbreaking
            scientific paper on liquid phase electron microscopy using Graphene
            Liquid Cells (GLCs) and Low Voltage Electron Microscopy (LVEM). This
            innovative combination allows for the unprecedented visualization of
            organic samples in their natural, hydrated environments, providing
            researchers with unparalleled insights.
          </Reveal>
          <Reveal as="p">
            The combination of our automated, easy-to-implement encapsulation
            procedure with low voltage electron microscopy revolutionizes how
            samples are observed, delivering uniquely high contrast and
            resolution. By addressing the historical challenges of low contrast
            and electron beam sensitivity in organic materials, this approach
            preserves sample integrity while enhancing clarity.
          </Reveal>
          <Reveal as="p">
            Overcome previous limitations of wet sample imaging and explore the
            intricate molecular features with enhanced clarity and real-time
            dynamics. Whether you&apos;re delving into molecular biology,
            materials science, or any field requiring detailed visualization of
            hydrated samples, our method sets a new standard for precision and
            accuracy.
          </Reveal>
          <Reveal>
            <ContactForm
              submitLabel="Request application note"
              fields={["name", "email"]}
              note="Request opens an email to VitroTEM for the application note download."
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
