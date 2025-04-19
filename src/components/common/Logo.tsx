'use client';

import Image from 'next/image';

export const Logo = () => (
  <div className="flex items-center cursor-pointer group">
    <p className="mr-2 sm:mr-0 transition-all duration-500 ease-bezier group-hover:rotate-[360deg]"><span className="text-base text-[#333] font-halenoir font-bold">©</span></p>
    <div
      className="flex items-center relative overflow-hidden whitespace-nowrap ml-0 2xl:ml-2
                    transition-all duration-500 ease-bezier group-hover:pr-[30px]"
    >
      <div
        className="flex items-center relative text-sm lg:text-base transition-transform duration-500 
                     ease-bezier group-hover:-translate-x-full"
      >
        <Image
          src="/icons/arrow.svg"
          alt="arrow"
          width={18}
          height={18}
          priority
          className="w-3 h-3 -rotate-90"
        />
        <span className="lg:text-base 2xl:text-base text-sm ml-1 text-[#333] font-halenoir">MAViS M.</span>
      </div>
      <div
        className="flex items-center relative pl-[0.3em] text-sm lg:text-base transition-transform 
                     duration-500 ease-bezier group-hover:-translate-x-[85px]"
      >
        <Image
          src="/icons/arrow.svg"
          alt="arrow"
          width={18}
          height={18}
          priority
          className="w-3 h-3 -rotate-90"
        />
        <span className="lg:text-base 2xl:text-base text-sm ml-1 text-[#333] font-halenoir">Based in Melbourne, AU</span>
      </div>
    </div>
  </div>
);
