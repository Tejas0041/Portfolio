import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiAcademicCap, HiLocationMarker, HiBriefcase, HiCode } from 'react-icons/hi'

const About = ({ profile }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const highlights = [
    {
      icon: HiAcademicCap,
      title: 'Education',
      description: profile?.education?.[0]?.title || 'B.Tech in CST from IIEST Shibpur',
    },
    {
      icon: HiLocationMarker,
      title: 'Hometown',
      description: profile?.location || 'Burhanpur, Madhya Pradesh',
    },
    {
      icon: HiBriefcase,
      title: 'Placement',
      description: profile?.experience?.[0]?.company ? `Upcoming AEH at ${profile.experience[0].company}` : 'Upcoming AEH at Accenture',
    },
    {
      icon: HiCode,
      title: 'Passion',
      description: 'Full Stack Development & DSA',
    },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto isolate">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-2 rounded-full bg-dark-300 flex items-center justify-center overflow-hidden z-0">
                {profile?.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt={profile.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-8xl">👨‍💻</span>
                  </div>
                )}
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-200 text-center lg:text-left">
              A passionate developer from India
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base text-center lg:text-left">
              {profile?.aboutText || `Hey there! I'm ${profile?.name || 'Tejas Pawar'}, a final year B.Tech student at IIEST Shibpur, 
              specializing in Computer Science and Technology. Originally from the historic 
              city of Burhanpur in Madhya Pradesh, I've always been fascinated by technology 
              and its potential to solve real-world problems.`}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="glass rounded-xl p-3 sm:p-4 hover:bg-primary/10 transition-colors duration-300"
                >
                  <item.icon className="text-xl sm:text-2xl text-primary mb-2" />
                  <h4 className="font-semibold text-white text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
