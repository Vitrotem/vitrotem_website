import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ScrollStageViewer from "@/components/ScrollStageViewer";

export const metadata = {
  title: "Products",
  description:
    "Naiad, GLC Kit, and Liquids Pack — automated graphene liquid cell fabrication from VitroTEM.",
};

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        title="Products"
        lede="Automated graphene liquid cell fabrication and consumables for high-resolution liquid-phase TEM."
      />

      <section id="Naiad" className="section content-block">
        <div className="container split">
          <Reveal>
            <h2 className="seperator-title">Naiad</h2>
            <p>
              With the Naiad system, graphene liquid cell assembly becomes an
              easy task. The Naiad automates graphene preparation and assembles
              GLCs containing liquid-based samples on standard TEM grids. GLC
              grids are ready to image in a matter of minutes.
            </p>
            <ul className="feature-list">
              <li>
                <strong>Simple Assembly:</strong> Assemble GLCs in minutes, with
                no specialized sample holders.
              </li>
              <li>
                <strong>High-Quality Graphene Preparation:</strong> Reliable,
                reproducible results from VitroTEM graphene.
              </li>
              <li>
                <strong>TEM imaging of dynamic processes:</strong> Nanoparticle
                diffusion and other processes in liquid.
              </li>
              <li>
                <strong>Wide-Ranging Applications:</strong> Biology, materials
                science, and nanotechnology.
              </li>
              <li>
                <strong>User-Friendly Interface:</strong> Built for researchers
                at all levels.
              </li>
            </ul>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/download-brochure">
                Download brochure
              </Link>
              <Link
                className="btn btn-ghost"
                href="/products/prepare-graphene-liquid-cell-in-6-steps"
              >
                Prepare GLC in 6 steps
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <img
              className="content-photo"
              src="/images/NAIAD.249-header-image-newnew-1.jpg"
              alt="Naiad system"
            />
          </Reveal>
        </div>
      </section>

      <ScrollStageViewer />

      <section className="section experts content-block alt">
        <div className="container split experts-inner">
          <Reveal>
            <h2 className="seperator-title">What Experts are Saying</h2>
            <p className="section-sub">Testimonials working with Naiad</p>
            <a
              className="btn btn-primary"
              href="https://www.youtube.com/watch?v=CLjdJ_F22rw"
              target="_blank"
              rel="noreferrer"
            >
              Watch testimonials
            </a>
          </Reveal>
          <Reveal as="figure" className="experts-video">
            <a
              href="https://www.youtube.com/watch?v=CLjdJ_F22rw"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/NAIAD.249-header-image-newnew-1.jpg"
                alt="Play video testimonials"
              />
              <span className="play-badge">Play video</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section id="GLC-Kit" className="section content-block alt">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            GLC Kit
          </Reveal>
          <Reveal as="p">
            The GLC Kit supplies materials for five GLC grids assembled in the
            Naiad system, including:
          </Reveal>
          <Reveal as="ul" className="feature-list">
            <li>5× Graphene-on-Copper Disk</li>
            <li>5× TEM Grid in Cartridge</li>
            <li>1× Disk Carrier</li>
            <li>5× Loop Cartridge</li>
          </Reveal>
          <Reveal as="p">
            Vitrotem graphene is developed to have large grain size and high
            coverage. Each batch is validated to ensure complete coverage of the
            TEM grid image area after transfer to the TEM grid by the Naiad
            system.
          </Reveal>
          <Reveal as="p">
            On request, Vitrotem supplies other types of TEM grids to suit your
            needs.
          </Reveal>
          <Reveal>
            <Link className="btn btn-primary" href="/graphene">
              Learn about VitroTEM Graphene
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="Liquids-Pack" className="section content-block">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            Liquids Pack
          </Reveal>
          <Reveal as="p">
            The Liquids Pack provides the fluids required for the etching of
            Copper from the Graphene-on-Copper Disks in the Naiad. The Liquids
            Pack has a capacity for seven graphene preparation runs, amounting
            to a maximum output of 35 GLC grids.
          </Reveal>
          <Reveal as="p">
            On request, Vitrotem supplies a variety of commonly used buffers for
            the final stage of graphene liquid cells assembly.
          </Reveal>
          <Reveal>
            <Link className="btn btn-primary" href="/contact">
              Request consumables
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
