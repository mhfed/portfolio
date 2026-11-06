'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { PortfolioStoryContent } from '@/types/storytelling'

export type MascotPose =
  | 'wave'
  | 'point'
  | 'think'
  | 'celebrate'
  | 'run'
  | 'peek'
  | 'thumbsup'
  | 'mail'

export interface MascotGuideProps {
  story: PortfolioStoryContent
}

const POSES: MascotPose[] = [
  'wave',
  'point',
  'think',
  'celebrate',
  'run',
  'peek',
  'thumbsup',
  'mail',
]

/** Section id on the page → the pose the guide settles into there. */
const SECTION_POSES: Record<string, MascotPose> = {
  about: 'point',
  experience: 'think',
  work: 'thumbsup',
  contact: 'mail',
}

const SECTION_IDS = ['top', ...Object.keys(SECTION_POSES)]
const RUN_MS = 520
const CELEBRATE_MS = 1100
const BUBBLE_MS = 4500

/**
 * A small mascot pinned to the corner that follows the reader: it runs in when
 * a new section reaches the middle of the viewport, settles into that
 * section's pose and says that section's line. Hover makes it peek, a click
 * celebrates and toggles the speech bubble.
 */
export function MascotGuide({ story }: MascotGuideProps) {
  const [section, setSection] = useState('top')
  const [transient, setTransient] = useState<MascotPose | null>(null)
  const [hovered, setHovered] = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const hopRef = useRef<HTMLSpanElement>(null)
  const reduceMotionRef = useRef(false)
  const transientTimer = useRef<number | undefined>(undefined)
  const bubbleTimer = useRef<number | undefined>(undefined)

  const visible = section !== 'top'
  const restingPose = SECTION_POSES[section] ?? 'wave'
  const pose = transient ?? (hovered ? 'peek' : restingPose)
  const beat = story.beats.find((candidate) => candidate.id === section)

  const playTransient = (next: MascotPose, duration: number) => {
    if (reduceMotionRef.current) return
    window.clearTimeout(transientTimer.current)
    setTransient(next)
    // One hop per pose change, played on the existing node (no remount, no loop).
    hopRef.current?.animate(
      [
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-14%) scale(1.04)', offset: 0.4 },
        { transform: 'translateY(0) scale(0.98)', offset: 0.75 },
        { transform: 'translateY(0) scale(1)' },
      ],
      { duration: 520, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    )
    transientTimer.current = window.setTimeout(
      () => setTransient(null),
      duration
    )
  }

  const openBubbleFor = (duration: number) => {
    window.clearTimeout(bubbleTimer.current)
    setBubbleOpen(true)
    bubbleTimer.current = window.setTimeout(
      () => setBubbleOpen(false),
      duration
    )
  }

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((element): element is HTMLElement => element !== null)

    // A section counts as current once it crosses the middle band of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setSection(hit.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      window.clearTimeout(transientTimer.current)
      window.clearTimeout(bubbleTimer.current)
    }
  }, [])

  // Entering a new section: run in, then show that section's line for a moment.
  const previousSection = useRef(section)
  useEffect(() => {
    if (previousSection.current === section) return
    previousSection.current = section
    if (section === 'top') {
      setBubbleOpen(false)
      return
    }
    playTransient('run', RUN_MS)
    openBubbleFor(BUBBLE_MS)
  }, [section]) // playTransient/openBubbleFor only touch refs and setters

  const handleClick = () => {
    if (bubbleOpen) {
      window.clearTimeout(bubbleTimer.current)
      setBubbleOpen(false)
      return
    }
    playTransient('celebrate', CELEBRATE_MS)
    window.clearTimeout(bubbleTimer.current)
    setBubbleOpen(true)
  }

  return (
    <aside
      aria-label={story.ariaLabel}
      className='mascot-guide pointer-events-none fixed right-3 bottom-3 z-40 flex flex-col items-end sm:right-6 sm:bottom-6'
      data-visible={visible}
    >
      <p
        role='status'
        className='mascot-guide__bubble mb-2 max-w-[240px] rounded-2xl rounded-br-sm bg-mist px-4 py-3 text-sm leading-snug font-medium text-void shadow-lg sm:max-w-[280px] sm:text-base'
        data-open={visible && bubbleOpen && Boolean(beat)}
      >
        {beat ? (
          <>
            <span className='mb-1 block text-xs font-semibold tracking-widest uppercase opacity-60'>
              {beat.label}
            </span>
            {beat.dialogue}
          </>
        ) : null}
      </p>

      <button
        type='button'
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        aria-expanded={bubbleOpen}
        aria-label={
          bubbleOpen ? story.hideTooltipLabel : story.showTooltipLabel
        }
        tabIndex={visible ? 0 : -1}
        className='pointer-events-auto relative aspect-square w-[96px] cursor-pointer rounded-full sm:w-[130px] lg:w-[150px]'
      >
        <span ref={hopRef} className='absolute inset-0'>
          {POSES.map((candidate) => (
            <Image
              key={candidate}
              src={`/images/mascot/poses/${candidate}.png`}
              alt=''
              width={1024}
              height={1024}
              sizes='150px'
              className='mascot-guide__pose absolute inset-0 h-full w-full select-none'
              data-active={candidate === pose}
              draggable={false}
            />
          ))}
        </span>
      </button>
    </aside>
  )
}
