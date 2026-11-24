import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { NEWS } from "@/lib/content";

export function generateStaticParams() {
  return NEWS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = NEWS.find((entry) => entry.slug === slug);
  if (!item) return { title: "News" };
  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const item = NEWS.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <main>
      <PageHero title={item.title} eyebrow={item.date} lede={item.excerpt} />

      <section className="section content-block">
        <div className="container narrow">
          {item.body.map((paragraph) => (
            <Reveal as="p" key={paragraph}>
              {paragraph}
            </Reveal>
          ))}
          <Reveal>
            <Link className="btn btn-ghost" href="/news-and-events">
              ← Back to news &amp; events
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
