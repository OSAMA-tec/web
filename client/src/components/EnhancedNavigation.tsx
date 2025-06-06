import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code, Briefcase, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeSelector from './ThemeSelector';
import EnhancedButton from './EnhancedButton';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: <Home size={18} />, href: '#home' },
  { id: 'about', label: 'About', icon: <User size={18} />, href: '#about' },
  { id: 'skills', label: 'Skills', icon: <Code size={18} />, href: '#skills' },
  { id: 'projects', label: 'Projects', icon: <Briefcase size={18} />, href: '#projects' },
  { id: 'contact', label: 'Contact', icon: <Mail size={18} />, href: '#contact' },
];

const socialLinks = [
  { icon: <Github size={20} />, href: 'https://github.com/OSAMA-tec', label: 'GitHub' },
  { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/osama-hashmi', label: 'LinkedIn' },
  { icon: <Twitter size={20} />, href: 'https://twitter.com/osama_hashmi', label: 'Twitter' },
];

export default function EnhancedNavigation() {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md' : ''
        }`}
        style={{
          background: scrolled 
            ? `${colors.card}95` 
            : 'transparent',
          borderBottom: scrolled 
            ? `1px solid ${colors.border}` 
            : 'none',
        }}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg"
                style={{ 
                  background: colors.gradient,
                  color: colors.primary 
                }}
              >
                O
              </div>
              <span 
                className="font-bold text-xl hidden sm:block"
                style={{ color: colors.foreground }}
              >
                Osama.dev
              </span>
            </motion.div>

            {/* Desktop Menu */}
            {!isMobile && (
              <div className="flex items-center space-x-8">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href, item.id);
                    }}
                    className={`relative flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 ${
                      activeSection === item.id ? 'font-medium' : ''
                    }`}
                    style={{
                      color: activeSection === item.id ? colors.secondary : colors.foreground,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    
                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: colors.secondary }}
                        layoutId="activeIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            )}

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {!isMobile && (
                <div className="flex items-center space-x-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full transition-colors duration-300"
                      style={{ 
                        color: colors.foreground,
                        backgroundColor: 'transparent'
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: `${colors.secondary}20`
                      }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              )}

              <ThemeSelector />

              {/* Mobile menu button */}
              {isMobile && (
                <EnhancedButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  icon={isOpen ? <X size={20} /> : <Menu size={20} />}
                  className="p-2"
                />
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ backgroundColor: `${colors.primary}80` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[90vw] z-50 overflow-y-auto"
              style={{
                background: colors.card,
                borderLeft: `1px solid ${colors.border}`
              }}
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg"
                      style={{ 
                        background: colors.gradient,
                        color: colors.primary 
                      }}
                    >
                      O
                    </div>
                    <span 
                      className="font-bold text-xl"
                      style={{ color: colors.foreground }}
                    >
                      Menu
                    </span>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="space-y-4 mb-8">
                  {navigationItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href, item.id);
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                        activeSection === item.id ? 'font-medium' : ''
                      }`}
                      style={{
                        color: activeSection === item.id ? colors.secondary : colors.foreground,
                        backgroundColor: activeSection === item.id ? `${colors.secondary}10` : 'transparent'
                      }}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: `${colors.secondary}10`
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.icon}
                      <span className="text-lg">{item.label}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="border-t pt-6" style={{ borderColor: colors.border }}>
                  <h3 
                    className="text-sm font-medium mb-4"
                    style={{ color: colors.foreground }}
                  >
                    Connect with me
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full transition-colors duration-300"
                        style={{ 
                          color: colors.foreground,
                          backgroundColor: `${colors.secondary}10`
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: `${colors.secondary}20`
                        }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
