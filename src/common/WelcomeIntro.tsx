//👋
//🌤️ IT IS NICE ⇗ TO
//MEET 😊 YOU.

'use client'

import { LetterSwapForward, LetterSwapPingPong } from "@/components/ui/letter-swap"

export function WelcomeIntro() {
  return (
    <div className="w-full h-full rounded-lg flex flex-col items-start justify-start font-calendas">
      <div className="pt-6 lg:pt-12 text-black/90 rounded-xl !text-left gap-y-0.5 lg:gap-y-1 flex flex-col">
        <LetterSwapForward
          label="HI, FRIEND!"
          reverse={true}
          className="text-xl md:text-3xl italic lg:py-1 font-light text-black/80 !text-left"
        />
        <LetterSwapForward
          label="I am { Mavis }"
          reverse={false}
          className="text-xl md:text-4xl font-normal lg:py-1 text-black/80 !text-left"
        />
        <LetterSwapForward
          label="A CREATIVE"
          staggerFrom={"center"}
          className="text-xl md:text-3xl mono font-light tracking-relaxed text-black/80 lg:py-1 !text-left"
        />
        <LetterSwapPingPong
          label="Web Designer & Developer"
          staggerFrom={"center"}
          reverse={false}
          className="text-xl md:text-4xl font-overusedGrotesk font-light tracking-tight lg:py-1 text-black/80 !text-left"
        />
        <LetterSwapPingPong
          label="< i am interested in: />"
          staggerFrom={"last"}
          className="text-lg md:text-2xl mono font-overusedGrotesk font-normal lg:pt-1 italic text-black/80 !text-left"
        />
      </div>
    </div>
  )
}