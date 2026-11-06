import Link from 'next/link'
import { FadeIn } from '@/components/atoms/fade-in'
import { PillLink } from '@/components/atoms/pill-link'
import { routing } from '@/i18n/routing'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface ShowcaseContactProps {
  fullName: string
  locale: PortfolioContent['locale']
  contact: PortfolioContent['contact']
  languageLabel: string
}

const LOCALE_NAMES: Record<string, string> = {
  en: 'EN',
  vi: 'VI',
  'zh-TW': '繁中',
}

export function ShowcaseContact({
  fullName,
  locale,
  contact,
  languageLabel,
}: ShowcaseContactProps) {
  return (
    <section
      id='contact'
      className='flex min-h-[80vh] flex-col items-center justify-between gap-20 px-5 pt-24 pb-10 sm:px-8 md:px-10 md:pt-32'
    >
      <div className='flex flex-col items-center gap-10 text-center sm:gap-14'>
        <FadeIn delay={0} y={40}>
          <h2
            className='hero-heading leading-none font-black tracking-tight uppercase'
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            {contact.title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15} y={20} className='flex max-w-[640px] flex-col gap-4'>
          <p
            className='font-medium text-mist'
            style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.75rem)' }}
          >
            {contact.headline}
          </p>
          <p
            className='leading-relaxed font-light text-mist/70'
            style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)' }}
          >
            {contact.description}
          </p>
        </FadeIn>
        <FadeIn delay={0.3} y={20} className='flex flex-col items-center gap-4'>
          <PillLink href={contact.email.href} variant='gradient'>
            {contact.email.label}
          </PillLink>
          <a
            href={contact.email.href}
            className='font-light tracking-wide text-mist transition-opacity duration-200 hover:opacity-70'
          >
            {contact.email.value}
          </a>
        </FadeIn>
        <FadeIn delay={0.4} y={20} className='flex flex-wrap justify-center gap-3'>
          {contact.links.map((link) => (
            <PillLink
              key={link.href}
              href={link.href}
              variant='ghost'
              external={link.external}
              download={link.download}
            >
              {link.label}
            </PillLink>
          ))}
        </FadeIn>
      </div>

      <footer className='flex w-full flex-col items-center justify-between gap-4 border-t border-mist/15 pt-6 text-sm font-light text-mist/70 sm:flex-row'>
        <p>
          © {new Date().getFullYear()} {fullName}. {contact.rights}
        </p>
        <nav aria-label={languageLabel} className='flex gap-4'>
          {routing.locales.map((candidate) => (
            <Link
              key={candidate}
              href={`/${candidate}`}
              hrefLang={candidate}
              aria-current={candidate === locale ? 'true' : undefined}
              className={
                candidate === locale
                  ? 'font-medium text-mist'
                  : 'transition-opacity duration-200 hover:opacity-70'
              }
            >
              {LOCALE_NAMES[candidate] ?? candidate}
            </Link>
          ))}
        </nav>
      </footer>
    </section>
  )
}
