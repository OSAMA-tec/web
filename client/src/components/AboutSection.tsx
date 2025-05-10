import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[#0a192f] to-[#121212]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 reveal once">
          <h2 className="text-3xl font-bold font-poppins mb-2">
            <span className="text-[#64ffda]">01.</span> About Me
          </h2>
          <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
        </div>
        
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="lg:w-1/2 reveal once" variants={childVariants}>
            <div className="stagger-children once">
              <p className="mb-4 text-[#e6f1ff]/80">
                Hello! I'm Osama, a passionate Full Stack Developer with a love for creating interactive and efficient web applications.
              </p>
              <p className="mb-4 text-[#e6f1ff]/80">
                My journey in web development started back in 2015, and since then I've worked with a range of technologies and frameworks to deliver solutions that solve real-world problems.
              </p>
              <p className="mb-4 text-[#e6f1ff]/80">
                I specialize in JavaScript-based technologies including React, Node.js, and Express, with experience in both SQL and NoSQL databases. I'm also proficient in 3D web technologies like Three.js, allowing me to create immersive web experiences.
              </p>
              <p className="mb-4 text-[#e6f1ff]/80">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical blogs and mentoring.
              </p>
            </div>
            
            <div className="mt-8 blur-in once">
              <h3 className="text-xl font-semibold font-poppins mb-4 text-[#64ffda]">My Development Philosophy</h3>
              <ul className="space-y-2 text-[#e6f1ff]/80 stagger-children once">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#8b5cf6] mr-2 mt-1 flex-shrink-0" />
                  <span>Clean, maintainable code over quick fixes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#8b5cf6] mr-2 mt-1 flex-shrink-0" />
                  <span>Performance and accessibility as core priorities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#8b5cf6] mr-2 mt-1 flex-shrink-0" />
                  <span>User-centered design and development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#8b5cf6] mr-2 mt-1 flex-shrink-0" />
                  <span>Continuous learning and adaptation</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div className="lg:w-1/2 flex justify-center zoom-in-scroll once" variants={childVariants}>
            <div className="relative max-w-md glow-on-hover">
              <img 
                src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700&q=80" 
                alt="Osama Hashmi - Full Stack Developer" 
                className="rounded-lg shadow-xl relative z-10 object-cover h-[500px]"
              />
              <div className="absolute -bottom-4 -right-4 border-2 border-[#64ffda] rounded-lg w-full h-full"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
