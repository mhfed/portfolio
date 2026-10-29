/**
 * Portfolio version archive.
 *
 * There are no official releases or git tags in this repository (0 tags,
 * 0 releases as of 2026-10-29), so this list is reconstructed from git
 * history: the main design eras on `main`, plus the experiment branches
 * that were never merged. Each entry links to the commit or branch it
 * describes, so the archive stays verifiable against GitHub.
 *
 * Descriptions are kept in English and Vietnamese. For zh-TW the page
 * falls back to the English text rather than shipping a machine
 * translation.
 */

export type PortfolioVersionStatus = 'current' | 'superseded' | 'experiment'

export type PortfolioVersion = {
  id: string
  period: string
  commit: string
  branch?: string
  status: PortfolioVersionStatus
  link: string
  title: { en: string; vi: string }
  description: { en: string; vi: string }
  highlights: string[]
  /**
   * Embedded snapshot served from this site, e.g. '/archive/v6/en.html'.
   * Use '{locale}' for snapshots that have one HTML file per locale.
   * Absent when no runnable snapshot could be exported for this version.
   */
  liveUrl?: string
  /** Locales the snapshot actually has files for; others fall back to en. */
  snapshotLocales?: string[]
  /** Note about the snapshot (or why there is none), shown on the card. */
  liveNote?: { en: string; vi: string }
}

const repo = 'https://github.com/mhfed/portfolio'

