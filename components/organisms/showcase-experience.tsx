import { FadeIn } from '@/components/atoms/fade-in'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface ShowcaseExperienceProps {
  experience: PortfolioContent['experience']
}

const DIVIDER = '1px solid rgba(12, 12, 12, 0.15)'

/** White sheet listing each role as a numbered row (the "Services" layout). */
export function ShowcaseExperience({ experience }: ShowcaseExperienceProps) {
  return (
    <section
      id='experience'
      className='rounded-t-[40px] bg-white px-5 py-20 text-void sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32'
    >
      <FadeIn delay={0} y={40}>
        <h2
          className='mb-16 text-center leading-[1.1] font-black tracking-tight whitespace-pre-line uppercase sm:mb-20 md:mb-28'
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          {experience.title}
        </h2>
      </FadeIn>

      {experience.records.length === 0 ? (
        <p className='text-center opacity-60'>{experience.emptyLabel}</p>
      ) : (
        <ol className='mx-auto max-w-5xl'>
          {experience.records.map((record, index) => (
            <FadeIn key={record.id} as='li' delay={index * 0.1}>
              <div
                className='flex items-start gap-6 py-8 sm:gap-10 sm:py-10 md:gap-14 md:py-12'
                style={{
                  borderTop: index === 0 ? DIVIDER : undefined,
                  borderBottom: DIVIDER,
                }}
              >
                <span
                  aria-hidden='true'
                  className='w-[1.3em] shrink-0 leading-none font-black'
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className='flex min-w-0 flex-col gap-2 md:gap-3'>
                  <h3
                    className='font-medium uppercase'
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {record.company}
                  </h3>
                  <p
                    className='font-normal'
                    style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
                  >
                    {record.position}
                    <span className='block opacity-60'>
                      {record.period}, {record.location}
                    </span>
                  </p>
                  <p
                    className='max-w-2xl leading-relaxed font-light'
                    style={{
                      fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                      opacity: 0.6,
                    }}
                  >
                    {record.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </ol>
      )}
    </section>
  )
}
