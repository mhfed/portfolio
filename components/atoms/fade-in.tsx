'use client'

import type React from 'react'
import { motion, useReducedMotion } from 'motion/react'

type FadeInTag = 'div' | 'li' | 'section' | 'header' | 'nav' | 'span'

// One motion component per tag, created once at module scope (never per render).
const MOTION_TAGS = {
  div: motion.create('div'),
  li: motion.create('li'),
  section: motion.create('section'),
  header: motion.create('header'),
  nav: motion.create('nav'),
  span: motion.create('span'),
} as const

export interface FadeInProps {
  children?: React.ReactNode
  as?: FadeInTag
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
}

export function FadeIn({
  children,
  as = 'div',
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const reduceMotion = useReducedMotion()
  const Component = MOTION_TAGS[as] as typeof motion.div

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  )
}
