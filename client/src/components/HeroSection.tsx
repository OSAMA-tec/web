import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ThreeScene from "./three/ThreeScene";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Set isMounted after component mounts to avoid hydration errors with canvas
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div id="canvas-container" className="absolute top-0 left-0 w-full h-screen overflow-hidden">
        {isMounted && <ThreeScene />}
      </div>
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-3xl">
          <motion.p 
            className="text-[#64ffda] font-mono mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hi, my name is
          </motion.p>
          
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold font-poppins mb-4 text-[#e6f1ff]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Osama Hashmi
          </motion.h1>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-semibold font-poppins mb-6 text-[#e6f1ff]/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            I build things for the web.
          </motion.h2>
          
          <motion.p 
            className="text-[#e6f1ff]/70 text-lg mb-8 max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            I'm a Full Stack Developer specializing in building exceptional digital experiences. Currently, I'm focused on creating accessible, responsive web applications with modern technologies.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <a 
              href="#projects" 
              className="px-6 py-3 border-2 border-[#64ffda] text-[#64ffda] font-medium rounded-md hover:bg-[#64ffda]/10 transition-colors duration-300"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 bg-[#64ffda] text-[#0a192f] font-medium rounded-md hover:bg-opacity-90 transition-colors duration-300"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{
          y: [0, 10, 0],
          opacity: 1,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 1.2
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
