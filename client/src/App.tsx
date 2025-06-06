import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useState, useEffect } from "react";
import Terminal from "./components/Terminal";
import SocialFloaters from "./components/SocialFloaters";
import EnhancedNavigation from "./components/EnhancedNavigation";
import ScrollProgress from "./components/ScrollProgress";
import PerformanceMonitor from "./components/PerformanceMonitor";
import EnhancedLoader from "./components/EnhancedLoader";
import { useLocation } from "wouter";
import { ThemeProvider } from "./hooks/theme-context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [terminalActive, setTerminalActive] = useState(false);
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Enhanced loading animation with progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  // Handle keyboard shortcut for terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal with ` (backtick) key
      if (e.key === '`') {
        setTerminalActive(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />

      {/* Enhanced Loading screen */}
      <EnhancedLoader
        isLoading={loading}
        progress={loadingProgress}
        message="Initializing Portfolio..."
        variant="detailed"
      />
      
      {/* Enhanced Navigation */}
      <EnhancedNavigation />

      {/* Scroll Progress Indicator */}
      <ScrollProgress
        showBackToTop={true}
        showSectionIndicators={true}
      />

      {/* Performance Monitor */}
      <PerformanceMonitor
        enabled={false}
        position="top-right"
        compact={false}
      />

      {/* Interactive terminal component - toggled with backtick key */}
      <Terminal
        isActive={terminalActive}
        onClose={() => setTerminalActive(false)}
        onNavigate={(path: string) => {
          setLocation(path);
          setTerminalActive(false);
        }}
      />

      {/* Floating command hint - enhanced with theme colors */}
      <div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-sm backdrop-blur-md z-30 glass"
        style={{
          backgroundColor: 'var(--theme-muted)',
          color: 'var(--theme-foreground)',
          opacity: 0.8,
          border: '1px solid var(--theme-border)'
        }}
      >
        Press <kbd
          className="px-2 py-0.5 rounded mx-1 font-mono shadow-glow"
          style={{
            backgroundColor: 'var(--theme-secondary)',
            color: 'var(--theme-primary)',
            opacity: 0.9
          }}
        >`</kbd> for terminal
      </div>

      {/* Floating social links */}
      <SocialFloaters />

      {/* Main content */}
      <Router />
    </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
