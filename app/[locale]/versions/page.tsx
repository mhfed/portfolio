import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import {
  EXPERIMENT_VERSIONS,
  MAIN_VERSIONS,
  type PortfolioVersion,
  type PortfolioVersionStatus,
} from '@/data/versions'

type Props = {
  params: Promise<{ locale: string }>
}

type UiText = {
  title: string
  subtitle: string
  note: string
  back: string
  mainHeading: string
  experimentHeading: string
  viewSource: string
  commitLabel: string
  branchLabel: string
  status: Record<PortfolioVersionStatus, string>
}

const UI: Record<string, UiText> = {
  en: {
    title: 'Version archive',
    subtitle: 'How this portfolio has changed, from the first commit to today.',
    note: 'There are no official releases or tags in this repository, so this archive is reconstructed from git history. Every entry links to its commit or branch on GitHub.',
    back: 'Back to home',
    mainHeading: 'Main versions',
    experimentHeading: 'Experiments that were never merged',
    viewSource: 'View on GitHub',
    commitLabel: 'Commit',
    branchLabel: 'Branch',
    status: {
      current: 'Current',
      superseded: 'Superseded',
      experiment: 'Experiment',
    },
  },
  vi: {
    title: 'Lưu trữ các phiên bản',
    subtitle: 'Portfolio này đã thay đổi như thế nào, từ commit đầu tiên đến hôm nay.',
    note: 'Repo này không có release hay tag chính thức, nên trang này được dựng lại từ lịch sử git. Mỗi mục đều có link tới commit hoặc nhánh tương ứng trên GitHub.',
    back: 'Về trang chủ',
    mainHeading: 'Các phiên bản chính',
    experimentHeading: 'Các bản thử nghiệm chưa từng merge',
    viewSource: 'Xem trên GitHub',
    commitLabel: 'Commit',
    branchLabel: 'Nhánh',
    status: {
      current: 'Bản hiện tại',
      superseded: 'Đã thay thế',
      experiment: 'Thử nghiệm',
    },
  },
  'zh-TW': {
    title: '版本檔案',
    subtitle: 'How this portfolio has changed, from the first commit to today.',
    note: 'There are no official releases or tags in this repository, so this archive is reconstructed from git history. Every entry links to its commit or branch on GitHub.',
    back: '返回首頁',
    mainHeading: '主要版本',
    experimentHeading: '未合併的實驗版本',
    viewSource: 'View on GitHub',
    commitLabel: 'Commit',
    branchLabel: 'Branch',
    status: {
      current: '目前版本',
      superseded: '已取代',
      experiment: '實驗版本',
    },
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const ui = UI[locale] ?? UI.en
  return {
    title: `Nguyen Minh Hieu - ${ui.title}`,
    description: ui.subtitle,
    alternates: {
      canonical: `/${locale}/versions`,
      languages: {
        en: '/en/versions',
        vi: '/vi/versions',
        'zh-TW': '/zh-TW/versions',
        'x-default': '/en/versions',
      },
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

function VersionCard({
  version,
  locale,
  ui,
}: {
  version: PortfolioVersion
  locale: string
  ui: UiText
}) {
  const title =
    locale === 'vi' ? version.title.vi : version.title.en
  const description =
    locale === 'vi' ? version.description.vi : version.description.en

  return (
    <article className='rounded-2xl border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5'>
      <div className='flex flex-wrap items-center gap-3'>
        <span className='font-mono text-xs font-bold uppercase tracking-widest'>
          {version.id}
        </span>
        <span className='rounded-full bg-black px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-black'>
          {ui.status[version.status]}
        </span>
        <span className='text-sm opacity-70'>{version.period}</span>
      </div>
      <h3 className='mt-4 text-2xl font-semibold'>{title}</h3>
      <p className='mt-2 leading-relaxed opacity-80'>{description}</p>
      <ul className='mt-4 flex flex-wrap gap-2'>
        {version.highlights.map((highlight) => (
          <li
            key={highlight}
            className='rounded-full border border-black/10 px-3 py-1 text-xs dark:border-white/15'
          >
            {highlight}
          </li>
        ))}
      </ul>
      <div className='mt-5 flex flex-wrap items-center gap-4 text-sm'>
        <span className='font-mono'>
          {ui.commitLabel}: {version.commit}
        </span>
        {version.branch ? (
          <span className='font-mono'>
            {ui.branchLabel}: {version.branch}
          </span>
        ) : null}
        <a
          href={version.link}
          target='_blank'
          rel='noreferrer'
          className='font-semibold underline underline-offset-4'
        >
          {ui.viewSource} →
        </a>
      </div>
    </article>
  )
}

export default async function VersionsPage({ params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const ui = UI[locale] ?? UI.en

  return (
    <main className='mx-auto max-w-4xl px-6 py-16'>
      <a href={`/${locale}`} className='font-semibold underline underline-offset-4'>
        ← {ui.back}
      </a>
      <h1 className='mt-8 text-4xl font-bold sm:text-5xl'>{ui.title}</h1>
      <p className='mt-4 text-lg leading-relaxed opacity-80'>{ui.subtitle}</p>
      <p className='mt-4 rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm leading-relaxed dark:border-white/10 dark:bg-white/5'>
        {ui.note}
      </p>

      <section className='mt-12'>
        <h2 className='text-3xl font-bold'>{ui.mainHeading}</h2>
        <div className='mt-6 grid gap-6'>
          {MAIN_VERSIONS.map((version) => (
            <VersionCard
              key={version.id}
              version={version}
              locale={locale}
              ui={ui}
            />
          ))}
        </div>
      </section>

      <section className='mt-16'>
        <h2 className='text-3xl font-bold'>{ui.experimentHeading}</h2>
        <div className='mt-6 grid gap-6'>
          {EXPERIMENT_VERSIONS.map((version) => (
            <VersionCard
              key={version.id}
              version={version}
              locale={locale}
              ui={ui}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
