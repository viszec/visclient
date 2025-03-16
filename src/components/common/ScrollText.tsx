"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { ScrollVelocity } from "@/components/ui/TextAnimations/ScrollVelocity/ScrollVelocity";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollText() {
    const containerRef = useRef<HTMLDivElement>(null);
    const directionRef = useRef<number>(1);
    const velocityRef = useRef<number>(30);
    const [currentVelocity, setCurrentVelocity] = useState(30);

    // Set up scroll-based animation
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const scrollTrigger = ScrollTrigger.create({
            trigger: document.documentElement,
            start: 0,
            end: window.innerHeight,
            scrub: 0.15,
            onUpdate: (self) => {
                // Reverse direction and increase velocity when scrolling
                // Direction: 1 = down, -1 = up
                directionRef.current = self.direction * -1;
                
                // Increase velocity in both directions
                const newVelocity = self.direction === 1 ? -250 : 30;
                velocityRef.current = newVelocity;
                setCurrentVelocity(newVelocity);
            },
        });

        return () => {
            scrollTrigger.kill();
        };
    }, []);

    // Apply orange color to asterisks after component renders
    useLayoutEffect(() => {
        const applyOrangeAsterisks = () => {
            const textElements = document.querySelectorAll('.scrollVelocityText');
            textElements.forEach(element => {
                element.innerHTML = element.innerHTML.replace(/\*/g, '<span style="color:#f97316">*</span>');
            });
        };
        
        // Apply initially and whenever velocity changes
        applyOrangeAsterisks();
        
        return () => {
            // Cleanup if needed
        };
    }, [currentVelocity]);

    return (
        <div className="absolute top-[calc(100vh-160px)] lg:top-[calc(100vh-190px)] w-screen overflow-hidden left-0 right-0">
            <div
                ref={containerRef}
                className="relative whitespace-nowrap h-[160px] lg:h-[200px] w-screen"
            >
                <div className="absolute inset-0">
                    <ScrollVelocity
                        scrollContainerRef={containerRef}
                        texts={["INNÖVATION * CReATiVITY *"]}
                        velocity={currentVelocity}
                        className="text-black text-4xl lg:text-[150px] font-normal lg:font-medium scrollVelocityText"
                        parallaxClassName="relative overflow-hidden h-full w-screen"
                        scrollerClassName="whitespace-nowrap flex h-full items-center"
                        numCopies={4}
                        velocityMapping={{ input: [0, 1000], output: [0, 5] }}
                        parallaxStyle={{
                            height: "100%",
                            width: "100vw",
                            position: "absolute",
                            left: 0,
                            right: 0,
                        }}
                        scrollerStyle={{
                            display: "flex",
                            flexDirection: "row",
                            height: "100%",
                            width: "max-content",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
