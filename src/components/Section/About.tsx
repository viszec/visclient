'use client'
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Rounded from '@/common/RoundedButton'

// Animation variants for text reveal
const slideUp = {
  initial: {
    y: "100%"
  },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.01 * i }
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 }
  }
}

// Animation variants for paragraph
const fadeIn = {
  initial: {
    opacity: 0,
    y: 20
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2 }
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.6 }
  }
}

export default function About() {
  const phrase = "BRINGING DIGITAL IDEAS TO LIFE WITH CARE AND CRAFT. CREATING MEMORABLE WEB EXPERIENCES FOR FORWARD-THINKING BRANDS. LET'S EXPLORE NEW FRONTIERS IN DESIGN TOGETHER."
  const description = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about"
      ref={description} 
      className="flex px-24 mt-32 text-4xl justify-center"
    >
      <div ref={ref} className="max-w-7xl flex gap-12 relative pt-32">
        {/* Main heading with word-by-word animation */}
        <div className="flex-1">
          <p className="m-0 text-4xl leading-tight">
            {phrase.split(" ").map((word, index) => (
              <span key={index} className="inline-block overflow-hidden mr-[3px]">
                <motion.span 
                  className="inline-block"
                  variants={slideUp} 
                  custom={index} 
                  initial="initial"
                  animate={inView ? "open" : "closed"}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>
        </div>

        {/* Description paragraph with line-by-line animation */}
        <motion.div
          className="flex-1"
          variants={fadeIn}
          initial="initial"
          animate={inView ? "open" : "closed"}
        >
          <p className="m-0 text-base text-gray-500 font-light">
            I am a Web Designer & Developer with a keen eye for detail and a passion 
            for innovative solutions. My approach blends creativity, code, and 
            user-focused design. I believe in the power of collaboration to solve 
            complex digital challenges. Every project is an opportunity to learn, 
            grow, and create something truly special. Shall we embark on a digital 
            adventure and see where it takes us?
          </p>
        </motion.div>

        <div data-scroll data-scroll-speed={0.1}>
          <Rounded className="rounded-button">
            <p className="m-0 text-base font-light relative z-[2]">
              About me
            </p>
          </Rounded>
        </div>
      </div>
    </section>
  )
} 