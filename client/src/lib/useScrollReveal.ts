import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    const scrollHandler = () => {
      const revealElements = document.querySelectorAll('.reveal, .zoom-in-scroll, .blur-in, .stagger-children, .text-reveal');
      
      revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // Adjust this value to change when the element becomes visible
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        } else {
          // Only remove the active class if it's not a one-time animation
          if (!element.classList.contains('once')) {
            element.classList.remove('active');
          }
        }
      });
    };
    
    // Run once on load
    scrollHandler();
    
    // Add event listener
    window.addEventListener('scroll', scrollHandler);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
}