import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces, SiCodechef, SiCodingninjas, SiHackerrank } from 'react-icons/si'

const platformConfig = {
  LeetCode: { icon: SiLeetcode, color: '#FFA116', bgColor: 'rgba(255, 161, 22, 0.1)' },
  GeeksforGeeks: { icon: SiGeeksforgeeks, color: '#2F8D46', bgColor: 'rgba(47, 141, 70, 0.1)' },
  Codeforces: { icon: SiCodeforces, color: '#1F8ACB', bgColor: 'rgba(31, 138, 203, 0.1)' },
  CodeChef: { icon: SiCodechef, color: '#5B4638', bgColor: 'rgba(91, 70, 56, 0.1)' },
  'Coding Ninjas': { icon: SiCodingninjas, color: '#F96D00', bgColor: 'rgba(249, 109, 0, 0.1)' },
  HackerRank: { icon: SiHackerrank, color: '#00EA64', bgColor: 'rgba(0, 234, 100, 0.1)' },
}

const defaultProfiles = [
  {
    platform: 'LeetCode',
    username: 'username',
    link: '#',
    stats: { stat1Label: 'Problems', stat1Value: '500+', stat2Label: 'Rating', stat2Value: '1800+', stat3Label: 'Contests', stat3Value: '50+' },
  },
]

const CodingProfiles = ({ profile }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const profiles = profile?.codingProfiles?.length > 0 ? profile.codingProfiles : defaultProfiles

  // Calculate totals
  const totalProblems = profiles.reduce((acc, p) => {
    const val = p.stats?.stat1Value || ''
    const num = parseInt(val.replace(/\D/g, '')) || 0
    return acc + num
  }, 0)

  return (
    <section id="profiles" className="py-20 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-[128px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Coding <span className="gradient-text">Profiles</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My competitive programming journey across various platforms
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {profiles.map((cp, index) => {
            const config = platformConfig[cp.platform] || { icon: SiLeetcode, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' }
            const Icon = config.icon

            return (
              <motion.a
                key={index}
                href={cp.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-2xl p-6 group cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: config.bgColor }}
                  >
                    <Icon className="text-3xl" style={{ color: config.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{cp.platform}</h3>
                    <p className="text-sm text-gray-500">@{cp.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {cp.stats?.stat1Label && (
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: config.color }}>
                        {cp.stats.stat1Value}
                      </p>
                      <p className="text-xs text-gray-500">{cp.stats.stat1Label}</p>
                    </div>
                  )}
                  {cp.stats?.stat2Label && (
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: config.color }}>
                        {cp.stats.stat2Value}
                      </p>
                      <p className="text-xs text-gray-500">{cp.stats.stat2Label}</p>
                    </div>
                  )}
                  {cp.stats?.stat3Label && (
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: config.color }}>
                        {cp.stats.stat3Value}
                      </p>
                      <p className="text-xs text-gray-500">{cp.stats.stat3Label}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-center" style={{ color: config.color }}>
                    View Profile →
                  </p>
                </div>
              </motion.a>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 sm:mt-16 glass rounded-2xl p-4 sm:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div>
              <p className="text-2xl sm:text-4xl font-bold gradient-text">{totalProblems || '1000'}+</p>
              <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-base">Problems Solved</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-bold gradient-text">25+</p>
              <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-base">Contests</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-bold gradient-text">{profiles.length}</p>
              <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-base">Platforms</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-bold gradient-text">Top 5%</p>
              <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-base">Global Rank</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CodingProfiles
