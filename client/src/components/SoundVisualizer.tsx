import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface SoundVisualizerProps {
  audioUrl?: string;
  variant?: 'bars' | 'wave' | 'circular' | 'particles';
  size?: 'small' | 'medium' | 'large';
  reactive?: boolean;
  className?: string;
}

export default function SoundVisualizer({
  audioUrl,
  variant = 'bars',
  size = 'medium',
  reactive = true,
  className = ''
}: SoundVisualizerProps) {
  const { getThemeColors, theme } = useTheme();
  const colors = getThemeColors(theme);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(128));
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const sizeConfig = {
    small: { width: 200, height: 100, bars: 32 },
    medium: { width: 300, height: 150, bars: 64 },
    large: { width: 400, height: 200, bars: 128 }
  };

  const config = sizeConfig[size];

  // Initialize audio context and analyser
  useEffect(() => {
    if (!audioUrl || !reactive) return;

    const initAudio = async () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = config.bars * 2;
        analyser.smoothingTimeConstant = 0.8;
        
        if (audioRef.current) {
          const source = audioContext.createMediaElementSource(audioRef.current);
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          
          analyserRef.current = analyser;
          setIsAudioEnabled(true);
        }
      } catch (error) {
        console.warn('Audio context initialization failed:', error);
        setIsAudioEnabled(false);
      }
    };

    initAudio();
  }, [audioUrl, reactive, config.bars]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (analyserRef.current && isPlaying) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
        setAudioData(dataArray);
      } else if (!reactive) {
        // Generate fake data for demo
        const fakeData = new Uint8Array(config.bars);
        for (let i = 0; i < config.bars; i++) {
          fakeData[i] = Math.random() * 255 * (Math.sin(Date.now() * 0.001 + i * 0.1) * 0.5 + 0.5);
        }
        setAudioData(fakeData);
      }

      drawVisualization();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, reactive, config.bars]);

  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (variant) {
      case 'bars':
        drawBars(ctx, canvas);
        break;
      case 'wave':
        drawWave(ctx, canvas);
        break;
      case 'circular':
        drawCircular(ctx, canvas);
        break;
      case 'particles':
        drawParticles(ctx, canvas);
        break;
    }
  };

  const drawBars = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const barWidth = canvas.width / config.bars;
    
    for (let i = 0; i < config.bars; i++) {
      const barHeight = (audioData[i] / 255) * canvas.height;
      const x = i * barWidth;
      const y = canvas.height - barHeight;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, colors.secondary);
      gradient.addColorStop(0.5, colors.accent);
      gradient.addColorStop(1, colors.secondary);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
      
      // Add glow effect
      ctx.shadowColor = colors.secondary;
      ctx.shadowBlur = 10;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
      ctx.shadowBlur = 0;
    }
  };

  const drawWave = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const sliceWidth = canvas.width / config.bars;
    let x = 0;
    
    for (let i = 0; i < config.bars; i++) {
      const v = audioData[i] / 255;
      const y = (v * canvas.height) / 2 + canvas.height / 2;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    ctx.stroke();
    
    // Add glow
    ctx.shadowColor = colors.secondary;
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const drawCircular = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    for (let i = 0; i < config.bars; i++) {
      const angle = (i / config.bars) * Math.PI * 2;
      const barHeight = (audioData[i] / 255) * 50;
      
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius + barHeight);
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, colors.secondary);
      gradient.addColorStop(1, colors.accent);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    for (let i = 0; i < config.bars; i++) {
      const intensity = audioData[i] / 255;
      const x = (i / config.bars) * canvas.width;
      const y = canvas.height / 2;
      const size = intensity * 10;
      
      if (size > 1) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, colors.secondary);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add floating particles
        for (let j = 0; j < intensity * 5; j++) {
          const px = x + (Math.random() - 0.5) * 50;
          const py = y + (Math.random() - 0.5) * 50;
          const pSize = Math.random() * 3;
          
          ctx.fillStyle = colors.accent;
          ctx.beginPath();
          ctx.arc(px, py, pSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Audio element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          loop
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Visualizer canvas */}
      <motion.div
        className="relative rounded-lg overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.card}80, ${colors.muted}40)`,
          border: `1px solid ${colors.border}`,
          backdropFilter: 'blur(10px)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <canvas
          ref={canvasRef}
          width={config.width}
          height={config.height}
          className="w-full h-full"
        />

        {/* Controls overlay */}
        {audioUrl && (
          <motion.div
            className="absolute top-2 right-2 flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="p-2 rounded-full backdrop-blur-md"
              style={{
                backgroundColor: `${colors.card}80`,
                border: `1px solid ${colors.border}`,
                color: colors.foreground,
              }}
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </motion.button>

            <motion.button
              className="p-2 rounded-full backdrop-blur-md"
              style={{
                backgroundColor: `${colors.card}80`,
                border: `1px solid ${colors.border}`,
                color: isMuted ? colors.accent : colors.foreground,
              }}
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </motion.button>
          </motion.div>
        )}

        {/* Status indicator */}
        <motion.div
          className="absolute bottom-2 left-2 text-xs font-mono"
          style={{ color: colors.foreground }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {reactive && isAudioEnabled ? 'LIVE' : 'DEMO'}
        </motion.div>
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.secondary}20, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: isPlaying ? 0.8 : 0.3,
          scale: isPlaying ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
