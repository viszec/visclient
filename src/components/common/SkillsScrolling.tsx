"use client";

import React from 'react';
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const SkillsScrolling = () => {
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "GSAP",
    "MCP",
    "Figma",
    "Cursor",
    "AI Tools"
  ];

  return (
    <div className="font-light py-2 px-4 rounded-full inline-flex items-center h-[3rem] overflow-hidden w-[50rem]">
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[AutoScroll({ playOnInit: true, speed: 0.5 })]}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {skills.map((skill, index) => (
            <CarouselItem
              key={index}
              className="flex basis-auto justify-center min-w-min items-center"
            >
              <span className="whitespace-nowrap text-sm text-[#e6e5df]">
                {skill}
              </span>
              {index < skills.length - 1 && (
                <span className="mx-3 text-[#e6e5df]">←</span>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default SkillsScrolling;