import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Channel Partners",
  description: "VitroTEM channel partners and distribution network.",
};

export default function ChannelPartnersPage() {
  return (
    <main>
      <PageHero
        title="Channel Partners"
        lede="Work with VitroTEM through our growing partner network."
      />

      <section className="section content-block">
        <div className="container narrow">
          <Reveal as="p">
            VitroTEM collaborates with channel partners to bring Naiad and
            graphene liquid cell solutions to research labs worldwide. If you are
            interested in becoming a partner or need a local contact, get in
            touch with our team.
          </Reveal>
          <Reveal>
            <Link className="btn btn-primary" href="/contact">
              Contact us about partnerships
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
