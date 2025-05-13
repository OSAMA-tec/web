import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useState, useEffect } from "react";
import Terminal from "./components/Terminal";
import SocialFloaters from "./components/SocialFloaters";
import { useLocation } from "wouter";
import { ThemeProvider } from "./hooks/use-theme";

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
  
  // Initial loading animation
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
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
      
      {/* Loading screen */}
      {loading && (
        <div className="fixed inset-0 bg-[#0a192f] flex flex-col items-center justify-center z-50">
          <div className="text-center">
            <div className="text-3xl font-mono mb-4 text-[#64ffda]">
              <span className="inline-block typing-animation">
                Initializing_Portfolio.exe
              </span>
            </div>
            <div className="w-64 h-2 bg-[#1E1E2A] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#64ffda] to-[#8b5cf6] loading-bar"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Interactive terminal component - toggled with backtick key */}
      <Terminal 
        isActive={terminalActive} 
        onClose={() => setTerminalActive(false)}
        onNavigate={(path: string) => {
          setLocation(path);
          setTerminalActive(false);
        }} 
      />
      
      {/* Floating command hint */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1E1E2A]/80 text-[#e6f1ff]/70 px-3 py-1 rounded-full text-sm backdrop-blur-md z-30">
        Press <kbd className="bg-[#64ffda]/20 text-[#64ffda] px-2 py-0.5 rounded mx-1 font-mono">`</kbd> for terminal
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
