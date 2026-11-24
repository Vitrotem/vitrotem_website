import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { VACANCIES } from "@/lib/content";

export const metadata = {
  title: "Vacancies",
  description: "Open positions at VitroTEM.",
};

export default function VacanciesPage() {
  return (
    <main>
      <PageHero
        title="Vacancies"
        lede="Join VitroTEM and help bring liquid-phase TEM within reach for researchers worldwide."
      />

      <section className="section content-block">
        <div className="container narrow">
          <div className="card-stack">
            {VACANCIES.map((job) => (
              <Reveal as="article" key={job.slug} className="info-card">
                <h2>{job.title}</h2>
                <p>{job.summary}</p>
                <Link href="/contact">Apply / inquire →</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
