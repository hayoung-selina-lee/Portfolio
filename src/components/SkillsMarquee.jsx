import { skills } from "../data/skills";

function SkillsMarquee() {
  return (
    <div>
      {skills.map((group) => (
        <div key={group.category}>
          {group.category}
          {group.skills.map((skill) => (
            <div key={skill}> {skill} </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SkillsMarquee;
