'use client';

import { Gravity, MatterBody } from '@/components/ui/gravity';

interface TechSkill {
  name: string;
  color: string;
  x: string;
  y: string;
  angle?: number;
}

const TECH_SKILLS: TechSkill[] = [
  { name: 'React', color: '', x: '25%', y: '10%' },
  { name: 'TypeScript', color: '', x: '30%', y: '30%' },
  { name: 'JavaScript', color: '', x: '40%', y: '20%', angle: 10 },
  { name: 'Tailwind CSS', color: '', x: '75%', y: '10%', angle: 50 },
  { name: 'GSAP', color: '', x: '80%', y: '20%' },
  { name: 'Nodejs', color: '', x: '60%', y: '30%', angle: -15 },
  { name: 'Cursor', color: '', x: '45%', y: '15%' },
  { name: 'Figma', color: '', x: '70%', y: '25%' },
  { name: 'MCP', color: '', x: '35%', y: '25%' },
  { name: 'Nextjs', color: '', x: '50%', y: '20%', angle: 4 },
  { name: 'Efficient Prompting', color: '', x: '55%', y: '15%', angle: 10 },
];

export function TechSkills() {
  return (
    <div className="w-full min-h-[80px] lg:min-h-[140px] flex flex-col relative font-azeretMono">
      <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
        {TECH_SKILLS.map((skill) => (
          <MatterBody
            key={skill.name}
            matterBodyOptions={{
              friction: 0.6,
              restitution: 0.1,
            }}
            x={skill.x}
            y={skill.y}
            angle={skill.angle}
          >
            <div
              className="relative p-[2px] lg:p-[4.5px] rounded-full bg-gradient-border"
              style={{
                boxShadow: `
                  0 0 8px rgba(255,255,255,0.15),
                  0 0 12px rgba(200,200,200,0.08)
                `,
                outline: '1px solid rgba(200, 200, 200, 0.2)',
                outlineOffset: '1px',
              }}
            >
              <div
                className="text-xs lg:text-sm text-white rounded-full hover:cursor-grab p-1 px-3 lg:p-2 lg:px-5"
                style={{
                  background: '#4E4E4E',
                }}
              >
                {skill.name}
              </div>
            </div>
          </MatterBody>
        ))}
      </Gravity>
    </div>
  );
}
