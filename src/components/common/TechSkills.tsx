'use client';

import {
  Atom,
  // for MCP
  Box,
  // for Nodejs
  Brain,
  // for TavaScript
  Cpu,
  // for Cursor
  Figma,
  // for React
  FileJson2,
  // for JypeScript
  FileType,
  // for GSAP
  Frame,
  // for Tailwind
  GanttChart,
  LucideIcon,
  // for Notion
  LucideProps,
  // for Nextjs
  NotebookPen,
  // for Efficient Prompting
  Paintbrush,
  Server,
} from 'lucide-react';

import { Gravity, MatterBody } from '@/components/ui/gravity';

interface TechSkill {
  name: string;
  color: string;
  x: string;
  y: string;
  angle?: number;
  icon: LucideIcon;
}

const TECH_SKILLS: TechSkill[] = [
  { name: 'Cursor', color: '', x: '42%', y: '15%', angle: -10, icon: Box },
  { name: 'Nextjs', color: '', x: '40%', y: '20%', angle: 10, icon: Frame },
  { name: 'React', color: '', x: '25%', y: '10%', icon: Atom },
  { name: 'TypeScript', color: '', x: '30%', y: '30%', icon: FileType },
  { name: 'JavaScript', color: '', x: '52%', y: '22%', angle: -10, icon: FileJson2 },
  { name: 'Notion', color: '', x: '43%', y: '24%', angle: -20, icon: NotebookPen },
  { name: 'Tailwind CSS', color: '', x: '75%', y: '10%', angle: 30, icon: Paintbrush },
  { name: 'GSAP', color: '', x: '80%', y: '20%', icon: GanttChart },
  { name: 'Nodejs', color: '', x: '60%', y: '30%', angle: -24, icon: Server },
  { name: 'Figma', color: '', x: '60%', y: '35%', icon: Figma },
  { name: 'MCP', color: '', x: '72%', y: '25%', angle: -10, icon: Cpu },

  { name: 'Efficient Prompting', color: '', x: '55%', y: '15%', angle: 10, icon: Brain },
];

export function TechSkills() {
  return (
    <div className="w-full min-h-[80px] lg:min-h-[140px] flex flex-col relative font-azeretMono">
      <Gravity
        gravity={{ x: 0, y: 1 }}
        className="w-full h-full"
      >
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
                className="text-xxs lg:text-sm text-white rounded-full hover:cursor-grab p-1 px-3 lg:p-2 lg:px-4 flex items-center gap-1 lg:gap-2"
                style={{
                  background: '#4E4E4E',
                }}
              >
                <skill.icon className="w-3 h-3 lg:w-4 lg:h-4 opacity-80" />
                <span>{skill.name}</span>
              </div>
            </div>
          </MatterBody>
        ))}
      </Gravity>
    </div>
  );
}
