import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { TEAM } from "@/lib/content";

export const metadata = {
  title: "Team",
  description: "The VitroTEM team.",
};

export default function TeamPage() {
  return (
    <main>
      <PageHero title="Team" lede="The Vitrotem team" />

      <section className="section content-block">
        <div className="container">
          <div className="team-grid">
            {TEAM.map((member) => (
              <Reveal as="article" key={member.name} className="team-card">
                <div className="team-avatar" aria-hidden="true">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
