import { BrowserRouter as Router } from 'react-router-dom'
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
import { ToastContainer } from './components/Toast'
import usePortfolio from './hooks/usePortfolio'
import useToast from './hooks/useToast'

function App() {
  const { data, loading } = usePortfolio()
  const { toasts, addToast, removeToast } = useToast()

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-300 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="relative min-h-screen">
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
      </div>
    </Router>
  )
}

export default App
