export default function PageHero({ title, lede, eyebrow }) {
  return (
    <section className="page-hero">
      <div className="page-hero__media" aria-hidden="true" />
      <div className="container page-hero__content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
    </section>
  );
}
