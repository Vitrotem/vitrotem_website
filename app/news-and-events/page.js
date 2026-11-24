import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { NEWS } from "@/lib/content";

export const metadata = {
  title: "News and Events",
  description: "Latest VitroTEM news, awards, and conference appearances.",
};

export default function NewsAndEventsPage() {
  return (
    <main>
      <PageHero
        title="News and Events"
        lede="Awards, conferences, and updates from VitroTEM."
      />

      <section className="section content-block">
        <div className="container narrow">
          <div className="card-stack">
            {NEWS.map((item) => (
              <Reveal as="article" key={item.slug} className="info-card">
                <p className="eyebrow">{item.date}</p>
                <h2>
                  <Link href={`/news/${item.slug}`}>{item.title}</Link>
                </h2>
                <p>{item.excerpt}</p>
                <Link href={`/news/${item.slug}`}>Read more →</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
