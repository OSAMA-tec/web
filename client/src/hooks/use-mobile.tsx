import * as React from "react"

const MOBILE_BREAKPOINT = 768

interface MobileDetection {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  orientation: 'portrait' | 'landscape';
  touchDevice: boolean;
  devicePixelRatio: number;
  viewportWidth: number;
  viewportHeight: number;
  isLowPowerMode: boolean;
}

export function useAdvancedMobile(): MobileDetection {
  const [detection, setDetection] = React.useState<MobileDetection>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenSize: 'lg',
    orientation: 'landscape',
    touchDevice: false,
    devicePixelRatio: 1,
    viewportWidth: 1024,
    viewportHeight: 768,
    isLowPowerMode: false,
  });

  React.useEffect(() => {
    const updateDetection = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      // Screen size detection with proper breakpoints
      let screenSize: MobileDetection['screenSize'] = 'lg';
      if (width < 480) screenSize = 'xs';
      else if (width < 640) screenSize = 'sm';
      else if (width < 768) screenSize = 'md';
      else if (width < 1024) screenSize = 'lg';
      else if (width < 1280) screenSize = 'xl';
      else screenSize = '2xl';

      // Enhanced device type detection
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      // Orientation detection
      const orientation = width > height ? 'landscape' : 'portrait';

      // Touch device detection
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Low power mode detection (for performance optimization)
      const isLowPowerMode = isMobile && dpr < 2;

      setDetection({
        isMobile,
        isTablet,
        isDesktop,
        screenSize,
        orientation,
        touchDevice,
        devicePixelRatio: dpr,
        viewportWidth: width,
        viewportHeight: height,
        isLowPowerMode,
      });
    };

    // Initial detection
    updateDetection();

    // Debounced resize handler for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDetection, 100);
    };

    // Listen for resize and orientation changes
    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', updateDetection);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', updateDetection);
    };
  }, []);

  return detection;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
