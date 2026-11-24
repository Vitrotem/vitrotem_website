import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Contact VitroTEM about Naiad, graphene liquid cells, and your research project.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact"
        lede="Do you want to find out how we can help with your research or work? We’d like to hear from your project."
      />

      <section className="section content-block">
        <div className="container split">
          <Reveal>
            <p>
              Use the form to reach out directly or send an email to{" "}
              <a href="mailto:bhardwaj@vitrotem.com">bhardwaj@vitrotem.com</a>.
            </p>
            <h2 className="section-kicker">Address</h2>
            <p>
              Visit us in our Head Office at Amsterdam Science Park or Laboratory
              at Biotech Campus Delft.
            </p>
            <p>
              <strong>Head Office</strong>
              <br />
              Science Park 106
              <br />
              1098 XG Amsterdam
              <br />
              The Netherlands
            </p>
            <p>
              <strong>Laboratory</strong>
              <br />
              Alexander Fleminglaan 1
              <br />
              2613 AX Delft
              <br />
              The Netherlands
            </p>
            <p>Chamber of Commerce number: 76715221</p>
          </Reveal>
          <Reveal>
            <h2 className="seperator-title">Contact form</h2>
            <p>
              If you would like to get in touch, fill in this contact form and we
              will get back to you shortly.
            </p>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
