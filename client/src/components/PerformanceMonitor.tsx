import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Monitor, Cpu, BarChart3, X } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  renderTime: number;
  animationCount: number;
  themeTransitionTime: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  compact?: boolean;
}

export default function PerformanceMonitor({ 
  enabled = false, 
  position = 'top-right',
  compact = false 
}: PerformanceMonitorProps) {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);
  const [isVisible, setIsVisible] = useState(enabled);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    renderTime: 0,
    animationCount: 0,
    themeTransitionTime: 0,
  });
  const [history, setHistory] = useState<PerformanceMetrics[]>([]);
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number>();
  const performanceObserverRef = useRef<PerformanceObserver>();

  // FPS Calculation
  useEffect(() => {
    if (!isVisible) return;

    const calculateFPS = () => {
      frameCountRef.current++;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTimeRef.current;

      if (deltaTime >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
        
        setMetrics(prev => ({
          ...prev,
          fps,
          renderTime: deltaTime / frameCountRef.current,
        }));

        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(calculateFPS);
    };

    animationFrameRef.current = requestAnimationFrame(calculateFPS);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  // Memory Usage
  useEffect(() => {
    if (!isVisible) return;

    const updateMemory = () => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        const memoryUsage = Math.round(memInfo.usedJSHeapSize / 1048576); // Convert to MB
        
        setMetrics(prev => ({
          ...prev,
          memory: memoryUsage,
        }));
      }
    };

    const interval = setInterval(updateMemory, 1000);
    updateMemory();

    return () => clearInterval(interval);
  }, [isVisible]);

  // Performance Observer for detailed metrics
  useEffect(() => {
    if (!isVisible || !window.PerformanceObserver) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          if (entry.name.includes('theme-transition')) {
            setMetrics(prev => ({
              ...prev,
              themeTransitionTime: entry.duration,
            }));
          }
        }
        
        if (entry.entryType === 'navigation') {
          // Track navigation performance
        }
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });
    performanceObserverRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  // Animation Count Tracking
  useEffect(() => {
    if (!isVisible) return;

    const countAnimations = () => {
      const animatedElements = document.querySelectorAll('[data-framer-motion]');
      setMetrics(prev => ({
        ...prev,
        animationCount: animatedElements.length,
      }));
    };

    const interval = setInterval(countAnimations, 2000);
    countAnimations();

    return () => clearInterval(interval);
  }, [isVisible]);

  // History tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(prev => {
        const newHistory = [...prev, metrics];
        return newHistory.slice(-20); // Keep last 20 entries
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [metrics]);

  // Keyboard shortcut to toggle
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getPerformanceStatus = (fps: number) => {
    if (fps >= 55) return { status: 'excellent', color: '#10b981' };
    if (fps >= 45) return { status: 'good', color: '#f59e0b' };
    if (fps >= 30) return { status: 'fair', color: '#ef4444' };
    return { status: 'poor', color: '#dc2626' };
  };

  const performanceStatus = getPerformanceStatus(metrics.fps);

  if (!isVisible) {
    return (
      <motion.button
        className={`fixed ${getPositionClasses()} z-50 p-2 rounded-full opacity-50 hover:opacity-100 transition-opacity`}
        style={{
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
        }}
        onClick={() => setIsVisible(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Show Performance Monitor (Ctrl+Shift+P)"
      >
        <Activity size={16} style={{ color: colors.secondary }} />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed ${getPositionClasses()} z-50 ${compact ? 'w-64' : 'w-80'}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="rounded-lg shadow-xl border backdrop-blur-md"
          style={{
            backgroundColor: `${colors.card}95`,
            borderColor: colors.border,
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-3 border-b"
            style={{ borderColor: colors.border }}
          >
            <div className="flex items-center space-x-2">
              <Activity size={16} style={{ color: colors.secondary }} />
              <span className="text-sm font-medium" style={{ color: colors.foreground }}>
                Performance
              </span>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: performanceStatus.color }}
              />
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded hover:bg-opacity-20 transition-colors"
              style={{ color: colors.foreground }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Metrics */}
          <div className="p-3 space-y-3">
            {/* FPS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap size={14} style={{ color: colors.secondary }} />
                <span className="text-sm" style={{ color: colors.foreground }}>FPS</span>
              </div>
              <div className="flex items-center space-x-2">
                <span 
                  className="text-sm font-mono"
                  style={{ color: performanceStatus.color }}
                >
                  {metrics.fps}
                </span>
                <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: performanceStatus.color }}
                    animate={{ width: `${Math.min(100, (metrics.fps / 60) * 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Memory */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Monitor size={14} style={{ color: colors.secondary }} />
                <span className="text-sm" style={{ color: colors.foreground }}>Memory</span>
              </div>
              <span 
                className="text-sm font-mono"
                style={{ color: colors.foreground }}
              >
                {metrics.memory} MB
              </span>
            </div>

            {/* Render Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu size={14} style={{ color: colors.secondary }} />
                <span className="text-sm" style={{ color: colors.foreground }}>Render</span>
              </div>
              <span 
                className="text-sm font-mono"
                style={{ color: colors.foreground }}
              >
                {metrics.renderTime.toFixed(1)}ms
              </span>
            </div>

            {/* Animation Count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 size={14} style={{ color: colors.secondary }} />
                <span className="text-sm" style={{ color: colors.foreground }}>Animations</span>
              </div>
              <span 
                className="text-sm font-mono"
                style={{ color: colors.foreground }}
              >
                {metrics.animationCount}
              </span>
            </div>

            {!compact && (
              <>
                {/* FPS History Chart */}
                <div className="mt-4">
                  <div className="text-xs mb-2" style={{ color: colors.foreground }}>
                    FPS History
                  </div>
                  <div className="h-12 flex items-end space-x-1">
                    {history.slice(-20).map((entry, index) => {
                      const height = Math.max(2, (entry.fps / 60) * 100);
                      const color = getPerformanceStatus(entry.fps).color;
                      
                      return (
                        <motion.div
                          key={index}
                          className="flex-1 rounded-t"
                          style={{ 
                            backgroundColor: color,
                            height: `${height}%`,
                            minHeight: '2px'
                          }}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Performance Tips */}
                {metrics.fps < 45 && (
                  <div 
                    className="mt-3 p-2 rounded text-xs"
                    style={{ 
                      backgroundColor: `${colors.accent}10`,
                      color: colors.accent,
                      border: `1px solid ${colors.accent}30`
                    }}
                  >
                    💡 Performance tip: Consider reducing particle count or disabling some animations
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div 
            className="px-3 py-2 text-xs border-t"
            style={{ 
              color: `${colors.foreground}60`,
              borderColor: colors.border 
            }}
          >
            Press Ctrl+Shift+P to toggle
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
