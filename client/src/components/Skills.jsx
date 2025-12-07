import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import * as SiIcons from 'react-icons/si'

// Default skills if none from API
const defaultSkills = {
  frontend: [
    { name: 'React', icon: 'SiReact', color: '#61DAFB' },
    { name: 'Next.js', icon: 'SiNextdotjs', color: '#ffffff' },
    { name: 'TypeScript', icon: 'SiTypescript', color: '#3178C6' },
    { name: 'Tailwind', icon: 'SiTailwindcss', color: '#06B6D4' },
  ],
  backend: [
    { name: 'Node.js', icon: 'SiNodedotjs', color: '#339933' },
    { name: 'Express', icon: 'SiExpress', color: '#ffffff' },
    { name: 'MongoDB', icon: 'SiMongodb', color: '#47A248' },
  ],
  languages: [
    { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E' },
    { name: 'Python', icon: 'SiPython', color: '#3776AB' },
    { name: 'C++', icon: 'SiCplusplus', color: '#00599C' },
  ],
  tools: [
    { name: 'Git', icon: 'SiGit', color: '#F05032' },
    { name: 'Docker', icon: 'SiDocker', color: '#2496ED' },
  ],
}

const categoryTitles = {
  frontend: 'Frontend',
  backend: 'Backend',
  languages: 'Languages',
  tools: 'Tools & Others',
}

const Skills = ({ skills }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Use API skills or defaults
  const skillData = skills && Object.values(skills).some(arr => arr.length > 0) ? skills : defaultSkills

  // Get all skills for marquee
  const allSkills = Object.values(skillData).flat()

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/10 rounded-full blur-[128px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skillData).map(([category, categorySkills], categoryIndex) => (
            categorySkills.length > 0 && (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {categoryTitles[category] || category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill, skillIndex) => {
                    const IconComponent = SiIcons[skill.icon]
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-200 hover:bg-dark-100 transition-colors duration-300 group"
                      >
                        {IconComponent && (
                          <IconComponent 
                            className="text-lg transition-colors duration-300" 
                            style={{ color: skill.color }}
                          />
                        )}
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          ))}
        </div>

        {allSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 overflow-hidden"
          >
            <div className="flex animate-marquee space-x-8">
              {[...allSkills, ...allSkills].map((skill, index) => {
                const IconComponent = SiIcons[skill.icon]
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-6 py-3 rounded-full glass whitespace-nowrap"
                  >
                    {IconComponent && <IconComponent style={{ color: skill.color }} />}
                    <span className="text-gray-400">{skill.name}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Skills
