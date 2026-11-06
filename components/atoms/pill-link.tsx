import type React from 'react'
import { cn } from '@/lib/utils'

export interface PillLinkProps {
  href: string
  children: React.ReactNode
  variant: 'gradient' | 'ghost'
  external?: boolean
  download?: boolean
  className?: string
}

const VARIANT_CLASSES: Record<PillLinkProps['variant'], string> = {
  gradient:
    'px-8 py-3 text-xs text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base',
  ghost:
    'border-2 border-mist px-8 py-3 text-sm text-mist transition-colors duration-200 hover:bg-mist/10 sm:px-10 sm:py-3.5 sm:text-base',
}

const GRADIENT_STYLE: React.CSSProperties = {
  background:
    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow:
    '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
  outline: '2px solid white',
  outlineOffset: '-3px',
}

/** Pill-shaped call to action: `gradient` is the contact CTA, `ghost` the outline variant. */
export function PillLink({
  href,
  children,
  variant,
  external,
  download,
  className,
}: PillLinkProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-medium uppercase tracking-widest whitespace-nowrap',
        VARIANT_CLASSES[variant],
        className
      )}
      style={variant === 'gradient' ? GRADIENT_STYLE : undefined}
    >
      {children}
    </a>
  )
}
