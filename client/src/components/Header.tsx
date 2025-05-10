import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to add shadow to header when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        !target.closest("#mobile-menu") &&
        !target.closest("#mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  // Handle menu item click
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full bg-[#0a192f]/80 backdrop-blur-md z-50 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold font-poppins text-[#64ffda]">
            OH<span className="text-[#8b5cf6]">.</span>
          </a>
          
          <div className="hidden md:block">
            <nav className="flex space-x-8">
              <a href="#home" className="nav-link text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300">
                Home
              </a>
              <a href="#about" className="nav-link text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300">
                About
              </a>
              <a href="#skills" className="nav-link text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300">
                Skills
              </a>
              <a href="#projects" className="nav-link text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300">
                Projects
              </a>
              <a href="#contact" className="nav-link text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300">
                Contact
              </a>
            </nav>
          </div>
          
          <button 
            id="mobile-menu-button" 
            className="md:hidden text-[#e6f1ff] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        id="mobile-menu" 
        className={`md:hidden bg-[#1E1E2A] p-4 absolute w-full transform transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col space-y-4">
          <a 
            href="#home" 
            className="text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300"
            onClick={handleMenuItemClick}
          >
            Home
          </a>
          <a 
            href="#about" 
            className="text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300"
            onClick={handleMenuItemClick}
          >
            About
          </a>
          <a 
            href="#skills" 
            className="text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300"
            onClick={handleMenuItemClick}
          >
            Skills
          </a>
          <a 
            href="#projects" 
            className="text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300"
            onClick={handleMenuItemClick}
          >
            Projects
          </a>
          <a 
            href="#contact" 
            className="text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300"
            onClick={handleMenuItemClick}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
