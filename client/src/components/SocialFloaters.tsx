import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export default function SocialFloaters() {
  const { theme, getThemeColors } = useTheme();
  const colors = getThemeColors(theme);

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
            href="https://github.com/OSAMA-tec"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:-translate-y-2 duration-300"
            style={{ color: `${colors.foreground}60` }}
            whileHover={{ y: -5, color: colors.secondary }}
            aria-label="GitHub"
          >
            <Github size={20} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/osamahash"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:-translate-y-2 duration-300"
            style={{ color: `${colors.foreground}60` }}
            whileHover={{ y: -5, color: colors.secondary }}
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </motion.a>

          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:-translate-y-2 duration-300"
            style={{ color: `${colors.foreground}60` }}
            whileHover={{ y: -5, color: colors.secondary }}
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </motion.a>

          <motion.a
            href="mailto:hashmiosama555@gmail.com"
            className="transition-colors hover:-translate-y-2 duration-300"
            style={{ color: `${colors.foreground}60` }}
            whileHover={{ y: -5, color: colors.secondary }}
            aria-label="Email"
          >
            <Mail size={20} />
          </motion.a>
        </div>

        <div className="h-24 w-0.5 mt-5" style={{ backgroundColor: `${colors.foreground}30` }}></div>
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
          className="transition-colors vertical-text tracking-widest text-xs font-mono"
          style={{
            writingMode: 'vertical-rl',
            color: `${colors.foreground}60`
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.secondary}
          onMouseLeave={(e) => e.currentTarget.style.color = `${colors.foreground}60`}
        >
          hashmiosama555@gmail.com
        </a>

        <div className="h-24 w-0.5 mt-5" style={{ backgroundColor: `${colors.foreground}30` }}></div>
      </motion.div>
    </>
  );
}