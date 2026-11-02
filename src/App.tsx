import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { About } from './components/About'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { CustomCursor } from './components/CustomCursor'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LenisProvider } from './components/LenisProvider'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { ChapterRail } from './components/ui/ChapterRail'
import { ScrollProgress } from './components/ui/ScrollProgress'

const ParticleScene = lazy(() =>
  import('./three/ParticleScene').then((module) => ({ default: module.ParticleScene })),
)

function App() {
  const [loading, setLoading] = useState(true)
  const handleLoaded = useCallback(() => setLoading(false), [])

  useEffect(() => {
    document.body.classList.toggle('is-loading', loading)
    return () => document.body.classList.remove('is-loading')
  }, [loading])

  useEffect(() => {
    if (loading) return

    const refresh = window.setTimeout(() => {
      window.dispatchEvent(new Event('portfolio:refresh'))
    }, 120)

    return () => window.clearTimeout(refresh)
  }, [loading])

  useEffect(() => {
    if (loading || !window.location.hash) return

    const targetId = decodeURIComponent(window.location.hash.slice(1))
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [loading])

  return (
    <>
      <LenisProvider />
      <Suspense fallback={null}>
        <ParticleScene ready={!loading} />
      </Suspense>
      <div className="scene-scrim" aria-hidden="true" />
      <CustomCursor />

      <AnimatePresence>
        {loading ? <Loader onComplete={handleLoaded} /> : null}
      </AnimatePresence>

      <div className="page-content">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <ScrollProgress />
        <ChapterRail />
        <Navbar />
        <main id="main-content">
          <Hero introReady={!loading} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
