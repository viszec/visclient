'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { ROUTES, RouteItem } from '@/config/routes';

import Magnetic from '@/components/common/Magnetic';

const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, route: RouteItem) => {
  if (route.isSection) {
    e.preventDefault();

    // 使用scrollTarget或从href提取section ID
    const sectionId = route.scrollTarget || route.href.replace('/', '');
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement) {
      // 平滑滚动到section
      sectionElement.scrollIntoView({ behavior: 'smooth' });

      // 更新URL为不带#的形式
      window.history.pushState({}, '', route.href);
    }
  }
};

// 检查首页加载时是否需要滚动到特定section
const useScrollToSection = () => {
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget) {
      sessionStorage.removeItem('scrollTarget');

      // 允许DOM完全加载
      setTimeout(() => {
        const sectionId = scrollTarget.includes('#') ? scrollTarget.split('#')[1] : scrollTarget.replace('/', '');

        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState({}, '', scrollTarget);
        }
      }, 100);
    }
  }, []);
};

export const Navigation = () => {
  useScrollToSection();

  return (
    <nav className="hidden md:flex items-center">
      {ROUTES.map((item) => (
        <Magnetic key={item.href}>
          <div className="flex flex-col relative z-[1] pl-8 py-4 cursor-pointer group">
            <Link
              href={item.href}
              className="text-base no-underline hover:text-[#333]/60 text-[#333] font-normal font-halenoir"
              onClick={(e) => handleNavigation(e, item)}
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
};
