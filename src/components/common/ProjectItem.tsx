'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoveDownRight, MoveUpRight } from 'lucide-react';

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
  mobileImages?: {
    src?: string;
    caption?: string;
  }[];
  solution?: string[];
  manageModalAction: (show: boolean, index: number, x: number, y: number, fromExpand?: boolean) => void;
  activeExpandedIndex: number | null;
  setActiveExpandedIndexAction: (index: number | null) => void;
}

const MobileImageCarousel = ({
  mobileImages,
  title,
}: {
  mobileImages: { src?: string; caption?: string }[];
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? mobileImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === mobileImages.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setShowControls(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 50) {
      handlePrev();
    }

    // Delay hiding control buttons
    setTimeout(() => setShowControls(false), 2000);
  };

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      {(showControls || currentIndex > 0) && (
        <button
          className={`absolute left-[-30px] top-1/2 -translate-y-1/2 w-7 h-7 flex items-center 
                    justify-center bg-[#333]/70 hover:bg-[#333]/90 text-[#EFEEE9] rounded-full z-10
                    ${showControls ? 'opacity-100' : 'opacity-60'} transition-opacity duration-300`}
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <ChevronLeft size={17} />
        </button>
      )}

      {/* Carousel Container */}
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ paddingTop: 'calc(60% * 5/3)' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {mobileImages.map((mobileImage, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-300 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {mobileImage.src && (
              <>
                <Image
                  src={mobileImage.src}
                  alt={`${title} - ${mobileImage.caption || ''}`}
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#EFEEE9] bg-opacity-0 hover:bg-opacity-10 transition-all duration-300"></div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {(showControls || currentIndex < mobileImages.length - 1) && (
        <button
          className={`absolute right-[-30px] top-1/2 -translate-y-1/2 w-7 h-7 flex items-center 
                    justify-center bg-[#333]/70 hover:bg-[#333]/90 text-[#EFEEE9] rounded-full z-10
                    ${showControls ? 'opacity-100' : 'opacity-80'} transition-opacity duration-300`}
          onClick={handleNext}
          aria-label="Next image"
        >
          <ChevronRight size={17} />
        </button>
      )}

      {/* Indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
        {mobileImages.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full 
                      ${idx === currentIndex ? 'bg-[#EFEEE9]' : 'bg-[#EFEEE9]/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

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
  mobileImages,
  solution,
  manageModalAction,
  activeExpandedIndex,
  setActiveExpandedIndexAction,
}: ProjectProps) {
  const isExpanded = activeExpandedIndex === index;

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveExpandedIndexAction(isExpanded ? null : index);
    if (!isExpanded) {
      manageModalAction(false, index, 0, 0, true);
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
              setActiveExpandedIndexAction(isExpanded ? null : index);
              if (!isExpanded) {
                manageModalAction(false, index, 0, 0, true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                setActiveExpandedIndexAction(isExpanded ? null : index);
                if (!isExpanded) {
                  manageModalAction(false, index, 0, 0, true);
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
              onMouseEnter={(e) => manageModalAction(true, index, e.clientX, e.clientY)}
              onMouseLeave={(e) => manageModalAction(false, index, e.clientX, e.clientY)}
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

                <div className="w-full lg:w-2/3 mt-8">
                  {images && images.length > 0 && (
                    <>
                      {/* Desktop view - Original grid layout */}
                      <div className="hidden md:block w-full">
                        <div className="grid grid-cols-4 gap-2 lg:gap-4">
                          {images[0] && images[0].src && (
                            <div className="relative col-span-4 lg:col-span-2 aspect-[5/3] rounded-xl overflow-hidden group">
                              <Image
                                src={images[0].src}
                                alt={`${title} - ${images[0].caption || ''}`}
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-[#EFEEE9] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                            </div>
                          )}

                          {images[1] && images[1].src && (
                            <div className="col-span-2 lg:col-span-1 relative rounded-xl overflow-hidden group">
                              <div
                                className="relative w-full h-full"
                                style={{ paddingTop: 'calc(60% * 5/3)' }}
                              >
                                <Image
                                  src={images[1].src}
                                  alt={`${title} - ${images[1].caption || ''}`}
                                  fill
                                  className="object-cover object-top absolute top-0 left-0 transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 1024px) 50vw, 25vw"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-[#EFEEE9] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                              </div>
                            </div>
                          )}

                          {images[2] && images[2].src && (
                            <div className="col-span-2 lg:col-span-1 relative rounded-xl overflow-hidden group">
                              <div
                                className="relative w-full h-full"
                                style={{ paddingTop: 'calc(60% * 5/3)' }}
                              >
                                <Image
                                  src={images[2].src}
                                  alt={`${title} - ${images[2].caption || ''}`}
                                  fill
                                  className="object-cover object-top absolute top-0 left-0 transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 1024px) 50vw, 25vw"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-[#EFEEE9] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Caption row - separated from image containers */}
                        <div className="grid grid-cols-4 gap-2 lg:gap-4 mt-2">
                          <div className="col-span-4 lg:col-span-2 text-xxs lg:text-xs font-light text-[#EFEEE9] mt-1">
                            {images[0] && images[0].caption && (
                              <span className="border border-[#EFEEE9] rounded-full px-2 py-1">
                                {images[0].caption}
                              </span>
                            )}
                          </div>
                          <div className="col-span-2 lg:col-span-1 text-xxs lg:text-xs font-light text-[#EFEEE9] mt-1">
                            {images[1] && images[1].caption && (
                              <span className="border border-[#EFEEE9] rounded-full px-2 py-1">
                                {images[1].caption}
                              </span>
                            )}
                          </div>
                          <div className="col-span-2 lg:col-span-1 text-xxs lg:text-xs font-light text-[#EFEEE9] mt-1">
                            {images[2] && images[2].caption && (
                              <span className="border border-[#EFEEE9] rounded-full px-2 py-1">
                                {images[2].caption}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Mobile view - Carousel */}
                      <div className="block md:hidden w-full">
                        <MobileImageCarousel
                          mobileImages={mobileImages || []} // Ensure mobileImages is an array or an empty array
                          title={title}
                        />
                      </div>
                    </>
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
