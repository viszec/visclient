'use client'

import Image from 'next/image'

export const Logo = () => (
  <div className="flex items-center cursor-pointer group">
    <p className="transition-all duration-500 ease-bezier group-hover:rotate-[360deg]">
      {'©'}
    </p>
    <div className="flex items-center relative overflow-hidden whitespace-nowrap ml-2
                    transition-all duration-500 ease-bezier group-hover:pr-[30px]">
      <div className="flex items-center relative text-sm lg:text-base transition-transform duration-500 
                     ease-bezier group-hover:-translate-x-full">
        <Image
          src="/icons/arrow.svg"
          alt="arrow"
          width={18}
          height={18}
          priority
          className="w-3 h-3 -rotate-90"
        />
        <span className="text-sm lg:text-base ml-1">MAViS MA</span>
      </div>
      <div className="flex items-center relative pl-[0.3em] text-sm lg:text-base transition-transform 
                     duration-500 ease-bezier group-hover:-translate-x-[85px]">
        <Image
          src="/icons/arrow.svg"
          alt="arrow"
          width={18}
          height={18}
          priority
          className="w-3 h-3 -rotate-90"
        />
        <span className="text-sm lg:text-base ml-1">Based in Melbourne AU</span>
      </div>
    </div>
  </div>
); 