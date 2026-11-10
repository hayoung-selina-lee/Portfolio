import ScrollHero from "../components/ScrollHero";
import TerminalWindow from "../components/TerminalWindow";
import SkillsMarquee from "../components/SkillsMarquee";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Home() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top bottom",
        onEnter: () => {
          gsap.to(window, {
            duration: 0.8,
            ease: "power2.inOut",
            scrollTo: { y: headerRef.current, autoKill: true },
          });
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        snap: { snapTo: 1 / 2, duration: 0.6, ease: "power2.inOut" },
      });
    },
    { scope: sectionRef },
  );
  return (
    <main className="bg-black">
      <ScrollHero />
      <div className="pt-10 flex flex-col">
        <header ref={headerRef} className="sticky top-0 z-50 bg-black text-white">
          HEADER
        </header>
        <section ref={sectionRef} className="sticky pt-24 top-0 h-screen bg-black">
          <TerminalWindow title="skills">
            <SkillsMarquee />
          </TerminalWindow>
        </section>
        <section className="sticky pt-24  top-0 h-screen bg-black">
          <TerminalWindow title="projects">
            <div className="p-100 text-white">PROJECTS</div>
          </TerminalWindow>
        </section>
        <section className="sticky pt-24  top-0 h-screen bg-black">
          <TerminalWindow title="contact">
            <div className="p-100 text-white">CONTACT</div>
          </TerminalWindow>
        </section>
      </div>
      <footer className="bg-black text-white">FOOTER</footer>
    </main>
  );
}

export default Home;