export const MAIN_VERSIONS: PortfolioVersion[] = [
  {
    id: 'v1',
    period: 'Nov 2025',
    commit: '4833145',
    status: 'superseded',
    link: `${repo}/commit/4833145`,
    title: { en: 'V1: The original', vi: 'V1: Bản khởi đầu' },
    description: {
      en: 'Dark-mode portfolio generated from a chat prompt, then hardened with i18n, a GSAP typing hero, a blog section and PWA support. Note: this original commit still carries the template placeholder name ILLIA BUKATYCH, not Nguyen Minh Hieu yet, and it predates i18n, so it has a single homepage.',
      vi: 'Bản portfolio dark-mode khởi đầu từ prompt chat, sau đó bổ sung i18n, hero typing GSAP, mục blog và hỗ trợ PWA. Lưu ý: commit gốc này vẫn mang tên mẫu ILLIA BUKATYCH, chưa phải tên Nguyen Minh Hieu, và nó ra đời trước i18n nên chỉ có một trang chủ duy nhất.',
    },
    highlights: ['Dark mode', 'next-intl', 'GSAP typing hero', 'Blog', 'PWA'],
    liveUrl: '/archive/v1/en.html',
  },
  {
    id: 'v2',
    period: 'Dec 2025 - Jan 2026',
    commit: 'b18c8f4',
    status: 'superseded',
    link: `${repo}/commit/b18c8f4`,
    title: { en: 'V2: Database and admin', vi: 'V2: Database và admin' },
    description: {
      en: 'Projects moved into a database with an admin dashboard, Cloudinary image uploads and a TipTap blog editor.',
      vi: 'Project chuyển sang database kèm dashboard admin, upload ảnh Cloudinary và trình soạn blog TipTap.',
    },
    highlights: ['Database projects', 'Admin dashboard', 'Cloudinary', 'TipTap blog'],
    liveUrl: '/archive/v2/{locale}.html',
    snapshotLocales: ['en', 'vi'],
    liveNote: {
      en: 'Snapshot note: the snapshot shows only the interface; the database query was replaced with the static project list, so project titles in the Vietnamese snapshot are English, as in that list.',
      vi: 'Lưu ý snapshot: snapshot chỉ giữ giao diện, truy vấn database đã thay bằng danh sách project tĩnh nên tiêu đề project trong bản tiếng Việt vẫn là tiếng Anh, đúng như danh sách gốc.',
    },
  },
  {
    id: 'v3',
    period: 'Jan - Jun 2026',
    commit: '6d279fa',
    status: 'superseded',
    link: `${repo}/commit/6d279fa`,
    title: { en: 'V3: Themes and three locales', vi: 'V3: Theme và 3 ngôn ngữ' },
    description: {
      en: 'Luxury Gold light mode and Binance dark mode, Traditional Chinese (zh-TW) support, a vertical experience timeline and an accent theme selector.',
      vi: 'Theme Luxury Gold (sáng) và Binance (tối), thêm tiếng Trung phồn thể (zh-TW), timeline kinh nghiệm dạng dọc và bộ chọn màu accent.',
    },
    highlights: ['Luxury Gold / Binance themes', 'zh-TW locale', 'Vertical timeline', 'Accent themes'],
    liveUrl: '/archive/v3/{locale}.html',
    liveNote: {
      en: 'Snapshot note: interface only; the blog section was omitted (it needed Server Actions and a database), and experience items are reconstructed from a neighbouring version. The footer blog link has no snapshot page.',
      vi: 'Lưu ý snapshot: chỉ giữ giao diện; mục blog đã lược bỏ vì cần Server Actions và database, mục kinh nghiệm được dựng lại từ bản lân cận, link blog ở footer không có trang snapshot tương ứng.',
    },
  },
  {
    id: 'v4',
    period: 'Jun - Jul 2026',
    commit: 'f8dcfef',
    status: 'superseded',
    link: `${repo}/commit/f8dcfef`,
    title: { en: 'V4: Static and atomic', vi: 'V4: Tĩnh hóa và kiến trúc atomic' },
    description: {
      en: 'Blog, admin and database removed in favour of static data files. Components reorganised into an atomic structure with a creative, GSAP-driven layout.',
      vi: 'Gỡ blog, admin và database để chuyển sang file dữ liệu tĩnh. Component tổ chức lại theo kiến trúc atomic với layout sáng tạo chạy bằng GSAP.',
    },
    highlights: ['Static data', 'Atomic components', 'GSAP project preview', 'MacBook mockup'],
    liveUrl: '/archive/v4/{locale}.html',
    liveNote: {
      en: 'Snapshot note: interface only; locale is taken from the page path instead of headers, so the snapshot renders statically.',
      vi: 'Lưu ý snapshot: chỉ giữ giao diện; locale lấy từ đường dẫn trang thay vì headers để snapshot render tĩnh được.',
    },
  },
  {
    id: 'v5',
    period: 'Jul - Aug 2026',
    commit: '6a93a2f',
    status: 'superseded',
    link: `${repo}/commit/6a93a2f`,
    title: { en: 'V5: 3D Financial HUD', vi: 'V5: 3D Financial HUD' },
    description: {
      en: 'Full rebuild as a particle-led 3D Financial HUD experience, with a documented Three.js recipe and performance rules.',
      vi: 'Dựng lại toàn bộ thành trải nghiệm 3D Financial HUD với hạt particle, kèm tài liệu công thức Three.js và quy tắc hiệu năng.',
    },
    highlights: ['Three.js', 'Particle-led HUD', 'WebGL bundle split', 'Self-tuned DPR'],
    liveUrl: '/archive/v5/{locale}.html',
  },
  {
    id: 'v6',
    period: 'Aug - Sep 2026',
    commit: '2600014',
    status: 'superseded',
    link: `${repo}/commit/2600014`,
    title: { en: 'V6: Portfolio 2026 and mascot', vi: 'V6: Portfolio 2026 và mascot' },
    description: {
      en: 'The redesign/portfolio-2026 branch merged in three pull requests, bringing a GSAP kinetic hero, a mascot theme and scroll storytelling.',
      vi: 'Nhánh redesign/portfolio-2026 merge qua 3 pull request, mang theo hero kinetic GSAP, theme mascot và kể chuyện bằng scroll.',
    },
    highlights: ['GSAP motion system', 'Kinetic hero', 'Mascot theme', 'Scroll storytelling'],
    liveUrl: '/archive/v6/{locale}.html',
  },
  {
    id: 'v7',
    period: 'Sep 2026 - now',
    commit: 'abedf82',
    status: 'current',
    link: `${repo}/tree/main`,
    title: { en: 'V7: Kage / Ronin (current)', vi: 'V7: Kage / Ronin (bản hiện tại)' },
    description: {
      en: 'The live version: Kage aesthetic with a 6-stage scroll camera, a 3D Ronin swordsman in ink-brush style, frosted-glass cards and a quiet editorial grid.',
      vi: 'Bản đang live: thẩm mỹ Kage với camera scroll 6 chặng, nhân vật Ronin 3D phong cách mực tàu, thẻ kính mờ và lưới editorial tối giản.',
    },
    highlights: ['Kage aesthetic', '3D Ronin', '6-stage scroll camera', 'Frosted-glass cards'],
  },
]

