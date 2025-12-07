import { BrowserRouter as Router } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import CodingProfiles from './components/CodingProfiles'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import Loader from './components/Loader'
import { ToastContainer } from './components/Toast'
import usePortfolio from './hooks/usePortfolio'
import useToast from './hooks/useToast'

function App() {
  const { data, loading } = usePortfolio()
  const { toasts, addToast, removeToast } = useToast()

  if (loading) {
    return <Loader />
  }

  return (
    <Router>
      <motion.div 
        className="relative min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ParticleBackground />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <Navbar resumeLink={data?.profile?.resumeLink} />
        <main>
          <Hero profile={data?.profile} />
          <About profile={data?.profile} />
          <Skills skills={data?.skills} />
          <Projects projects={data?.projects} />
          <Experience profile={data?.profile} />
          <CodingProfiles profile={data?.profile} />
          <Contact profile={data?.profile} onToast={addToast} />
        </main>
        <Footer profile={data?.profile} />
      </motion.div>
    </Router>
  )
}

export default App
