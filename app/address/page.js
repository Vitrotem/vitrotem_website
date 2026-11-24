import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Address",
  description: "VitroTEM head office in Amsterdam and laboratory in Delft.",
};

export default function AddressPage() {
  return (
    <main>
      <PageHero
        title="Address"
        lede="Visit us in Amsterdam Science Park or at Biotech Campus Delft."
      />

      <section className="section content-block">
        <div className="container split">
          <Reveal>
            <h2 className="seperator-title">Head Office</h2>
            <p>
              <strong>Amsterdam Science Park</strong>
            </p>
            <p>
              Science Park 106
              <br />
              1098 XG Amsterdam
              <br />
              The Netherlands
            </p>
            <p>Chamber of Commerce number: 76715221</p>
            <p>
              E-mail:{" "}
              <a href="mailto:info@vitrotem.com">info@vitrotem.com</a>
            </p>
            <p>
              Or connect with us on{" "}
              <a
                href="https://www.linkedin.com/company/vitrotem/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </Reveal>
          <Reveal>
            <h2 className="seperator-title">Laboratory</h2>
            <p>
              <strong>Biotech Campus Delft</strong>
            </p>
            <p>
              Alexander Fleminglaan 1
              <br />
              2613 AX Delft
              <br />
              The Netherlands
            </p>
            <Link className="btn btn-primary" href="/contact">
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
