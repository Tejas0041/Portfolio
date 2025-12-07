import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa'
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces } from 'react-icons/si'

const Footer = ({ profile }) => {
  const currentYear = new Date().getFullYear()

  const socialLinks = []
  if (profile?.socials?.github) socialLinks.push({ icon: FaGithub, href: profile.socials.github })
  if (profile?.socials?.linkedin) socialLinks.push({ icon: FaLinkedin, href: profile.socials.linkedin })
  if (profile?.socials?.twitter) socialLinks.push({ icon: FaTwitter, href: profile.socials.twitter })
  
  // Add coding profiles
  profile?.codingProfiles?.slice(0, 3).forEach(cp => {
    if (cp.platform === 'LeetCode') socialLinks.push({ icon: SiLeetcode, href: cp.link })
    if (cp.platform === 'GeeksforGeeks') socialLinks.push({ icon: SiGeeksforgeeks, href: cp.link })
    if (cp.platform === 'Codeforces') socialLinks.push({ icon: SiCodeforces, href: cp.link })
  })

  return (
    <footer className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">
          <motion.a
            href="#home"
            className="text-3xl font-bold gradient-text mb-6"
            whileHover={{ scale: 1.05 }}
          >
            &lt;{profile?.name?.split(' ')[0] || 'Tejas'} /&gt;
          </motion.a>

          {socialLinks.length > 0 && (
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

          <p className="text-gray-500 text-sm text-center">
            © {currentYear} {profile?.name || 'Tejas Pawar'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
