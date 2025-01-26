"use client"
import { Gravity, MatterBody } from "@/components/ui/gravity";

interface TechSkill {
  name: string;
  color: string;
  x: string;
  y: string;
  angle?: number;
}

const TECH_SKILLS: TechSkill[] = [
  { name: "React", color: "#0015ff", x: "30%", y: "10%" },
  { name: "Typescript", color: "#E794DA", x: "30%", y: "30%" },
  { name: "JavaScript", color: "#1f464d", x: "40%", y: "20%", angle: 10 },
  { name: "tailwind css", color: "#ff5941", x: "75%", y: "10%" },
  { name: "GSAP", color: "rgb(249 115 22)", x: "80%", y: "20%" },
  { name: "Nodejs", color: "#ffd726", x: "50%", y: "10%" },
  { name: "Nextjs", color: "#000000",  x: "40%", y: "20%", angle: 4}
];

export function TechSkills() {
  return (
    <div className="w-full min-h-[70px] lg:min-h-[150px] flex flex-col relative font-azeretMono">
      <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
        {TECH_SKILLS.map((skill) => (
          <MatterBody
            key={skill.name}
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x={skill.x}
            y={skill.y}
            angle={skill.angle}
          >
            <div
              className="text-sm lg:text-xl text-white rounded-full hover:cursor-grab lg:px-5 lg:py-2 px-3 py-0.5"
              style={{ backgroundColor: skill.color }}
            >
              {skill.name}
            </div>
          </MatterBody>
        ))}
      </Gravity>
    </div>
  );
}
