import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces, SiCodechef, SiCodingninjas } from 'react-icons/si'
import { HiArrowDown } from 'react-icons/hi'

const platformIcons = {
  LeetCode: SiLeetcode,
  GeeksforGeeks: SiGeeksforgeeks,
  Codeforces: SiCodeforces,
  CodeChef: SiCodechef,
  'Coding Ninjas': SiCodingninjas,
}

const Hero = ({ profile }) => {
  // Build social links from profile data
  const socialLinks = []
  if (profile?.socials?.github) socialLinks.push({ icon: FaGithub, href: profile.socials.github, label: 'GitHub' })
  if (profile?.socials?.linkedin) socialLinks.push({ icon: FaLinkedin, href: profile.socials.linkedin, label: 'LinkedIn' })
  if (profile?.socials?.twitter) socialLinks.push({ icon: FaTwitter, href: profile.socials.twitter, label: 'Twitter' })
  if (profile?.socials?.instagram) socialLinks.push({ icon: FaInstagram, href: profile.socials.instagram, label: 'Instagram' })
  
  // Add coding profile links
  profile?.codingProfiles?.slice(0, 3).forEach(cp => {
    const Icon = platformIcons[cp.platform]
    if (Icon) socialLinks.push({ icon: Icon, href: cp.link, label: cp.platform })
  })

  // Build typing sequence
  const typingSequence = []
  const texts = profile?.typingTexts?.length > 0 
    ? profile.typingTexts 
    : ['Full Stack Developer', 'Problem Solver', 'B.Tech @ IIEST Shibpur']
  texts.forEach(text => {
    typingSequence.push(text, 2000)
  })

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute top-1/4 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/30 rounded-full blur-[128px] animate-pulse -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/30 rounded-full blur-[128px] animate-pulse translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="px-4 py-2 rounded-full glass text-sm text-gray-300">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 px-2"
          >
            Hi, I'm{' '}
            <span className="gradient-text">{profile?.name || 'Tejas Pawar'}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-3xl text-gray-400 mb-6 h-8 sm:h-12"
          >
            <TypeAnimation
              sequence={typingSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto mb-8 text-sm sm:text-base md:text-lg px-2"
          >
            {profile?.bio || 'Passionate about building scalable web applications and solving complex problems'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <motion.a
              href="#projects"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full glass text-white font-semibold hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center flex-wrap gap-3 sm:gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  title={social.label}
                >
                  <social.icon className="text-lg sm:text-xl" />
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>


      </div>
    </section>
  )
}

export default Hero
