import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function SocialFloaters() {
  return (
    <>
      {/* Left side social icons */}
      <motion.div 
        className="fixed left-8 bottom-0 hidden lg:flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <div className="flex flex-col space-y-5">
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#e6f1ff]/60 hover:text-[#64ffda] transition-colors hover:-translate-y-2 duration-300"
            whileHover={{ y: -5, color: '#64ffda' }}
            aria-label="GitHub"
          >
            <Github size={20} />
          </motion.a>
          
          <motion.a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#e6f1ff]/60 hover:text-[#64ffda] transition-colors hover:-translate-y-2 duration-300"
            whileHover={{ y: -5, color: '#64ffda' }}
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </motion.a>
          
          <motion.a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#e6f1ff]/60 hover:text-[#64ffda] transition-colors hover:-translate-y-2 duration-300"
            whileHover={{ y: -5, color: '#64ffda' }}
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </motion.a>
          
          <motion.a 
            href="mailto:contact@osamahashmi.dev" 
            className="text-[#e6f1ff]/60 hover:text-[#64ffda] transition-colors hover:-translate-y-2 duration-300"
            whileHover={{ y: -5, color: '#64ffda' }}
            aria-label="Email"
          >
            <Mail size={20} />
          </motion.a>
        </div>
        
        <div className="h-24 w-0.5 bg-[#e6f1ff]/30 mt-5"></div>
      </motion.div>
      
      {/* Right side email */}
      <motion.div 
        className="fixed right-8 bottom-0 hidden lg:flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <a 
          href="mailto:contact@osamahashmi.dev"
          className="text-[#e6f1ff]/60 hover:text-[#64ffda] transition-colors vertical-text tracking-widest text-xs font-mono"
          style={{ writingMode: 'vertical-rl' }}
        >
          contact@osamahashmi.dev
        </a>
        
        <div className="h-24 w-0.5 bg-[#e6f1ff]/30 mt-5"></div>
      </motion.div>
    </>
  );
}