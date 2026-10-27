import ScrollHero from "../components/ScrollHero";
import TerminalWindow from "../components/TerminalWindow";
import SkillsMarquee from "../components/SkillsMarquee";

function Home() {
  return (
    <main className="bg-black">
      <ScrollHero />
      <div className="pt-10 flex flex-col gap-10">
        <header className="sticky top-0 z-50 bg-black text-white">HEADER</header>
        <section>
          <TerminalWindow title="skills">
            <SkillsMarquee />
          </TerminalWindow>
        </section>
        <section>
          <TerminalWindow title="projects">
            <div className="p-100 text-white">PROJECTS</div>
          </TerminalWindow>
        </section>
        <section>
          <TerminalWindow title="contact">
            <div className="p-100 text-white">CONTACT</div>
          </TerminalWindow>
        </section>
      </div>
    </main>
  );
}

export default Home;
