
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ThreeScene from "./three/ThreeScene";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div id="canvas-container" className="absolute top-0 left-0 w-full h-screen">
        {isMounted && <ThreeScene />}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a192f]/30 to-[#0a192f] pointer-events-none" />
      
      <motion.div 
        className="container mx-auto px-6 z-10 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl">
          <motion.p 
            className="text-[#64ffda] font-mono mb-4 relative pl-6"
            variants={itemVariants}
          >
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-[#64ffda]" />
            Hi, my name is
          </motion.p>
          
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold font-poppins mb-4 text-[#e6f1ff] glitch-text"
            variants={itemVariants}
          >
            <span className="relative inline-block">
              Osama Hashmi
              <span className="absolute -inset-0.5 animate-glitch-1" aria-hidden="true">
                Osama Hashmi
              </span>
              <span className="absolute -inset-0.5 animate-glitch-2" aria-hidden="true">
                Osama Hashmi
              </span>
            </span>
          </motion.h1>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-semibold font-poppins mb-6 text-[#e6f1ff]/70 gradient-text"
            variants={itemVariants}
          >
            I build things for the web.
          </motion.h2>
          
          <motion.p 
            className="text-[#e6f1ff]/70 text-lg mb-8 max-w-xl typing-text"
            variants={itemVariants}
          >
            I'm a Full Stack Developer specializing in building exceptional digital experiences. Currently, I'm focused on creating accessible, responsive web applications with modern technologies.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <motion.a 
              href="#projects" 
              className="px-6 py-3 border-2 border-[#64ffda] text-[#64ffda] font-medium rounded-md relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-[#64ffda] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative z-10 group-hover:text-[#0a192f] transition-colors duration-300">
                View My Work
              </span>
            </motion.a>
            <motion.a 
              href="#contact" 
              className="px-6 py-3 bg-[#64ffda] text-[#0a192f] font-medium rounded-md relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-[#0a192f] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative z-10 group-hover:text-[#64ffda] transition-colors duration-300">
                Contact Me
              </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: [0, 1, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <a 
          href="#about" 
          className="text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300"
          aria-label="Scroll to About section"
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </motion.div>
    </section>
  );
}
