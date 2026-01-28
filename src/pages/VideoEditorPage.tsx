import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// Dark mode toggle icons
const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

// Icons as components
const ScissorsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
)

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
)

const MagicAIIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    <path d="M5 3v4" />
    <path d="M3 5h4" />
    <path d="M19 17v4" />
    <path d="M17 19h4" />
  </svg>
)

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-16 w-16"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
)

type ActionButton = {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  gradient: string
  glow: string
}

const actionButtons: ActionButton[] = [
  {
    id: 'cut',
    label: 'Cut',
    description: 'Trim & split video segments',
    icon: <ScissorsIcon />,
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    glow: 'rgba(236, 72, 153, 0.4)',
  },
  {
    id: 'capture',
    label: 'Capture',
    description: 'Take screenshots from video',
    icon: <CameraIcon />,
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    glow: 'rgba(59, 130, 246, 0.4)',
  },
  {
    id: 'ai',
    label: 'Magic AI',
    description: 'AI-powered enhancements',
    icon: <MagicAIIcon />,
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    glow: 'rgba(249, 115, 22, 0.4)',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
}

const pulseVariants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.2, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

const shimmerVariants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
      repeatDelay: 1,
    },
  },
}

export default function VideoEditorPage() {
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const handleButtonClick = (id: string) => {
    setActiveButton(id)
    // Reset after animation
    setTimeout(() => setActiveButton(null), 600)
  }

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : ''}`}>
      {/* Animated background blobs */}
      <motion.div
        className={`pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full blur-3xl ${isDarkMode ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20' : 'bg-gradient-to-br from-purple-400/30 to-pink-400/30'}`}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full blur-3xl ${isDarkMode ? 'bg-gradient-to-br from-cyan-600/20 to-blue-600/20' : 'bg-gradient-to-br from-cyan-400/30 to-blue-400/30'}`}
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`pointer-events-none absolute bottom-20 left-1/3 h-72 w-72 rounded-full blur-3xl ${isDarkMode ? 'bg-gradient-to-br from-amber-600/15 to-orange-600/15' : 'bg-gradient-to-br from-amber-400/25 to-orange-400/25'}`}
        animate={{
          x: [0, 20, 0],
          y: [0, 40, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Dark Mode Toggle Button */}
      <motion.button
        className={`fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg backdrop-blur-xl transition-colors duration-300 ${
          isDarkMode 
            ? 'border-slate-700 bg-slate-800/90 text-amber-400 hover:bg-slate-700' 
            : 'border-white/50 bg-white/80 text-slate-700 hover:bg-white'
        }`}
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <SunIcon />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <MoonIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.div
        className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="text-center">
          <motion.div
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm transition-colors duration-300 ${
              isDarkMode 
                ? 'border-slate-700 bg-slate-800/60' 
                : 'border-white/20 bg-white/60'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Video Editor</span>
          </motion.div>
          <h1
            className={`bg-clip-text text-4xl font-bold text-transparent md:text-5xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-white via-slate-200 to-white' 
                : 'bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900'
            }`}
            style={{ fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, sans-serif' }}
          >
            Edit Your Video
          </h1>
          <p className={`mx-auto mt-3 max-w-lg transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Professional video editing tools with AI-powered enhancements
          </p>
        </motion.header>

        {/* Video Card */}
        <motion.div
          variants={itemVariants}
          className="relative mx-auto w-full max-w-xl"
        >
          {/* Glow effect behind card */}
          <motion.div
            className={`absolute -inset-4 rounded-3xl blur-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-cyan-600/30' 
                : 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20'
            }`}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Main video card */}
          <motion.div
            className={`relative overflow-hidden rounded-3xl border p-2 shadow-2xl backdrop-blur-xl transition-colors duration-300 ${
              isDarkMode 
                ? 'border-slate-700/60 bg-gradient-to-br from-slate-800/90 to-slate-900/90' 
                : 'border-white/40 bg-gradient-to-br from-white/80 to-white/60'
            }`}
            whileHover={{ scale: 1.005 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Video preview area */}
            <div
              className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              {/* Video placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Animated rings */}
                <div className="relative">
                  <motion.div
                    className="absolute -inset-8 rounded-full border-2 border-white/20"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.div
                    className="absolute -inset-16 rounded-full border border-white/10"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                    style={{ animationDelay: '0.5s' }}
                  />
                  
                  {/* Play button */}
                  <motion.button
                    className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <AnimatePresence mode="wait">
                      {isPlaying ? (
                        <motion.div
                          key="pause"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex gap-1"
                        >
                          <div className="h-8 w-2 rounded-full bg-white" />
                          <div className="h-8 w-2 rounded-full bg-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="play"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                        >
                          <PlayIcon />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                {/* Video info */}
                <motion.p
                  className="mt-8 text-sm text-white/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Drop your video here or click to browse
                </motion.p>
              </div>

              {/* Timeline bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="relative h-1 overflow-hidden rounded-full bg-white/20">
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: '33%' }}
                    transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                  />
                  {/* Shimmer effect on timeline */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-white/50">
                  <span>00:00</span>
                  <span>03:24</span>
                </div>
              </div>
            </div>

            {/* Action Buttons - Inside Card */}
            <motion.div
              className={`mt-2 flex items-center justify-start gap-2 rounded-xl p-2 transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-800/80' : 'bg-slate-50/80'
              }`}
              variants={containerVariants}
            >
              {actionButtons.map((button, index) => (
                <motion.div
                  key={button.id}
                  variants={buttonVariants}
                  custom={index}
                  className="group relative"
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${button.gradient} opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40`}
                    animate={activeButton === button.id ? { opacity: [0.4, 0.6, 0.4] } : {}}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Button */}
                  <motion.button
                    className={`relative flex items-center justify-center rounded-lg border p-2 shadow-md backdrop-blur-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'border-slate-600/60 bg-slate-700/90 hover:bg-slate-600' 
                        : 'border-white/60 bg-white/90 hover:bg-white'
                    }`}
                    style={{ boxShadow: `0 6px 20px -10px ${button.glow}` }}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    onClick={() => handleButtonClick(button.id)}
                    title={button.label}
                  >
                    {/* Icon container with gradient */}
                    <motion.div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${button.gradient} text-white shadow-sm`}
                      whileHover={{ rotate: [0, -6, 6, 0], scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="scale-75">{button.icon}</div>
                    </motion.div>

                    {/* Click ripple effect */}
                    <AnimatePresence>
                      {activeButton === button.id && (
                        <motion.div
                          className={`absolute inset-0 rounded-lg bg-gradient-to-r ${button.gradient}`}
                          initial={{ opacity: 0.3, scale: 0.8 }}
                          animate={{ opacity: 0, scale: 1.3 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom hint */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <motion.p
            className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✨ Click a tool above to start editing
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}
