import Image from 'next/image'
import { FadeIn } from '@/components/atoms/fade-in'
import { Magnet } from '@/components/atoms/magnet'
import { PillLink } from '@/components/atoms/pill-link'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface ShowcaseHeroProps {
  heading: string
  navigation: PortfolioContent['navigation']
  hero: PortfolioContent['hero']
}

export function ShowcaseHero({ heading, navigation, hero }: ShowcaseHeroProps) {
  return (
    <section
      id='top'
      className='relative flex h-screen min-h-[560px] flex-col'
      style={{ overflowX: 'clip' }}
    >
      <FadeIn delay={0} y={-20}>
        <nav
          aria-label={navigation.primaryNavigationLabel}
          className='flex justify-between px-6 pt-6 md:px-10 md:pt-8'
        >
          {navigation.items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className='text-sm font-medium tracking-wider text-mist uppercase transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]'
            >
              {item.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className='overflow-hidden'>
        <FadeIn delay={0.15} y={40}>
          <h1 className='hero-heading mt-6 w-full text-center text-[14vw] leading-none font-black tracking-tight whitespace-nowrap uppercase sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]'>
            {heading}
          </h1>
        </FadeIn>
      </div>

      <div className='mt-auto flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10'>
        <FadeIn delay={0.35} y={20} className='relative z-20'>
          <p
            className='max-w-[160px] leading-snug font-light tracking-wide text-mist uppercase sm:max-w-[220px] md:max-w-[260px]'
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {hero.intro}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className='relative z-20'>
          <PillLink href={hero.actions.contact.href} variant='gradient'>
            {hero.actions.contact.label}
          </PillLink>
        </FadeIn>
      </div>

      <div className='absolute top-1/2 left-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]'>
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition='transform 0.3s ease-out'
            inactiveTransition='transform 0.6s ease-in-out'
          >
            {/* Hovering swaps the typing pose for a wave (CSS only, see globals.css). */}
            <div className='hero-mascot relative'>
              <Image
                src='/images/hero-mascot-programmer.png'
                alt=''
                width={900}
                height={850}
                priority
                sizes='(min-width: 1024px) 520px, (min-width: 768px) 440px, (min-width: 640px) 360px, 280px'
                className='hero-mascot__base block h-auto w-full select-none'
                draggable={false}
              />
              <Image
                src='/images/mascot/poses/wave.png'
                alt=''
                width={1024}
                height={1024}
                sizes='(min-width: 1024px) 520px, (min-width: 768px) 440px, (min-width: 640px) 360px, 280px'
                className='hero-mascot__alt absolute inset-x-0 bottom-0 h-auto w-full select-none'
                draggable={false}
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>
    </section>
  )
}
