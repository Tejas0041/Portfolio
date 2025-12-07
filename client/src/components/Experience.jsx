import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi'

const defaultExperience = [
  {
    type: 'work',
    title: 'Software Development Engineer',
    company: 'Accenture',
    location: 'India',
    period: 'Joining Soon',
    description: 'Selected through campus placement.',
    current: true,
  },
]

const defaultEducation = [
  {
    type: 'education',
    title: 'B.Tech in Computer Science & Technology',
    institution: 'IIEST Shibpur',
    location: 'West Bengal, India',
    period: '2021 - 2025',
    description: 'Currently in 4th year.',
    current: true,
  },
]

const TimelineItem = ({ item, index, isLeft }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const isWork = item.type === 'work' || item.company

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex items-start md:items-center gap-4 md:gap-8 ${isLeft ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Mobile icon */}
      <div className="md:hidden flex-shrink-0 relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isWork 
              ? 'bg-gradient-to-r from-primary to-secondary' 
              : 'bg-gradient-to-r from-secondary to-accent'
          }`}
        >
          {isWork ? (
            <HiBriefcase className="text-white text-lg" />
          ) : (
            <HiAcademicCap className="text-white text-lg" />
          )}
        </motion.div>
      </div>

      <div className={`flex-1 ${isLeft ? 'md:text-right' : ''}`}>
        <div className="glass rounded-2xl p-4 sm:p-6 hover:bg-primary/5 transition-colors duration-300">
          <div className={`flex flex-wrap items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {item.current && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                Current
              </span>
            )}
            <span className="text-sm text-primary">{item.period}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{item.title}</h3>
          <p className="text-secondary text-sm sm:text-base mb-2">{item.company || item.institution}</p>
          <p className="text-xs sm:text-sm text-gray-500 mb-3">{item.location}</p>
          {item.description && (
            <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
          )}
        </div>
      </div>

      {/* Desktop icon */}
      <div className="hidden md:flex flex-col items-center relative" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isWork 
              ? 'bg-gradient-to-r from-primary to-secondary' 
              : 'bg-gradient-to-r from-secondary to-accent'
          }`}
        >
          {isWork ? (
            <HiBriefcase className="text-white text-xl" />
          ) : (
            <HiAcademicCap className="text-white text-xl" />
          )}
        </motion.div>
      </div>

      <div className="hidden md:block flex-1" />
    </motion.div>
  )
}

const Experience = ({ profile }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Get experience and education from profile or use defaults
  const experiences = profile?.experience?.length > 0 
    ? profile.experience.map(e => ({ ...e, type: 'work' }))
    : defaultExperience

  const education = profile?.education?.length > 0
    ? profile.education.map(e => ({ ...e, type: 'education' }))
    : defaultEducation

  const allItems = [...experiences, ...education]

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/10 rounded-full blur-[128px]" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="relative isolate">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2" style={{ zIndex: 0 }} />

          <div className="space-y-6 sm:space-y-12 relative" style={{ zIndex: 1 }}>
            {allItems.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