export const EXPERIMENT_VERSIONS: PortfolioVersion[] = [
  {
    id: 'exp-magic-ui',
    period: 'Nov 2025',
    commit: 'fb49d15',
    branch: 'feat/magic-ui',
    status: 'experiment',
    link: `${repo}/tree/feat/magic-ui`,
    title: { en: 'Experiment: Magic UI', vi: 'Thử nghiệm: Magic UI' },
    description: {
      en: 'Magic-UI style marquee, text-reveal and typing animations. Never merged.',
      vi: 'Hiệu ứng marquee, text-reveal và typing kiểu Magic-UI. Chưa từng được merge.',
    },
    highlights: ['Marquee', 'Text reveal', 'Typing animation'],
  },
  {
    id: 'exp-ver2',
    period: 'Mar 2026',
    commit: 'b7229f6',
    branch: 'feat/ver2',
    status: 'experiment',
    link: `${repo}/tree/feat/ver2`,
    title: { en: 'Experiment: Ver2', vi: 'Thử nghiệm: Ver2' },
    description: {
      en: 'A Collaborate section, expandable text in Work Experience and a reworked header and footer. Never merged.',
      vi: 'Thêm mục Collaborate, text mở rộng trong Work Experience và làm lại header/footer. Chưa từng được merge.',
    },
    highlights: ['CollaborateSection', 'ExpandableText', 'Header / footer rework'],
  },
  {
    id: 'exp-new-ver',
    period: 'Jun 2026',
    commit: 'f51870d',
    branch: 'new-ver',
    status: 'experiment',
    link: `${repo}/tree/new-ver`,
    title: { en: 'Experiment: New version', vi: 'Thử nghiệm: New version' },
    description: {
      en: 'Preloader, custom cursor, magnetic links and a noise overlay over the June 2026 hero. Never merged.',
      vi: 'Preloader, con trỏ tùy chỉnh, link magnetic và lớp noise phủ lên hero tháng 06/2026. Chưa từng được merge.',
    },
    highlights: ['Preloader', 'Custom cursor', 'Magnetic links', 'Noise overlay'],
  },
  {
    id: 'exp-uiux-review',
    period: 'Jun 2026',
    commit: 'e4a82b0',
    branch: 'uiux-review-insights-9de39',
    status: 'experiment',
    link: `${repo}/pull/2`,
    title: { en: 'Experiment: UI/UX review (PR #2)', vi: 'Thử nghiệm: UI/UX review (PR #2)' },
    description: {
      en: 'Accessibility and layout fixes for the work section. Still open as PR #2, but it conflicts with current main and cannot merge as-is.',
      vi: 'Sửa accessibility và layout cho mục work. Vẫn mở dưới dạng PR #2, nhưng đang conflict với main hiện tại nên không merge trực tiếp được.',
    },
    highlights: ['Accessibility', 'Work section layout', 'PR #2, conflicts with main'],
  },
]

export const ALL_VERSIONS: PortfolioVersion[] = [
  ...MAIN_VERSIONS,
  ...EXPERIMENT_VERSIONS,
]
