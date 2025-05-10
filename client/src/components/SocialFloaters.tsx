import { Github, Linkedin, Twitter, Mail, Code } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SocialFloaters() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  
  // Show social floaters after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle scroll events to show/hide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Only show social floaters when near the top of the page
      const shouldBeVisible = window.scrollY < 2000;
      setIsVisible(shouldBeVisible);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Render nothing if not visible
  if (!isVisible) return null;
  
  const socialLinks = [
    { 
      icon: <Github className="w-5 h-5" />, 
      url: 'https://github.com',
      label: 'GitHub',
      color: '#e6f1ff'
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      url: 'https://linkedin.com',
      label: 'LinkedIn',
      color: '#0077b5'
    },
    { 
      icon: <Twitter className="w-5 h-5" />, 
      url: 'https://twitter.com',
      label: 'Twitter',
      color: '#1da1f2'
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      url: 'mailto:contact@osamahashmi.dev',
      label: 'Email',
      color: '#64ffda'
    },
    { 
      icon: <Code className="w-5 h-5" />, 
      url: '#projects',
      label: 'Projects',
      color: '#8b5cf6'
    }
  ];
  
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-30">
      {socialLinks.map((link, index) => (
        <div 
          key={index}
          className="relative"
          onMouseEnter={() => setActiveTooltip(index)}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <a 
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : undefined}
            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`
              w-10 h-10 flex items-center justify-center rounded-full 
              bg-[#1E1E2A] hover:bg-[#64ffda]/20 text-[#e6f1ff]
              transition-all duration-300 transform 
              ${activeTooltip === index ? 'scale-110' : ''}
            `}
            aria-label={link.label}
            style={{
              boxShadow: activeTooltip === index ? `0 0 15px ${link.color}40` : 'none'
            }}
          >
            {link.icon}
          </a>
          
          {/* Tooltip */}
          <div 
            className={`
              absolute top-1/2 right-12 transform -translate-y-1/2
              bg-[#1E1E2A] text-[#e6f1ff] text-sm px-3 py-1 rounded
              whitespace-nowrap pointer-events-none
              transition-all duration-300
              ${activeTooltip === index 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-2'
              }
            `}
          >
            {link.label}
            {/* Tooltip arrow */}
            <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-8 border-transparent border-l-[#1E1E2A]"></div>
          </div>
        </div>
      ))}
      
      {/* Vertical line */}
      <div className="h-32 w-px bg-[#e6f1ff]/30 mx-auto"></div>
    </div>
  );
}