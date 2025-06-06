import React, { useEffect, useRef, useState } from 'react';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface PerformanceConfig {
  targetFPS: number;
  particleCount: number;
  animationQuality: 'low' | 'medium' | 'high';
  enableGPUAcceleration: boolean;
  enableAdvancedEffects: boolean;
}

export default function PerformanceOptimizer() {
  const { isMobile, isLowPowerMode, devicePixelRatio } = useAdvancedMobile();
  const [fps, setFps] = useState(60);
  const [config, setConfig] = useState<PerformanceConfig>({
    targetFPS: 60,
    particleCount: 50,
    animationQuality: 'high',
    enableGPUAcceleration: true,
    enableAdvancedEffects: true,
  });
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsHistoryRef = useRef<number[]>([]);

  // Performance monitoring
  useEffect(() => {
    let animationId: number;
    
    const measureFPS = () => {
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      
      if (delta >= 1000) {
        const currentFPS = Math.round((frameCountRef.current * 1000) / delta);
        setFps(currentFPS);
        
        // Keep FPS history for adaptive optimization
        fpsHistoryRef.current.push(currentFPS);
        if (fpsHistoryRef.current.length > 10) {
          fpsHistoryRef.current.shift();
        }
        
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        
        // Adaptive performance adjustment
        adaptPerformance(currentFPS);
      }
      
      frameCountRef.current++;
      animationId = requestAnimationFrame(measureFPS);
    };
    
    measureFPS();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Adaptive performance optimization
  const adaptPerformance = (currentFPS: number) => {
    const avgFPS = fpsHistoryRef.current.reduce((a, b) => a + b, 0) / fpsHistoryRef.current.length;
    
    setConfig(prev => {
      let newConfig = { ...prev };
      
      // Aggressive optimization for low FPS
      if (avgFPS < 30) {
        newConfig = {
          targetFPS: 30,
          particleCount: isMobile ? 10 : 20,
          animationQuality: 'low',
          enableGPUAcceleration: true,
          enableAdvancedEffects: false,
        };
      }
      // Moderate optimization for medium FPS
      else if (avgFPS < 45) {
        newConfig = {
          targetFPS: 45,
          particleCount: isMobile ? 20 : 35,
          animationQuality: 'medium',
          enableGPUAcceleration: true,
          enableAdvancedEffects: false,
        };
      }
      // High performance mode
      else if (avgFPS >= 55) {
        newConfig = {
          targetFPS: 60,
          particleCount: isMobile ? 30 : 60,
          animationQuality: 'high',
          enableGPUAcceleration: true,
          enableAdvancedEffects: !isMobile,
        };
      }
      
      return newConfig;
    });
  };

  // Apply performance optimizations to DOM
  useEffect(() => {
    const root = document.documentElement;
    
    // Set CSS custom properties for performance
    root.style.setProperty('--performance-particle-count', config.particleCount.toString());
    root.style.setProperty('--performance-animation-quality', config.animationQuality);
    root.style.setProperty('--performance-target-fps', config.targetFPS.toString());
    
    // Apply performance classes
    if (config.animationQuality === 'low') {
      root.classList.add('performance-low');
      root.classList.remove('performance-medium', 'performance-high');
    } else if (config.animationQuality === 'medium') {
      root.classList.add('performance-medium');
      root.classList.remove('performance-low', 'performance-high');
    } else {
      root.classList.add('performance-high');
      root.classList.remove('performance-low', 'performance-medium');
    }
    
    // GPU acceleration
    if (config.enableGPUAcceleration) {
      root.classList.add('gpu-accelerated');
    } else {
      root.classList.remove('gpu-accelerated');
    }
    
    // Advanced effects
    if (config.enableAdvancedEffects) {
      root.classList.add('advanced-effects');
    } else {
      root.classList.remove('advanced-effects');
    }
    
  }, [config]);

  // Initial device-based optimization
  useEffect(() => {
    let initialConfig: PerformanceConfig;
    
    if (isLowPowerMode) {
      initialConfig = {
        targetFPS: 30,
        particleCount: 15,
        animationQuality: 'low',
        enableGPUAcceleration: true,
        enableAdvancedEffects: false,
      };
    } else if (isMobile) {
      initialConfig = {
        targetFPS: 45,
        particleCount: 25,
        animationQuality: 'medium',
        enableGPUAcceleration: true,
        enableAdvancedEffects: false,
      };
    } else {
      initialConfig = {
        targetFPS: 60,
        particleCount: devicePixelRatio > 1 ? 40 : 60,
        animationQuality: 'high',
        enableGPUAcceleration: true,
        enableAdvancedEffects: true,
      };
    }
    
    setConfig(initialConfig);
  }, [isMobile, isLowPowerMode, devicePixelRatio]);

  // Memory cleanup
  useEffect(() => {
    const cleanup = () => {
      // Force garbage collection if available
      if ('gc' in window && typeof (window as any).gc === 'function') {
        (window as any).gc();
      }
      
      // Clear unused images
      const images = document.querySelectorAll('img[data-loaded="true"]');
      images.forEach(img => {
        if (!img.getBoundingClientRect().width) {
          (img as HTMLImageElement).src = '';
        }
      });
    };
    
    const interval = setInterval(cleanup, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Preload critical resources
  useEffect(() => {
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontFaces = [
        new FontFace('Poppins', 'url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2)'),
        new FontFace('Fira Code', 'url(https://fonts.gstatic.com/s/firacode/v21/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7MOzlojwUKaJO.woff2)'),
      ];
      
      fontFaces.forEach(font => {
        font.load().then(() => {
          document.fonts.add(font);
        }).catch(() => {
          // Fallback to system fonts
        });
      });
    };
    
    preloadCriticalResources();
  }, []);

  return null; // This component only manages performance, no UI
}

// Export performance utilities
export const usePerformanceConfig = () => {
  const [config, setConfig] = useState<PerformanceConfig>({
    targetFPS: 60,
    particleCount: 50,
    animationQuality: 'high',
    enableGPUAcceleration: true,
    enableAdvancedEffects: true,
  });
  
  return { config, setConfig };
};

export const optimizeForDevice = (isMobile: boolean, isLowPowerMode: boolean): PerformanceConfig => {
  if (isLowPowerMode) {
    return {
      targetFPS: 30,
      particleCount: 15,
      animationQuality: 'low',
      enableGPUAcceleration: true,
      enableAdvancedEffects: false,
    };
  }
  
  if (isMobile) {
    return {
      targetFPS: 45,
      particleCount: 25,
      animationQuality: 'medium',
      enableGPUAcceleration: true,
      enableAdvancedEffects: false,
    };
  }
  
  return {
    targetFPS: 60,
    particleCount: 60,
    animationQuality: 'high',
    enableGPUAcceleration: true,
    enableAdvancedEffects: true,
  };
};
