import { skills } from "../data/skills";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function SkillsMarquee() {
  const tweensRef = useRef([]);

  useGSAP(() => {
    const skillLines = gsap.utils.toArray(".skills");
    tweensRef.current = skillLines.map((skillLine) => gsap.to(skillLine, { xPercent: "-20", duration: 20, ease: "none", repeat: -1 }));
  });

  return (
    <div className="px-5">
      {skills.map((group, categoryIndex) => (
        <div
          onMouseEnter={() => gsap.to(tweensRef.current[categoryIndex], { timeScale: 0 })}
          onMouseLeave={() => gsap.to(tweensRef.current[categoryIndex], { timeScale: 1 })}
          className="flex items-center py-2"
          key={group.category}
        >
          <span className="w-37 shrink-0 text-white/60">{group.category}</span>
          <div className="flex-1 overflow-hidden">
            <div className="skills flex w-max">
              {Array.from({ length: 5 }, (_, index) => index).map((copy) => (
                <div className="flex shrink-0 " key={copy}>
                  {group.skills.map((skill) => (
                    <span className="rounded-full border-white/60 border-2 whitespace-nowrap mx-2 px-4 py-1" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsMarquee;
