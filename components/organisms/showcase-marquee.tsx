'use client'

import Image from 'next/image'
import type React from 'react'
import { useEffect, useRef } from 'react'

export interface ShowcaseMarqueeProps {
  images: string[]
}

interface MarqueeRowProps {
  images: string[]
  rowRef: React.Ref<HTMLDivElement>
}

function MarqueeRow({ images, rowRef }: MarqueeRowProps) {
  // Tripled so the row never runs out while it drifts with the scroll.
  const tiles = [...images, ...images, ...images]
  return (
    <div
      ref={rowRef}
      className='flex w-max gap-3'
      style={{ willChange: 'transform' }}
    >
      {tiles.map((src, index) => (
        <Image
          key={`${src}-${index}`}
          src={src}
          alt=''
          width={420}
          height={270}
          sizes='420px'
          quality={70}
          className='h-[270px] w-[420px] shrink-0 rounded-2xl object-cover'
        />
      ))}
    </div>
  )
}

/** Two rows of project captures that slide in opposite directions as the page scrolls. */
export function ShowcaseMarquee({ images }: ShowcaseMarqueeProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const rowOneRef = useRef<HTMLDivElement>(null)
  const rowTwoRef = useRef<HTMLDivElement>(null)

  // With only a handful of captures, splitting them would make each row repeat
  // every two tiles; both rows show all of them, the second in reverse order.
  const rowTwo = [...images].reverse()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Write transforms straight to the DOM so scrolling never re-renders React.
    const update = () => {
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      if (rowOneRef.current) {
        rowOneRef.current.style.transform = `translateX(${offset - 200}px)`
      }
      if (rowTwoRef.current) {
        rowTwoRef.current.style.transform = `translateX(${-(offset - 200)}px)`
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (images.length === 0) return null

  return (
    <section
      ref={sectionRef}
      aria-hidden='true'
      className='flex flex-col gap-3 bg-void pt-24 pb-10 sm:pt-32 md:pt-40'
    >
      <MarqueeRow images={images} rowRef={rowOneRef} />
      <MarqueeRow images={rowTwo} rowRef={rowTwoRef} />
    </section>
  )
}
