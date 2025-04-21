'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';
import { MoveDownRight, MoveUpRight } from 'lucide-react';

import Magnetic from '../common/Magnetic';

interface ProjectProps {
  index: number;
  title: string;
  category: string;
  client: string;
  year: string;
  liveURL: string;
  appURL?: string;
  overview?: string;
  stacks?: string[];
  images?: {
    src?: string;
    caption?: string;
  }[];
  solution?: string[];
  manageModal: (show: boolean, index: number, x: number, y: number, fromExpand?: boolean) => void;
  activeExpandedIndex: number | null;
  setActiveExpandedIndex: (index: number | null) => void;
}

export default function ProjectItem({
  index,
  title,
  category,
  client,
  year,
  liveURL,
  appURL,
  overview,
  stacks,
  images,
  solution,
  manageModal,
  activeExpandedIndex,
  setActiveExpandedIndex,
}: ProjectProps) {
  const isExpanded = activeExpandedIndex === index;

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveExpandedIndex(isExpanded ? null : index);
    if (!isExpanded) {
      manageModal(false, index, 0, 0, true);
    }
  };

  const items = [
    {
      content: title,
      span: 'col-start-1 col-end-6 lg:col-end-5',
      isTitle: true,
      hoverTransform: 'group-hover:-translate-x-1 lg:group-hover:-translate-x-2.5',
    },
    {
      content: category,
      span: 'col-start-6 lg:col-start-5 col-end-9',
      hoverTransform: 'group-hover:translate-x-1 lg:group-hover:translate-x-2.5',
    },
    {
      content: client,
      span: 'col-start-9 col-end-11',
      hoverTransform: 'group-hover:translate-x-1 lg:group-hover:translate-x-2.5',
      className: 'hidden md:block',
    },
    {
      content: year,
      span: 'col-start-10 col-end-11 lg:col-start-11 lg:col-end-12',
      hoverTransform: 'group-hover:translate-x-1 lg:group-hover:translate-x-2.5',
    },
    {
      content: (
        <div className="flex items-center justify-end group-hover:translate-x-1 lg:group-hover:translate-x-2.5 transition-all duration-500 pr-2 lg:pr-3">
          <div
            className={`w-5 h-5 lg:w-10 lg:h-10 flex items-center rounded-full justify-center transition-all duration-300
              ${isExpanded ? 'bg-[#EFEEE9] rotate-180' : 'bg-[#333] group-hover:bg-[#EFEEE9]'}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveExpandedIndex(isExpanded ? null : index);
              if (!isExpanded) {
                manageModal(false, index, 0, 0, true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                setActiveExpandedIndex(isExpanded ? null : index);
                if (!isExpanded) {
                  manageModal(false, index, 0, 0, true);
                }
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={isExpanded ? 'Collapse project details' : 'Expand project details'}
          >
            <Link
              href={liveURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs lg:text-base relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#EFEEE9] after:transition-all after:duration-300 hover:after:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <MoveUpRight
                className={`
                w-2 h-2 md:w-5 md:h-5 
                ${isExpanded ? 'stroke-[#333]' : 'stroke-[#EFEEE9] group-hover:stroke-[#333]'}`}
                width={15}
                height={15}
              />
            </Link>
          </div>
        </div>
      ),
      span: 'col-start-12 col-end-13',
      align: 'text-left',
    },
  ];

  const baseStyles = 'font-light self-center transition-all duration-500 group-hover:text-[#EFEEE9]';

  return (
    <div className={`relative w-full border-b border-[#333] ${isExpanded ? 'pb-4' : 'pb-0'}`}>
      <div>
        <div
          onClick={handleToggleExpand}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleExpand(e as unknown as React.MouseEvent);
            }
          }}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          className={`grid grid-cols-12 pr-2 lg:px-4 py-6 cursor-pointer group relative w-full transition-all duration-300 ${isExpanded ? 'bg-[#333] text-[#EFEEE9]' : 'hover:bg-[#333]'}`}
        >
          {!isExpanded && (
            <div
              className="absolute top-0 left-0 w-[75%] h-[80%] z-10 border-1 border-[#EFEEE9]"
              onMouseEnter={(e) => manageModal(true, index, e.clientX, e.clientY)}
              onMouseLeave={(e) => manageModal(false, index, e.clientX, e.clientY)}
              aria-hidden="true"
            />
          )}

          {items.map(({ content, span, isTitle, align = '', hoverTransform = '', className = '' }, i) => (
            <div
              key={i}
              className={`
              ${span}
              ${baseStyles}
              ${isTitle ? 'text-base text-[#333] lg:text-3xl font-medium tracking-wider font-roslindale lg:font-bold m-0 group-hover:text-[#EFEEE9] pl-3 lg:pl-0' : ''}
              ${isExpanded ? 'text-[#EFEEE9]' : ''}
              ${align}
              ${hoverTransform}
              ${className}
            `}
            >
              <div
                className={`
                ${isTitle ? 'text-sm font-semibold lg:text-2xl' : 'text-xs lg:text-base'} 
                transition-all duration-500
                ${isExpanded ? 'text-[#EFEEE9]' : 'text-[#333] group-hover:text-[#EFEEE9]'}
              `}
              >
                {content}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="overflow-hidden bg-[#333] border-t rounded-b-3xl border-[#EFEEE9]/50"
            >
              <div className="py-10 flex flex-col lg:flex-row gap-4 px-8">
                <div className="w-full lg:w-1/3 flex flex-col space-y-6 lg:space-y-8 pr-4 lg:pr-8">
                  {overview && (
                    <div className="flex flex-col">
                      <h4 className="text-sm lg:text-2xl font-medium text-[#EFEEE9] mb-2 lg:mb-3 font-baskervville">
                        Overview
                      </h4>
                      <p className="text-xs lg:text-sm text-[#EFEEE9]/70 font-light leading-normal mb-3">{overview}</p>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                          <MoveDownRight className="w-4 h-4 text-[#EFEEE9]" />
                          <Magnetic>
                            <a
                              href={liveURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs lg:text-base text-[#EFEEE9] font-medium leading-normal relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-[#EFEEE9] after:transition-all after:duration-300 hover:after:w-full"
                            >
                              Website
                            </a>
                          </Magnetic>
                        </div>
                        {appURL && (
                          <div className="flex items-center gap-1">
                            <MoveDownRight className="w-4 h-4 text-[#EFEEE9]" />
                            <Magnetic>
                              <a
                                href={appURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs lg:text-base text-[#EFEEE9] font-medium leading-normal relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-[#EFEEE9] after:transition-all after:duration-300 hover:after:w-full"
                              >
                                App
                              </a>
                            </Magnetic>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {solution && solution.length > 0 && (
                    <div className="flex flex-col">
                      <h4 className="text-sm lg:text-lg font-medium text-[#EFEEE9] mb-2 lg:mb-3 font-baskervville">
                        Solutions
                      </h4>
                      <ul className="text-xs lg:text-sm text-[#EFEEE9]/70 font-light list-disc pl-4 space-y-2">
                        {solution.map((item, i) => (
                          <li
                            key={i}
                            className="leading-tight"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {stacks && stacks.length > 0 && (
                    <div className="flex flex-col">
                      <h4 className="text-sm lg:text-lg font-medium text-[#EFEEE9] mb-2 lg:mb-3 font-baskervville">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {stacks.map((stack, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 lg:px-3 lg:py-0.5 py-0 text-xxs lg:text-xs font-light text-[#333] bg-[#EFEEE9] border border-[#EFEEE9] rounded-full"
                          >
                            {stack}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-2/3">
                  {images && images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 lg:gap-4">
                      {images[0] && images[0].src && (
                        <div className="col-span-4 lg:col-span-2 aspect-[5/3] relative rounded-xl overflow-hidden group">
                          <Image
                            src={images[0].src}
                            alt={`${title} - ${images[0].caption || ''}`}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-[#EFEEE9] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                          <span className="absolute top-2 right-2 inline-block px-2 py-0.5 text-xxs lg:text-xs font-light text-[#333] bg-[#EFEEE9] border border-[#EFEEE9] rounded-full shadow-md z-10">
                            {images[0].caption || ''}
                          </span>
                        </div>
                      )}

                      {images[1] && images[1].src && (
                        <div className="col-span-2 lg:col-span-1 relative rounded-xl overflow-hidden group">
                          <div
                            className="w-full h-full"
                            style={{ paddingTop: 'calc(60% * 5/3)' }}
                          >
                            <Image
                              src={images[1].src}
                              alt={`${title} - ${images[1].caption || ''}`}
                              fill
                              className="object-cover object-top absolute top-0 left-0 transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 1024px) 50vw, 16.5vw"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-[#EFEEE9] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                            <span className="absolute top-2 right-2 inline-block px-2 py-0.5 text-xxs lg:text-xs font-light text-[#333] bg-[#EFEEE9] border border-[#EFEEE9] rounded-full shadow-md z-10">
                              {images[1].caption || ''}
                            </span>
                          </div>
                        </div>
                      )}

                      {images[2] && images[2].src && (
                        <div className="col-span-2 lg:col-span-1 relative rounded-xl overflow-hidden group">
                          <div
                            className="w-full h-full"
                            style={{ paddingTop: 'calc(60% * 5/3)' }}
                          >
                            <Image
                              src={images[2].src}
                              alt={`${title} - ${images[2].caption || ''}`}
                              fill
                              className="object-cover object-top absolute top-0 left-0 transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 1024px) 50vw, 16.5vw"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-[#EFEEE9] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                            <span className="absolute top-2 right-2 inline-block px-2 py-0.5 text-xxs lg:text-xs font-light text-[#333] bg-[#EFEEE9] border border-[#EFEEE9] rounded-full shadow-md z-10">
                              {images[2].caption || ''}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
