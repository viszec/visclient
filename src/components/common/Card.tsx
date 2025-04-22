'use client';

import { forwardRef } from 'react';

import Image from 'next/image';

interface CardProps {
  id: number;
  frontSrc: string;
  frontAlt: string;
  title: string;
  description: string;
  services: string[];
  stacks?: string;
  tools?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ id, frontSrc, frontAlt, title, description, services, stacks, tools }, ref) => {
    return (
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                 w-[300px] h-[400px] perspective-1000"
        ref={ref}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-full h-full animate-floating"
          style={{ animationDelay: `${(id - 1) * 0.2}s` }}
        >
          <div className="relative w-full h-full preserve-3d">
            {/* Front of card */}
            <div
              className="flip-card-front absolute w-full h-full backface-hidden 
                         rounded-lg overflow-hidden"
            >
              {/* Background image */}
              <Image
                priority
                src={frontSrc}
                width={300}
                height={400}
                alt={frontAlt}
                className="w-full h-full object-cover border-[1px] border-gray-100 rounded-xl shadow-sm"
              />

              {/* Three-layer overlay content */}
              <div className="absolute inset-0 flex flex-col items-center justify-between p-8">
                {/* Top SVG */}
                <div className="w-full flex justify-center">
                  <Image
                    src="/images/extrovert.svg"
                    width={140}
                    height={20}
                    alt="Extrovert decoration"
                    className="opacity-30 w-auto"
                  />
                </div>

                {/* Middle Title */}
                <div className="px-6 py-3 rounded-lg backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-[#E6E5DF]/70 font-baskervville tracking-wide text-center drop-shadow-md">
                    {title}
                  </h2>
                </div>

                {/* Bottom SVG */}
                <div className="relative w-full flex justify-center">
                  <Image
                    src="/images/double-diamond.svg"
                    width={140}
                    height={60}
                    alt="Double diamond decoration"
                    className="opacity-30 w-auto"
                  />
                </div>
              </div>
            </div>
            {/* Back of card */}
            <div
              className="flip-card-back absolute w-full h-full backface-hidden 
                         rounded-xl overflow-hidden bg-transparent p-4 rotate-y-180 border-[1px] border-gray-200 shadow-sm"
            >
              {/* Background SVG */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/back-card.svg"
                  alt="Card background"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col h-full text-left border-[1px] border-[#E6E5DF]/40 p-4 rounded-xl relative z-10">
                <h3 className="text-xl font-bold text-[#E6E5DF] mb-2 font-baskervville tracking-wide">{title}</h3>
                <div className="w-12 h-[1px] bg-[#E6E5DF]/60 mb-3 mt-3"></div>
                <p className="text-sm text-[#E6E5DF] mb-4 font-light italic">{description}</p>
                <div className="space-y-1 m-2">
                  {services.map((service, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-[#E6E5DF]/80 flex font-light"
                    >
                      <span className="mr-2 text-[#E6E5DF]/70">•</span>
                      <span>{service}</span>
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-3 border-t border-[#E6E5DF]/40">
                  {stacks && (
                    <p className="text-xs text-[#E6E5DF]/80">
                      <span className="font-medium text-[#E6E5DF]/80">Stacks:</span> {stacks}
                    </p>
                  )}
                  {tools && (
                    <p className="text-xs text-[#E6E5DF]/80">
                      <span className="font-medium text-[#E6E5DF]/80">Tools:</span> {tools}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
