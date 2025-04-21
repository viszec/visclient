'use client';

import Link from 'next/link';

import { ROUTES } from '@/config/routes';

import Magnetic from '@/components/common/Magnetic';

export const Navigation = () => (
  <nav className="hidden md:flex items-center">
    {ROUTES.map((item) => (
      <Magnetic key={item.href}>
        <div className="flex flex-col relative z-[1] pl-8 py-4 cursor-pointer group">

          <Link
            href={item.href}
            className="text-base no-underline hover:text-[#333]/60 text-[#333] font-normal font-halenoir"
          >
            {item.label}
          </Link>
          <div
            className="absolute w-[5px] h-[5px] top-[38px] left-1/2 ml-4
                        bg-gray-700 rounded-full scale-0 -translate-x-1/2 
                        transition-transform duration-200 ease-bezier 
                        group-hover:scale-100"
          />
        </div>
      </Magnetic>
    ))}
  </nav>
);
