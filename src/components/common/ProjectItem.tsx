"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface ProjectProps {
  index: number;
  title: string;
  category: string;
  client: string;
  year: string;
  liveURL: string;
  manageModal: (show: boolean, index: number, x: number, y: number) => void;
}

export default function ProjectItem({
  index,
  title,
  category,
  client,
  year,
  liveURL,
  manageModal,
}: ProjectProps) {
  const items = [
    { 
      content: title, 
      span: "col-start-1 col-end-5", 
      isTitle: true,
      hoverTransform: "group-hover:-translate-x-2.5"
    },
    { 
      content: category, 
      span: "col-start-5 col-end-9",
      hoverTransform: "group-hover:translate-x-2.5"
    },
    { 
      content: client, 
      span: "col-start-9 col-end-11",
      hoverTransform: "group-hover:translate-x-2.5",
      className: "hidden md:block"
    },
    { 
      content: year, 
      span: "col-start-10 col-end-11 lg:col-start-11 lg:col-end-12",
      hoverTransform: "group-hover:translate-x-2.5"
    },
    { 
      content: (
        <Link
          href={liveURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs lg:text-base relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
        >
          <span className="hidden md:inline">Live Link</span>
          <span className="flex items-center gap-1 md:hidden">
            <Image
              src="/icons/arrow.svg"
              alt="arrow"
              width={18}
              height={18}
              className="w-2 h-2"
              priority
            />
            Live
          </span>
        </Link>
      ),
      span: "col-start-12 col-end-13",
      align: "text-right",
      hoverTransform: "group-hover:translate-x-2.5"
    }
  ]

  const baseStyles = "font-light self-center transition-all duration-400 group-hover:text-gray-400"
  
  return (
    <div className="grid grid-cols-12 px-4 py-6 border-b border-gray-300 cursor-pointer group relative w-full">
      <div
        className="absolute top-0 left-0 w-[75%] h-[80%] z-10"
        onMouseEnter={(e) => manageModal(true, index, e.clientX, e.clientY)}
        onMouseLeave={(e) => manageModal(false, index, e.clientX, e.clientY)}
      />

      {items.map(({ content, span, isTitle, align = "", hoverTransform, className = "" }, i) => (
        <div
          key={i}
          className={`
            ${span}
            ${baseStyles}
            ${isTitle ? "text-base text-black/85 uppercase lg:text-2xl font-semibold m-0" : ""}
            ${align}
            ${hoverTransform}
            ${className}
          `}
        >
          <div className={`${isTitle ? "text-sm text-black/85 lg:text-2xl" : "text-xs text-black/85 lg:text-base"}`}>
            {content}
          </div>
        </div>
      ))}
    </div>
  )
}
