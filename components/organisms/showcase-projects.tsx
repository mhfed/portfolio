'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { FadeIn } from '@/components/atoms/fade-in'
import type { ProjectCaseStudy } from '@/data/projects'

export interface ShowcaseProjectsProps {
  title: string
  launchLabel: string
  projects: ProjectCaseStudy[]
}

interface ProjectCardProps {
  project: ProjectCaseStudy
  index: number
  total: number
  launchLabel: string
  progress: MotionValue<number>
}

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

function ProjectCard({
  project,
  index,
  total,
  launchLabel,
  progress,
}: ProjectCardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <li className='sticky top-24 flex h-[85vh] items-start justify-center md:top-32'>
      <motion.article
        className={`relative w-full origin-top border-2 border-mist bg-void p-4 sm:p-6 md:p-8 ${RADIUS}`}
        style={{ scale, top: `${index * 28}px` }}
      >
        <header className='mb-4 flex flex-wrap items-center justify-between gap-4 text-mist sm:mb-6 md:mb-8'>
          <div className='flex min-w-0 items-center gap-4 sm:gap-6 md:gap-8'>
            <span
              aria-hidden='true'
              className='leading-none font-black'
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className='flex min-w-0 flex-col gap-1'>
              <span
                className='font-light tracking-widest uppercase opacity-60'
                style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
              >
                {project.year}, {project.role}
              </span>
              <h3
                className='font-medium uppercase'
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.title}
              </h3>
            </div>
          </div>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex shrink-0 items-center rounded-full border-2 border-mist px-8 py-3 text-sm font-medium tracking-widest whitespace-nowrap text-mist uppercase transition-colors duration-200 hover:bg-mist/10 sm:px-10 sm:py-3.5 sm:text-base'
            >
              {launchLabel}
              <span className='sr-only'>: {project.title}</span>
            </a>
          ) : null}
        </header>

        <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
          <div
            className={`flex flex-col justify-between gap-4 border-2 border-mist/20 p-5 text-mist sm:w-[40%] sm:gap-6 sm:p-6 md:p-8 ${RADIUS}`}
          >
            <div className='flex flex-col gap-4'>
              <p
                className='font-medium'
                style={{ fontSize: 'clamp(1rem, 1.6vw, 1.35rem)' }}
              >
                {project.description}
              </p>
              <ul
                className='hidden flex-col gap-2 leading-relaxed font-light opacity-70 sm:flex'
                style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)' }}
              >
                {project.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <ul className='flex flex-wrap gap-2'>
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className='rounded-full border border-mist/30 px-3 py-1 text-xs tracking-wide uppercase'
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className='relative order-first min-h-[200px] overflow-hidden sm:order-none sm:min-h-[220px] sm:w-[60%]'>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes='(min-width: 1152px) 640px, (min-width: 640px) 55vw, 90vw'
              quality={75}
              className={`object-cover object-top ${RADIUS}`}
            />
          </div>
        </div>
      </motion.article>
    </li>
  )
}

/** Sticky cards that stack and shrink slightly as the next project scrolls over them. */
export function ShowcaseProjects({
  title,
  launchLabel,
  projects,
}: ShowcaseProjectsProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id='work'
      className='relative z-10 -mt-10 rounded-t-[40px] bg-void px-5 pt-20 pb-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32'
    >
      <FadeIn delay={0} y={40}>
        <h2
          className='hero-heading mb-16 text-center leading-none font-black tracking-tight uppercase sm:mb-20 md:mb-28'
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          {title}
        </h2>
      </FadeIn>

      <ol ref={listRef} className='relative mx-auto max-w-6xl'>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            launchLabel={launchLabel}
            progress={scrollYProgress}
          />
        ))}
      </ol>
    </section>
  )
}
