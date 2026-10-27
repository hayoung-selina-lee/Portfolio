import { skills } from "../data/skills";

function SkillsMarquee() {
  return (
    <div>
      {skills.map((group) => (
        <div className="flex items-center py-2" key={group.category}>
          <span className="w-37 shrink-0 text-white/60">{group.category}</span>
          <div className="flex">
            {group.skills.map((skill) => (
              <span className="rounded-full border-white/60 border-2 whitespace-nowrap mx-2 px-4 py-1" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsMarquee;
