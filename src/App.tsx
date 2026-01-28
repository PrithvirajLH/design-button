import { motion, AnimatePresence } from 'framer-motion'
import { type CSSProperties, type ReactNode, useState } from 'react'
import { RainbowButton } from '@/components/ui/rainbow-button'
import VideoEditorPage from './pages/VideoEditorPage'

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

const gridVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

const useClickSpark = () => {
  const [sparkKey, setSparkKey] = useState(0)
  const trigger = () => setSparkKey((prev) => prev + 1)
  return { sparkKey, trigger }
}

type VariantCardProps = {
  label: string
  note: string
  children: ReactNode
}

const VariantCard = ({ label, note, children }: VariantCardProps) => (
  <motion.div
    variants={itemVariants}
    className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-soft-lg backdrop-blur"
  >
    <div className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
      <span>{label}</span>
      <span className="text-slate-400">{note}</span>
    </div>
    <div className="mt-4 flex flex-1 items-center justify-center">{children}</div>
  </motion.div>
)

type SectionProps = {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}

const Section = ({ eyebrow, title, description, children }: SectionProps) => (
  <motion.section
    variants={gridVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className="surface-panel"
  >
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
        {eyebrow}
      </span>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p>
        </div>
        <span className="pill">Click to preview</span>
      </div>
    </div>
    <motion.div
      variants={gridVariants}
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {children}
    </motion.div>
  </motion.section>
)

type MagicVariant = 'aurora' | 'mint' | 'sunset' | 'midnight'

type VariantTone = {
  label: string
  note: string
  style: CSSProperties
}

const rainbowVariants = [
  { label: 'Default', note: 'Primary', variant: 'default', size: 'default' },
  { label: 'Outline', note: 'Alt', variant: 'outline', size: 'default' },
  { label: 'Compact', note: 'Small', variant: 'default', size: 'sm' },
  { label: 'Large', note: 'Hero', variant: 'default', size: 'lg' },
] as const

const magicVariants: Record<MagicVariant, VariantTone> = {
  aurora: {
    label: 'Aurora',
    note: 'Shimmer',
    style: {
      '--btn-from': '#22d3ee',
      '--btn-to': '#fb923c',
      '--btn-text': '#0f172a',
      '--btn-glow': 'rgba(34, 211, 238, 0.45)',
      '--spark-color': 'rgba(255, 255, 255, 0.85)',
    } as CSSProperties,
  },
  mint: {
    label: 'Mint',
    note: 'Soft glow',
    style: {
      '--btn-from': '#4ade80',
      '--btn-to': '#14b8a6',
      '--btn-text': '#06281e',
      '--btn-glow': 'rgba(34, 197, 94, 0.45)',
      '--spark-color': 'rgba(214, 250, 226, 0.9)',
    } as CSSProperties,
  },
  sunset: {
    label: 'Sunset',
    note: 'Warmth',
    style: {
      '--btn-from': '#fb7185',
      '--btn-to': '#f59e0b',
      '--btn-text': '#3f1d0b',
      '--btn-glow': 'rgba(251, 113, 133, 0.4)',
      '--spark-color': 'rgba(255, 237, 213, 0.9)',
    } as CSSProperties,
  },
  midnight: {
    label: 'Midnight',
    note: 'Deep',
    style: {
      '--btn-from': '#0f172a',
      '--btn-to': '#1e293b',
      '--btn-text': '#f8fafc',
      '--btn-glow': 'rgba(15, 23, 42, 0.6)',
      '--spark-color': 'rgba(148, 163, 184, 0.6)',
    } as CSSProperties,
  },
}

const MagicButton = ({ variant }: { variant: MagicVariant }) => {
  const { sparkKey, trigger } = useClickSpark()
  const tone = magicVariants[variant]

  return (
    <motion.button
      type="button"
      className="magic-button w-full text-sm"
      style={tone.style}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      onClick={trigger}
    >
      <span className="magic-shimmer" aria-hidden />
      <span className="magic-glow" aria-hidden />
      {sparkKey > 0 && (
        <span key={sparkKey} className="btn-spark is-active" aria-hidden />
      )}
      <span className="relative z-10">{tone.label}</span>
    </motion.button>
  )
}

type AceVariant = 'orbit' | 'ember' | 'glass' | 'ghost'

const aceVariants: Record<AceVariant, VariantTone> = {
  orbit: {
    label: 'Primary',
    note: 'Moving border',
    style: {
      '--ace-border': 'conic-gradient(from 90deg, #22d3ee, #14b8a6, #fb923c, #22d3ee)',
      '--ace-surface': 'rgba(15, 23, 42, 0.95)',
      '--ace-text': '#f8fafc',
      '--spark-color': 'rgba(34, 211, 238, 0.65)',
    } as CSSProperties,
  },
  ember: {
    label: 'Secondary',
    note: 'Warm',
    style: {
      '--ace-border': 'conic-gradient(from 140deg, #f97316, #f59e0b, #fb7185, #f97316)',
      '--ace-surface': 'rgba(24, 24, 27, 0.96)',
      '--ace-text': '#fff7ed',
      '--spark-color': 'rgba(251, 146, 60, 0.6)',
    } as CSSProperties,
  },
  glass: {
    label: 'Glass',
    note: 'Frosted',
    style: {
      '--ace-border': 'conic-gradient(from 40deg, #a7f3d0, #67e8f9, #38bdf8, #a7f3d0)',
      '--ace-surface': 'rgba(255, 255, 255, 0.65)',
      '--ace-text': '#0f172a',
      '--spark-color': 'rgba(125, 211, 252, 0.6)',
    } as CSSProperties,
  },
  ghost: {
    label: 'Ghost',
    note: 'Minimal',
    style: {
      '--ace-border': 'conic-gradient(from 0deg, #cbd5f5, #e2e8f0, #94a3b8, #cbd5f5)',
      '--ace-surface': 'rgba(255, 255, 255, 0.4)',
      '--ace-text': '#0f172a',
      '--spark-color': 'rgba(148, 163, 184, 0.5)',
    } as CSSProperties,
  },
}

const AceternityButton = ({ variant }: { variant: AceVariant }) => {
  const { sparkKey, trigger } = useClickSpark()
  const tone = aceVariants[variant]

  return (
    <div className="ace-shell w-full" style={tone.style}>
      {sparkKey > 0 && (
        <span key={sparkKey} className="btn-spark is-active" aria-hidden />
      )}
      <motion.button
        type="button"
        className="ace-button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        onClick={trigger}
      >
        {tone.label}
      </motion.button>
    </div>
  )
}

type StudioVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

const studioVariants: Record<StudioVariant, VariantTone> = {
  primary: {
    label: 'Primary',
    note: 'Shadcn',
    style: {
      '--studio-bg': '#0f172a',
      '--studio-text': '#f8fafc',
      '--studio-border': 'rgba(15, 23, 42, 0.6)',
      '--spark-color': 'rgba(148, 163, 184, 0.6)',
    } as CSSProperties,
  },
  secondary: {
    label: 'Secondary',
    note: 'Muted',
    style: {
      '--studio-bg': '#e2e8f0',
      '--studio-text': '#0f172a',
      '--studio-border': 'rgba(148, 163, 184, 0.4)',
      '--spark-color': 'rgba(100, 116, 139, 0.45)',
    } as CSSProperties,
  },
  outline: {
    label: 'Outline',
    note: 'Neutral',
    style: {
      '--studio-bg': '#ffffff',
      '--studio-text': '#0f172a',
      '--studio-border': 'rgba(148, 163, 184, 0.6)',
      '--spark-color': 'rgba(148, 163, 184, 0.5)',
    } as CSSProperties,
  },
  ghost: {
    label: 'Ghost',
    note: 'Bare',
    style: {
      '--studio-bg': 'transparent',
      '--studio-text': '#0f172a',
      '--studio-border': 'rgba(15, 23, 42, 0.15)',
      '--spark-color': 'rgba(148, 163, 184, 0.45)',
    } as CSSProperties,
  },
}

const StudioButton = ({ variant }: { variant: StudioVariant }) => {
  const { sparkKey, trigger } = useClickSpark()
  const tone = studioVariants[variant]

  return (
    <motion.button
      type="button"
      className={cn('studio-button w-full', variant === 'ghost' && 'backdrop-blur')}
      style={tone.style}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      onClick={trigger}
    >
      {sparkKey > 0 && (
        <span key={sparkKey} className="btn-spark is-active" aria-hidden />
      )}
      <span className="relative z-10">{tone.label}</span>
    </motion.button>
  )
}

type MaterialVariant = 'filled' | 'tonal' | 'outlined' | 'text'

const materialVariants: Record<MaterialVariant, VariantTone> = {
  filled: {
    label: 'Filled',
    note: 'Material 3',
    style: {
      '--mat-bg': '#0f172a',
      '--mat-text': '#f8fafc',
      '--mat-border': '#0f172a',
      '--spark-color': 'rgba(148, 163, 184, 0.55)',
    } as CSSProperties,
  },
  tonal: {
    label: 'Tonal',
    note: 'Soft',
    style: {
      '--mat-bg': '#e0f2fe',
      '--mat-text': '#0f172a',
      '--mat-border': 'rgba(14, 116, 144, 0.25)',
      '--spark-color': 'rgba(56, 189, 248, 0.5)',
    } as CSSProperties,
  },
  outlined: {
    label: 'Outlined',
    note: 'Line',
    style: {
      '--mat-bg': '#ffffff',
      '--mat-text': '#0f172a',
      '--mat-border': 'rgba(15, 23, 42, 0.35)',
      '--spark-color': 'rgba(100, 116, 139, 0.4)',
    } as CSSProperties,
  },
  text: {
    label: 'Text',
    note: 'Minimal',
    style: {
      '--mat-bg': 'transparent',
      '--mat-text': '#0f172a',
      '--mat-border': 'rgba(15, 23, 42, 0.15)',
      '--spark-color': 'rgba(148, 163, 184, 0.35)',
    } as CSSProperties,
  },
}

const MaterialButton = ({ variant }: { variant: MaterialVariant }) => {
  const { sparkKey, trigger } = useClickSpark()
  const tone = materialVariants[variant]

  return (
    <motion.button
      type="button"
      className={cn('material-button w-full', variant === 'text' && 'border-dashed')}
      style={tone.style}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      onClick={trigger}
    >
      {sparkKey > 0 && (
        <span key={sparkKey} className="btn-spark is-active" aria-hidden />
      )}
      <span className="relative z-10">{tone.label}</span>
    </motion.button>
  )
}

type GlassVariant = 'frost' | 'peach' | 'seafoam' | 'clear'

const glassVariants: Record<GlassVariant, VariantTone> = {
  frost: {
    label: 'Frost',
    note: 'Glass',
    style: {
      '--glass-bg': 'rgba(255, 255, 255, 0.75)',
      '--glass-text': '#0f172a',
      '--glass-border': 'rgba(148, 163, 184, 0.35)',
      '--spark-color': 'rgba(148, 163, 184, 0.45)',
    } as CSSProperties,
  },
  peach: {
    label: 'Peach',
    note: 'Warm',
    style: {
      '--glass-bg': 'rgba(255, 237, 213, 0.75)',
      '--glass-text': '#7c2d12',
      '--glass-border': 'rgba(251, 146, 60, 0.35)',
      '--spark-color': 'rgba(251, 146, 60, 0.5)',
    } as CSSProperties,
  },
  seafoam: {
    label: 'Seafoam',
    note: 'Cool',
    style: {
      '--glass-bg': 'rgba(236, 253, 245, 0.75)',
      '--glass-text': '#064e3b',
      '--glass-border': 'rgba(16, 185, 129, 0.35)',
      '--spark-color': 'rgba(16, 185, 129, 0.45)',
    } as CSSProperties,
  },
  clear: {
    label: 'Clear',
    note: 'Outline',
    style: {
      '--glass-bg': 'rgba(255, 255, 255, 0.4)',
      '--glass-text': '#0f172a',
      '--glass-border': 'rgba(148, 163, 184, 0.3)',
      '--spark-color': 'rgba(100, 116, 139, 0.35)',
    } as CSSProperties,
  },
}

const GlassButton = ({ variant }: { variant: GlassVariant }) => {
  const { sparkKey, trigger } = useClickSpark()
  const tone = glassVariants[variant]

  return (
    <motion.button
      type="button"
      className="glass-button w-full"
      style={tone.style}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      onClick={trigger}
    >
      {sparkKey > 0 && (
        <span key={sparkKey} className="btn-spark is-active" aria-hidden />
      )}
      <span className="relative z-10">{tone.label}</span>
    </motion.button>
  )
}

type NeonVariant = 'circuit' | 'ember' | 'lime' | 'sky'

const neonVariants: Record<NeonVariant, VariantTone> = {
  circuit: {
    label: 'Circuit',
    note: 'Neon',
    style: {
      '--neon-glow': 'rgba(16, 185, 129, 0.6)',
      '--neon-text': '#ecfdf5',
      '--spark-color': 'rgba(16, 185, 129, 0.6)',
    } as CSSProperties,
  },
  ember: {
    label: 'Ember',
    note: 'Pulse',
    style: {
      '--neon-glow': 'rgba(249, 115, 22, 0.6)',
      '--neon-text': '#fff7ed',
      '--spark-color': 'rgba(249, 115, 22, 0.6)',
    } as CSSProperties,
  },
  lime: {
    label: 'Lime',
    note: 'Energy',
    style: {
      '--neon-glow': 'rgba(132, 204, 22, 0.6)',
      '--neon-text': '#f7fee7',
      '--spark-color': 'rgba(132, 204, 22, 0.6)',
    } as CSSProperties,
  },
  sky: {
    label: 'Sky',
    note: 'Cool',
    style: {
      '--neon-glow': 'rgba(56, 189, 248, 0.6)',
      '--neon-text': '#e0f2fe',
      '--spark-color': 'rgba(56, 189, 248, 0.6)',
    } as CSSProperties,
  },
}

const NeonButton = ({ variant }: { variant: NeonVariant }) => {
  const { sparkKey, trigger } = useClickSpark()
  const tone = neonVariants[variant]

  return (
    <motion.button
      type="button"
      className="neon-button w-full"
      style={tone.style}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      onClick={trigger}
    >
      {sparkKey > 0 && (
        <span key={sparkKey} className="btn-spark is-active" aria-hidden />
      )}
      <span className="relative z-10">{tone.label}</span>
    </motion.button>
  )
}

type Page = 'buttons' | 'video-editor'

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
)

const ButtonsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
)

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('video-editor')

  return (
    <div className="relative min-h-screen">
      {/* Floating Navigation */}
      <motion.nav
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
      >
        <div className="flex items-center gap-1 rounded-full border border-white/50 bg-white/80 p-1.5 shadow-xl backdrop-blur-xl">
          <motion.button
            onClick={() => setCurrentPage('video-editor')}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              currentPage === 'video-editor'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'text-slate-600 hover:bg-slate-100'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <VideoIcon />
            Video Editor
          </motion.button>
          <motion.button
            onClick={() => setCurrentPage('buttons')}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
              currentPage === 'buttons'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'text-slate-600 hover:bg-slate-100'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ButtonsIcon />
            Button Catalog
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence mode="wait">
        {currentPage === 'video-editor' ? (
          <motion.div
            key="video-editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <VideoEditorPage />
          </motion.div>
        ) : (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ButtonsCatalog />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ButtonsCatalog() {
  return (
    <>
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 animate-floaty rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-12 h-64 w-64 animate-floaty rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 animate-floaty rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 pt-24">
        <header className="surface-panel">
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">React 18</span>
            <span className="pill">Framer Motion</span>
            <span className="pill">Tailwind CSS</span>
            <span className="pill">Buttons Canvas</span>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl" style={{ fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, sans-serif' }}>
              Button Catalogue Canvas
            </h1>
            <p className="max-w-3xl text-base text-slate-600">
              A modern gallery of button systems with micro animations. Each row represents a
              different visual language (Magic UI shimmer, Aceternity moving borders, Shadcn
              utility styles, Material 3, glassmorphism, and neon). Click any sample to preview
              the press animation and shimmer effects.
            </p>
          </div>
          <div className="mt-8 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4">
              <p className="font-semibold text-slate-900">Usage notes</p>
              <p className="mt-2">
                Every button includes a click spark layer and spring hover. Swap tokens to align
                with product palettes without rewriting animation code.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4">
              <p className="font-semibold text-slate-900">Accessibility</p>
              <p className="mt-2">
                Contrast and hit area meet modern UI guidelines. Keep labels short and add icons
                as needed for clarity.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4">
              <p className="font-semibold text-slate-900">Implementation</p>
              <p className="mt-2">
                Built in React 18 with Tailwind CSS tokens. Replace styles with design system
                variables or connect to your component library.
              </p>
            </div>
          </div>
        </header>

        <Section
          eyebrow="Magic UI"
          title="Shimmer gradients"
          description="Bright, lively buttons inspired by Magic UI shimmer treatments. Ideal for primary calls to action and hero sections."
        >
          {(Object.keys(magicVariants) as MagicVariant[]).map((variant) => (
            <VariantCard
              key={variant}
              label={magicVariants[variant].label}
              note={magicVariants[variant].note}
            >
              <MagicButton variant={variant} />
            </VariantCard>
          ))}
        </Section>

        <Section
          eyebrow="Magic UI"
          title="Rainbow border glow"
          description="A Magic UI inspired rainbow button from shadcn patterns. Uses layered gradients and animated highlights."
        >
          {rainbowVariants.map((variant) => (
            <VariantCard key={variant.label} label={variant.label} note={variant.note}>
              <RainbowButton
                variant={variant.variant}
                size={variant.size}
                className="w-full shadow-soft-lg ring-1 ring-slate-900/10"
              >
                {variant.label}
              </RainbowButton>
            </VariantCard>
          ))}
        </Section>

        <Section
          eyebrow="Aceternity UI"
          title="Moving border energy"
          description="Animated conic gradients echo Aceternity UI moving borders. Use for high-emphasis actions or cinematic UI moments."
        >
          {(Object.keys(aceVariants) as AceVariant[]).map((variant) => (
            <VariantCard
              key={variant}
              label={aceVariants[variant].label}
              note={aceVariants[variant].note}
            >
              <AceternityButton variant={variant} />
            </VariantCard>
          ))}
        </Section>

        <Section
          eyebrow="Shadcn Style"
          title="Utility-first classics"
          description="Balanced tones for dashboards, admin surfaces, and workflows that need clarity without heavy decoration."
        >
          {(Object.keys(studioVariants) as StudioVariant[]).map((variant) => (
            <VariantCard
              key={variant}
              label={studioVariants[variant].label}
              note={studioVariants[variant].note}
            >
              <StudioButton variant={variant} />
            </VariantCard>
          ))}
        </Section>

        <Section
          eyebrow="Material 3"
          title="Tonal hierarchy"
          description="Soft elevation and shape language for cross-platform products. These buttons prioritize clarity and rhythm."
        >
          {(Object.keys(materialVariants) as MaterialVariant[]).map((variant) => (
            <VariantCard
              key={variant}
              label={materialVariants[variant].label}
              note={materialVariants[variant].note}
            >
              <MaterialButton variant={variant} />
            </VariantCard>
          ))}
        </Section>

        <Section
          eyebrow="Glass"
          title="Frosted surfaces"
          description="Layered glassmorphism treatments for premium settings, media players, or ambient navigation."
        >
          {(Object.keys(glassVariants) as GlassVariant[]).map((variant) => (
            <VariantCard
              key={variant}
              label={glassVariants[variant].label}
              note={glassVariants[variant].note}
            >
              <GlassButton variant={variant} />
            </VariantCard>
          ))}
        </Section>

        <Section
          eyebrow="Neon Tech"
          title="Glow accents"
          description="Neon modes for gaming, data streams, or futuristic interfaces that benefit from a darker accent surface."
        >
          {(Object.keys(neonVariants) as NeonVariant[]).map((variant) => (
            <VariantCard
              key={variant}
              label={neonVariants[variant].label}
              note={neonVariants[variant].note}
            >
              <NeonButton variant={variant} />
            </VariantCard>
          ))}
        </Section>
      </div>
    </>
  )
}
