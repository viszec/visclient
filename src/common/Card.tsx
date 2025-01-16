'use client'

import { forwardRef } from "react";
import Image from "next/image";

interface CardProps {
  id: number;
  frontSrc: string;
  frontAlt: string;
  backText: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  id, 
  frontSrc, 
  frontAlt, 
  backText 
}, ref) => {
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
          <div className="flip-card-front absolute w-full h-full backface-hidden 
                         rounded-lg overflow-hidden">
            <Image
              priority
              src={frontSrc}
              width={300}
              height={400}
              alt={frontAlt}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Back of card */}
          <div className="flip-card-back absolute w-full h-full backface-hidden 
                         rounded-lg overflow-hidden bg-white p-4 rotate-y-180">
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         text-center text-xl font-medium">
              {backText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
