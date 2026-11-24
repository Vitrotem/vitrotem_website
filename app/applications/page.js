import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Applications",
  description:
    "Graphene liquid cells for liquid-phase electron microscopy across life sciences and materials science.",
};

export default function ApplicationsPage() {
  return (
    <main>
      <PageHero
        title="Applications"
        lede="High-resolution liquid-phase TEM across biology, materials science, and graphene-enabled workflows."
      />

      <section
        id="Graphene-Liquid-Phase-Electron-Microscopy"
        className="section content-block"
      >
        <div className="container split">
          <Reveal>
            <h2 className="seperator-title">
              Graphene in Liquid-Phase Electron Microscopy
            </h2>
            <p>
              Graphene liquid cells are nano to microscale pockets of water
              sealed in two layers of graphene. Around the pocket, the two
              graphene layers stick together due to strong static forces giving
              rise to a very stable pocket that is both water and vacuum tight.
              Graphene liquid cells form an ideal platform to study samples in
              liquid in transmission electron microscopy, where the ultra-thin
              graphene functions as the most electron transparent window
              currently available.
            </p>
            <p>
              Typical GLCs have a thickness ranging from tens to hundreds of
              nanometers, making them ideally transparent to the electron beam.
              Graphene is highly conductive and a demonstrated radical
              scavenger. When used as substrate in TEM imaging, it protects the
              sample against electron beam damage caused by radiolysis, charging
              or heating.
            </p>
            <p className="caption">
              Extracellular vesicle in a Graphene Liquid Cell, room temperature
              LP-TEM.
            </p>
          </Reveal>
          <Reveal>
            <img
              className="content-photo"
              src="/images/0004_Picture-6.png"
              alt="Graphene in Electron Microscopy"
            />
          </Reveal>
        </div>
      </section>

      <section id="Life-Sciences" className="section content-block alt">
        <div className="container split">
          <Reveal>
            <img
              className="content-photo"
              src="/images/0002_Picture-3.png"
              alt="Life Sciences"
            />
          </Reveal>
          <Reveal>
            <h2 className="seperator-title">Life Sciences</h2>
            <p>
              Samples in graphene liquid cells are dissolved and hydrated,
              retaining in many aspects their native state. With graphene liquid
              cells, drying, freezing or fixating are no longer required. The
              resulting ultra-thin GLC structures lead to high resolution
              imaging of biological and organic matter without the need for
              staining. The room-temperature assembly processes drastically
              simplify the sample preparation compared to cryo-EM methods.
            </p>
            <p>
              Application areas include the direct sub-nanometer resolution
              imaging of proteins, nanomaterials and in particular metallic
              nanoparticles at atomic resolution.
            </p>
            <div className="tag-columns">
              <ul className="feature-list">
                <li>CLEM</li>
                <li>Tomography</li>
                <li>Low e-dose imaging</li>
                <li>Stained / unstained samples</li>
                <li>Buffer-filled GLCs</li>
                <li>Dynamic imaging</li>
              </ul>
              <ul className="feature-list">
                <li>Proteins &amp; protein complexes</li>
                <li>EVs</li>
                <li>DNA, RNA</li>
                <li>Viruses</li>
                <li>Whole living cell processes</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="Materials-Sciences" className="section content-block">
        <div className="container split">
          <Reveal>
            <h2 className="seperator-title">Materials Sciences</h2>
            <p>
              Graphene liquid cells offer a drastically thinner structure than
              conventional SiN-based liquid cells. New levels of detail are
              resolved with greater ease than ever before.
            </p>
            <p>Dynamic processes, formation, aggregation, degradation of:</p>
            <ul className="feature-list">
              <li>Electrode materials</li>
              <li>Nanoparticles</li>
              <li>Core-shell particles</li>
              <li>Tomography</li>
              <li>Low e-dose imaging</li>
              <li>Atomic resolution</li>
              <li>STEM</li>
              <li>HAADF</li>
            </ul>
          </Reveal>
          <Reveal>
            <img
              className="content-photo"
              src="/images/0000_Picture-4.png"
              alt="Materials Sciences"
            />
          </Reveal>
        </div>
      </section>

      <section id="GLC-Spacers" className="section content-block alt">
        <div className="container narrow">
          <Reveal as="h2" className="seperator-title">
            GLC Spacers
          </Reveal>
          <Reveal as="p">
            Vitrotem’s patented spacer technology grants straightforward control
            over the thickness of the liquid layer in the liquid cells. The
            optimal liquid cell thickness depends on the dimensions of the
            sample under study: liquid cells should accommodate the sample
            without inducing deformation while also offering the thinnest
            possible structure to minimize obstruction of the transmission
            electron beam. In this way, optimal resolution in TEM imaging can be
            achieved.
          </Reveal>
          <Reveal as="p">
            The use of Vitrotem spacer technology drastically boosts the density
            of liquid cells on the grid and the volume of individual liquid
            cells. Whereas early studies into graphene liquid cells reported low
            density and poor reproducibility, with the introduction of spacers
            technology, graphene liquid cell-based TEM becomes a reliable
            systematic analysis tool.
          </Reveal>
          <Reveal>
            <Link className="btn btn-primary" href="/contact">
              Discuss your application
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
