import Image from 'next/image'
import { FadeIn } from '@/components/atoms/fade-in'
import { PillLink } from '@/components/atoms/pill-link'
import { AnimatedText } from '@/components/molecules/animated-text'
import type { PortfolioLink } from '@/types/portfolio-content'

export interface ShowcaseAboutProps {
  title: string
  text: string
  contact: PortfolioLink
}

const DECOR = [
  {
    src: '/images/story/mascot-about.png',
    className:
      'top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: '/images/story/mascot-work.png',
    className:
      'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: '/images/story/mascot-skills.png',
    className:
      'top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: '/images/story/mascot-experience.png',
    className:
      'right-[3%] bottom-[8%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
] as const

export function ShowcaseAbout({ title, text, contact }: ShowcaseAboutProps) {
  return (
    <section
      id='about'
      className='relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10'
    >
      {DECOR.map((item) => (
        <FadeIn
          key={item.src}
          className={`pointer-events-none absolute ${item.className}`}
          delay={item.delay}
          x={item.x}
          y={0}
          duration={0.9}
        >
          <Image
            src={item.src}
            alt=''
            width={1254}
            height={1254}
            sizes='(min-width: 768px) 220px, 170px'
            className='block h-auto w-full'
          />
        </FadeIn>
      ))}

      <div className='relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24'>
        <div className='flex flex-col items-center gap-10 sm:gap-14 md:gap-16'>
          <FadeIn delay={0} y={40}>
            <h2
              className='hero-heading text-center leading-none font-black tracking-tight uppercase'
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              {title}
            </h2>
          </FadeIn>
          <AnimatedText
            text={text}
            className='max-w-[560px] text-center leading-relaxed font-medium text-mist'
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>
        <PillLink href={contact.href} variant='gradient'>
          {contact.label}
        </PillLink>
      </div>
    </section>
  )
}
