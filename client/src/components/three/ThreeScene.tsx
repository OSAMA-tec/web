import { useRef, useState, useEffect } from 'react';

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Track scroll position for responsive animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced canvas animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particleCount = isMobile ? 100 : 300;
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      growing: boolean;
    }
    
    const particles: Particle[] = [];
    const colors = ['#64ffda', '#8b5cf6', '#0a192f', '#e6f1ff'];
    
    for (let i = 0; i < particleCount; i++) {
      const baseSize = Math.random() * 4 + 1;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: baseSize,
        baseSize: baseSize,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        growing: Math.random() > 0.5
      });
    }
    
    // Mouse tracking for interactive effects
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;
    
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      
      // Reset mouse movement flag after 2 seconds of inactivity
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 2000);
    });
    
    // Animation loop
    let animationId: number;
    let lastTime = 0;
    
    const animate = (currentTime: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = (currentTime - lastTime) / 16.67; // 60fps base
      lastTime = currentTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(10, 25, 47, 0.5)');
      gradient.addColorStop(1, 'rgba(10, 25, 47, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add a subtle scroll parallax effect
      const scrollOffset = scrollY * 0.2;
      
      // Draw and update particles
      particles.forEach((particle, index) => {
        // Apply mouse interaction if mouse is moving
        if (isMouseMoving) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Repel particles from mouse
            const angle = Math.atan2(dy, dx);
            const force = (150 - distance) / 150;
            particle.speedX -= Math.cos(angle) * force * 0.2 * deltaTime;
            particle.speedY -= Math.sin(angle) * force * 0.2 * deltaTime;
          }
        }
        
        // Adjust particle size based on scroll position
        // Make sure we don't get negative sizes with scroll
        const scrollFactor = Math.max(-0.8, scrollY / 2000); // Normalize and limit negative values
        
        // Calculate final particle size, ensure it's always positive
        const finalSize = Math.max(0.1, particle.size * (1 + scrollFactor));
        
        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Create a glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        
        ctx.beginPath();
        ctx.arc(
          particle.x, 
          particle.y + (scrollOffset * (index % 5) * 0.1), // Parallax based on particle index
          finalSize, // Use our safe size value
          0, 
          Math.PI * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        ctx.restore();
        
        // Update particle size for "breathing" effect
        if (particle.growing) {
          particle.size += 0.03 * deltaTime;
          if (particle.size > particle.baseSize + 1) {
            particle.growing = false;
          }
        } else {
          particle.size -= 0.03 * deltaTime;
          if (particle.size < particle.baseSize - 0.5) {
            particle.growing = true;
          }
        }
        
        // Update position with smooth movement
        particle.x += particle.speedX * deltaTime;
        particle.y += particle.speedY * deltaTime;
        
        // Add some subtle randomness to the movement
        particle.speedX += (Math.random() - 0.5) * 0.01 * deltaTime;
        particle.speedY += (Math.random() - 0.5) * 0.01 * deltaTime;
        
        // Limit max speed
        const maxSpeed = 0.8;
        const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
        if (currentSpeed > maxSpeed) {
          particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
          particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
        }
        
        // Wrap around canvas with some margin
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
      });
      
      // Draw connecting lines between nearby particles
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < particles.length; i += 3) { // Skip some for performance
        for (let j = i + 1; j < particles.length; j += 3) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            // Make connections more visible based on mouse proximity
            let lineOpacity = 0.05 + (120 - distance) / 120 * 0.2;
            
            // Create gradient lines
            const gradient = ctx.createLinearGradient(
              particles[i].x, 
              particles[i].y, 
              particles[j].x, 
              particles[j].y
            );
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.min(1.5, (120 - distance) / 60);
            ctx.globalAlpha = lineOpacity;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', () => {});
      clearTimeout(mouseTimeout);
    };
  }, [isMobile, scrollY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ background: 'transparent', zIndex: -10 }}
    />
  );
}
