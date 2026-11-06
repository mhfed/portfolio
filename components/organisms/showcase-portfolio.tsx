import { ShowcaseAbout } from '@/components/organisms/showcase-about'
import { ShowcaseContact } from '@/components/organisms/showcase-contact'
import { ShowcaseExperience } from '@/components/organisms/showcase-experience'
import { ShowcaseHero } from '@/components/organisms/showcase-hero'
import { ShowcaseMarquee } from '@/components/organisms/showcase-marquee'
import { ShowcaseProjects } from '@/components/organisms/showcase-projects'
import type { PortfolioContent } from '@/types/portfolio-content'

export interface ShowcasePortfolioProps {
  content: PortfolioContent
}

const HERO_NAV_IDS = new Set(['about', 'work', 'experience', 'contact'])

export function ShowcasePortfolio({ content }: ShowcasePortfolioProps) {
  const { about, contact, experience, fullName, hero, navigation, work } =
    content

  // "NGUYEN MINH HIEU" is too wide for one line at hero scale; use the given name.
  const heading = fullName.split(' ').slice(-2).join(' ')
  const heroNavigation = {
    ...navigation,
    items: navigation.items.filter((item) => HERO_NAV_IDS.has(item.id)),
  }
  const marqueeImages = work.projects
    .map((project) => project.image)
    .filter(Boolean)

  return (
    <>
      <a href='#main' className='skip-link'>
        {navigation.skipToContentLabel}
      </a>
      <main id='main' className='bg-void' style={{ overflowX: 'clip' }}>
        <ShowcaseHero
          heading={heading}
          navigation={heroNavigation}
          hero={hero}
        />
        <ShowcaseMarquee images={marqueeImages} />
        <ShowcaseAbout
          title={about.title}
          text={`${about.statement} ${about.description}`}
          contact={hero.actions.contact}
        />
        <ShowcaseExperience experience={experience} />
        <ShowcaseProjects
          title={work.title}
          launchLabel={work.launchLabel}
          projects={work.projects}
        />
        <ShowcaseContact
          fullName={fullName}
          locale={content.locale}
          contact={contact}
          languageLabel={navigation.language.label}
        />
      </main>
    </>
  )
}
