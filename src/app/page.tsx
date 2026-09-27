'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/ui/Navbar'
import MusicPlayer from '@/components/ui/MusicPlayer'
import WelcomeScreen from '@/components/WelcomeScreen'
import Hero from '@/components/sections/Hero'
import Members from '@/components/sections/Members'
import { hasPlayedIntro, setIntroPlayed } from '@/lib/introState'
import { playlist } from '@/data'

const INTRO_DURATION = 2800

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [showApp, setShowApp] = useState(false)

  useEffect(() => {
    const isReload =
      performance.getEntriesByType('navigation').length > 0 &&
      (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type === 'reload'

    if (isReload) {
      sessionStorage.removeItem('revgng_intro')
      sessionStorage.removeItem('revgng_navbar')
      sessionStorage.removeItem('revgng_hero')
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    if (!hasPlayedIntro()) {
      setShowWelcome(true)
      setShowApp(false)
      const t = setTimeout(() => {
        setShowWelcome(false)
        setShowApp(true)
        setIntroPlayed()
      }, INTRO_DURATION)
      return () => clearTimeout(t)
    } else {
      setShowWelcome(false)
      setShowApp(true)
    }
  }, [])

  return (
    <main style={{ position: 'relative', background: '#000', minHeight: '100dvh' }}>
      {/* Welcome intro */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ y: '-100%' }}
            onAnimationStart={(def) => {
              if (def && typeof def === 'object' && 'y' in def) setShowApp(true)
            }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          >
            <WelcomeScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* App */}
      {showApp && (
        <>
          <Navbar />
          <Hero showApp={showApp} />
          <Members />
          <MusicPlayer playlist={playlist} />
        </>
      )}
    </main>
  )
}
