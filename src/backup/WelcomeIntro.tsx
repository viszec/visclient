'use client';

import { LetterSwapForward, LetterSwapPingPong } from '@/components/ui/letter-swap';

export function WelcomeIntro() {
  return (
    <div className="w-full h-full rounded-lg flex flex-col items-start justify-start font-calendas">
      <div className="pt-3 lg:pt-12 text-black/90 rounded-xl !text-left gap-y-1 lg:gap-y-2 flex flex-col">
        <LetterSwapForward
          label="Hey, nice to meet you!"
          reverse={true}
          className="text-base lg:text-2xl italic font-light text-black/70"
        />
        <LetterSwapForward
          label="MAVIS MA"
          reverse={false}
          className="text-4xl lg:text-7xl font-semibold lg:py-1 text-black/85"
        />
        <LetterSwapPingPong
          label="Creative Web Developer"
          staggerFrom={'center'}
          reverse={false}
          className="text-xl lg:text-4xl font-overusedGrotesk lg:tracking-wide font-normal lg:py-1 text-black/75"
        />
        <LetterSwapPingPong
          label="< Technologies I work with />"
          staggerFrom={'last'}
          className="text-sm lg:text-xl mono font-overusedGrotesk font-normal tracking-tight lg:tracking-normal mt-1 mb-1 lg:mb-0 xl:mt-3 text-black/60"
        />
      </div>
    </div>
  );
}
