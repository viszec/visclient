"use client"

import * as React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export default function WelcomingText() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#141516]">
      <GooeyText
        texts={["Design", "Engineering", "Is", "Awesome"]}
        morphTime={1}
        cooldownTime={0.3}
        className="font-bold"
        textClassName="text-white text-[42px]"
      />
    </div>
  );
}