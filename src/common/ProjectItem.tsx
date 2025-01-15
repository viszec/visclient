"use client";
import Link from "next/link";
import React from "react";

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
  return (
    <div className="grid grid-cols-12 px-4 py-6 border-b border-[#c9c9c9] cursor-pointer group relative">
      {/* Project image trigger area - covers PROJECT to CLIENT columns */}
      <div
        className="absolute top-0 left-0 w-[75%] h-[80%] z-10"
        onMouseEnter={(e) => manageModal(true, index, e.clientX, e.clientY)}
        onMouseLeave={(e) => manageModal(false, index, e.clientX, e.clientY)}
      />

      <h2 className="col-span-4 text-3xl m-0 font-normal transition-all duration-400 group-hover:-translate-x-2.5">
        {title}
      </h2>
      <p className="col-span-4 font-light self-center transition-all duration-400 group-hover:translate-x-2.5">
        {category}
      </p>
      <p className="col-span-2 font-light self-center transition-all duration-400 group-hover:translate-x-2.5">
        {client}
      </p>
      <p className="col-span-1 font-light self-center transition-all duration-400 group-hover:translate-x-2.5">
        {year}
      </p>
      <p className="col-span-1 font-light self-center text-right transition-all duration-400 group-hover:translate-x-2.5">
        <Link
          href={liveURL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
        >
          Live Link
        </Link>
      </p>
    </div>
  );
}
