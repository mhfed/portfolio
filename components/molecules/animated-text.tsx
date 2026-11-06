'use client'

import type React from 'react'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'

export interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

interface CharProps {
  char: string
  progress: MotionValue<number>
  range: [number, number]
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className='relative'>
      <span className='invisible'>{char}</span>
      <motion.span className='absolute top-0 left-0' style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  )
}

/** Scroll-driven reveal: every character fades from 0.2 to 1 as the paragraph crosses the viewport. */
export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = text.split(' ')
  const total = text.length
  let cursor = 0

  return (
    <p ref={ref} className={`relative ${className ?? ''}`} style={style}>
      <span className='sr-only'>{text}</span>
      <span aria-hidden='true'>
        {words.map((word, wordIndex) => {
          const chars = Array.from(word).map((char) => {
            const start = cursor / total
            cursor += 1
            return (
              <Char
                key={cursor}
                char={char}
                progress={scrollYProgress}
                range={[start, cursor / total]}
              />
            )
          })
          cursor += 1 // the space between words
          return (
            <span key={wordIndex} className='inline-block whitespace-nowrap'>
              {chars}
              {wordIndex < words.length - 1 ? ' ' : null}
            </span>
          )
        })}
      </span>
    </p>
  )
}
