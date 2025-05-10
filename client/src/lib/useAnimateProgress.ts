import { useEffect } from 'react';

export const useAnimateProgress = (isInView: boolean) => {
  useEffect(() => {
    if (!isInView) return;
    
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach((progress) => {
      progress.classList.add('progress-animate');
    });
    
    return () => {
      progressBars.forEach((progress) => {
        progress.classList.remove('progress-animate');
      });
    };
  }, [isInView]);
};
