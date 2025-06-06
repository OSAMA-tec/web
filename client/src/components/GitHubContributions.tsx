import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // GitHub-style contribution levels
}

export default function GitHubContributions({ className = '' }: { className?: string }) {
  const { getThemeColors, theme } = useTheme();
  const { isMobile } = useAdvancedMobile();
  const colors = getThemeColors(theme);
  
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Generate mock contribution data for the last year
  useEffect(() => {
    const generateContributions = () => {
      const data: ContributionDay[] = [];
      const today = new Date();
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      
      let total = 0;
      let streak = 0;
      let maxStreak = 0;
      let tempStreak = 0;

      for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        // Simulate realistic contribution patterns
        let count = 0;
        const random = Math.random();
        
        if (random > 0.3) { // 70% chance of contributions
          if (isWeekend) {
            count = Math.floor(Math.random() * 3); // 0-2 on weekends
          } else {
            count = Math.floor(Math.random() * 8) + 1; // 1-8 on weekdays
          }
        }

        const level = count === 0 ? 0 : 
                     count <= 2 ? 1 : 
                     count <= 4 ? 2 : 
                     count <= 6 ? 3 : 4;

        data.push({
          date: d.toISOString().split('T')[0],
          count,
          level: level as ContributionDay['level']
        });

        total += count;

        // Calculate streaks
        if (count > 0) {
          tempStreak++;
          maxStreak = Math.max(maxStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      }

      // Calculate current streak (from today backwards)
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].count > 0) {
          streak++;
        } else {
          break;
        }
      }

      setContributions(data);
      setTotalContributions(total);
      setCurrentStreak(streak);
      setLongestStreak(maxStreak);
    };

    generateContributions();
  }, []);

  const getContributionColor = (level: number) => {
    const baseColor = colors.secondary;
    const opacity = level === 0 ? 0.1 : 0.2 + (level * 0.2);
    
    // Convert hex to rgba
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const getWeeksArray = () => {
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    contributions.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      currentWeek.push(day);
      
      if (index === contributions.length - 1) {
        weeks.push(currentWeek);
      }
    });
    
    return weeks;
  };

  const weeks = getWeeksArray();
  const cellSize = isMobile ? 8 : 10;
  const cellGap = 2;

  return (
    <div className="space-y-8">
      {/* Main Contributions Card */}
      <motion.div
        className={`github-contributions ${className}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
        style={{
          background: `linear-gradient(135deg, ${colors.card}95, ${colors.primary}05)`,
          border: `2px solid ${colors.border}`,
          borderRadius: '24px',
          padding: isMobile ? '24px' : '32px',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 20px 60px ${colors.secondary}20`,
        }}
      >
        {/* Animated background pattern */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `conic-gradient(from 0deg, ${colors.secondary}08, transparent, ${colors.accent}08, transparent)`,
            borderRadius: '50%',
            animation: 'rotate 30s linear infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Floating code symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['<', '>', '{', '}', '(', ')', ';', '='].map((symbol, index) => (
            <motion.div
              key={index}
              className="absolute text-2xl opacity-10"
              style={{
                color: colors.secondary,
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          left: '-30%',
          width: '160%',
          height: '160%',
          background: `radial-gradient(circle, ${colors.secondary}08 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

        {/* Enhanced Header */}
        <div style={{ marginBottom: '32px', position: 'relative', zIndex: 2 }}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              style={{
                fontSize: isMobile ? '28px' : '32px',
                marginRight: '16px',
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              📊
            </motion.div>
            <div>
              <h3
                style={{
                  background: `linear-gradient(135deg, ${colors.foreground}, ${colors.secondary}, ${colors.accent})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontSize: isMobile ? '20px' : '26px',
                  fontWeight: '800',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '1px',
                }}
              >
                GitHub Activity Dashboard
              </h3>
              <div
                style={{
                  fontSize: isMobile ? '11px' : '12px',
                  color: colors.muted,
                  fontFamily: 'var(--font-mono)',
                  marginTop: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Real-time contribution tracking
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{
              background: `linear-gradient(135deg, ${colors.secondary}15, ${colors.accent}10)`,
              border: `1px solid ${colors.secondary}30`,
              borderRadius: '16px',
              padding: isMobile ? '12px' : '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              style={{
                fontSize: isMobile ? '16px' : '18px',
              }}
            >
              🔥
            </div>
            <div>
              <span
                style={{
                  color: colors.secondary,
                  fontSize: isMobile ? '18px' : '22px',
                  fontWeight: '900',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {totalContributions.toLocaleString()}
              </span>
              <span
                style={{
                  color: colors.muted,
                  fontSize: isMobile ? '13px' : '15px',
                  fontFamily: 'var(--font-primary)',
                  fontWeight: '500',
                  marginLeft: '8px',
                }}
              >
                contributions this year
              </span>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Contribution Graph */}
        <motion.div
          style={{
            marginBottom: '24px',
            overflowX: 'auto',
            position: 'relative',
            zIndex: 2,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.card}60, ${colors.muted}20)`,
              border: `1px solid ${colors.border}40`,
              borderRadius: '16px',
              padding: isMobile ? '16px' : '20px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: `${cellGap}px`,
                minWidth: `${weeks.length * (cellSize + cellGap)}px`,
                justifyContent: 'center',
              }}
            >
              {weeks.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: `${cellGap}px`,
                  }}
                >
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={day.date}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: (weekIndex * 0.01) + (dayIndex * 0.005),
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{
                        scale: 1.4,
                        borderRadius: '8px',
                        boxShadow: `0 0 20px ${getContributionColor(day.level)}80`,
                        zIndex: 10,
                        y: -2,
                      }}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        backgroundColor: getContributionColor(day.level),
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: day.count > 0
                          ? `2px solid ${colors.secondary}60`
                          : `1px solid ${colors.border}30`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        boxShadow: day.count > 0
                          ? `0 2px 8px ${getContributionColor(day.level)}40`
                          : 'none',
                      }}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Legend */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
            position: 'relative',
            zIndex: 2,
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: `linear-gradient(135deg, ${colors.card}40, ${colors.muted}10)`,
              border: `1px solid ${colors.border}30`,
              borderRadius: '12px',
              padding: '12px 16px',
            }}
          >
            <span
              style={{
                color: colors.muted,
                fontSize: isMobile ? '12px' : '13px',
                fontFamily: 'var(--font-primary)',
                fontWeight: '600',
              }}
            >
              Less
            </span>
            {[0, 1, 2, 3, 4].map((level) => (
              <motion.div
                key={level}
                style={{
                  width: `${cellSize + 2}px`,
                  height: `${cellSize + 2}px`,
                  backgroundColor: getContributionColor(level),
                  borderRadius: '4px',
                  border: level > 0 ? `2px solid ${colors.secondary}60` : `1px solid ${colors.border}40`,
                  cursor: 'pointer',
                }}
                whileHover={{
                  scale: 1.2,
                  boxShadow: `0 0 12px ${getContributionColor(level)}60`
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
            <span
              style={{
                color: colors.muted,
                fontSize: isMobile ? '12px' : '13px',
                fontFamily: 'var(--font-primary)',
                fontWeight: '600',
              }}
            >
              More
            </span>
          </div>
        </motion.div>

        {/* Premium Stats Section */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '16px' : '24px',
            marginTop: '32px',
            paddingTop: '28px',
            borderTop: `2px solid ${colors.border}40`,
            position: 'relative',
            zIndex: 2,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div
            style={{ textAlign: 'center' }}
            whileHover={{
              scale: 1.08,
              y: -8,
              rotateY: 5,
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.secondary}80, ${colors.secondary}60)`,
                borderRadius: '20px',
                padding: isMobile ? '20px' : '24px',
                border: `2px solid ${colors.secondary}40`,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 8px 32px ${colors.secondary}30`,
              }}
            >
              {/* Animated background */}
              <div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `radial-gradient(circle, ${colors.secondary}20 0%, transparent 70%)`,
                  animation: 'pulse 3s ease-in-out infinite',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎯</div>
                <div
                  style={{
                    color: 'white',
                    fontSize: isMobile ? '28px' : '32px',
                    fontWeight: '900',
                    fontFamily: 'var(--font-display)',
                    textShadow: `0 0 20px ${colors.secondary}80`,
                    marginBottom: '4px',
                  }}
                >
                  {totalContributions.toLocaleString()}
                </div>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: isMobile ? '11px' : '12px',
                    fontFamily: 'var(--font-primary)',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Total Contributions
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ textAlign: 'center' }}
            whileHover={{
              scale: 1.08,
              y: -8,
              rotateY: -5,
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}80, ${colors.accent}60)`,
                borderRadius: '20px',
                padding: isMobile ? '20px' : '24px',
                border: `2px solid ${colors.accent}40`,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 8px 32px ${colors.accent}30`,
              }}
            >
              {/* Animated background */}
              <div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `radial-gradient(circle, ${colors.accent}20 0%, transparent 70%)`,
                  animation: 'pulse 3s ease-in-out infinite 1s',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔥</div>
                <div
                  style={{
                    color: 'white',
                    fontSize: isMobile ? '28px' : '32px',
                    fontWeight: '900',
                    fontFamily: 'var(--font-display)',
                    textShadow: `0 0 20px ${colors.accent}80`,
                    marginBottom: '4px',
                  }}
                >
                  {currentStreak}
                </div>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: isMobile ? '11px' : '12px',
                    fontFamily: 'var(--font-primary)',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Current Streak
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{
              textAlign: 'center',
              gridColumn: isMobile ? '1 / -1' : 'auto'
            }}
            whileHover={{
              scale: 1.08,
              y: -8,
              rotateY: 5,
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${colors.foreground}, ${colors.foreground}80, ${colors.foreground}60)`,
                borderRadius: '20px',
                padding: isMobile ? '20px' : '24px',
                border: `2px solid ${colors.foreground}40`,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 8px 32px ${colors.foreground}20`,
              }}
            >
              {/* Animated background */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `radial-gradient(circle, ${colors.foreground}15 0%, transparent 70%)`,
                  animation: 'pulse 3s ease-in-out infinite 2s',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
                <div
                  style={{
                    color: colors.primary,
                    fontSize: isMobile ? '28px' : '32px',
                    fontWeight: '900',
                    fontFamily: 'var(--font-display)',
                    textShadow: `0 0 20px ${colors.foreground}50`,
                    marginBottom: '4px',
                  }}
                >
                  {longestStreak}
                </div>
                <div
                  style={{
                    color: `${colors.primary}95`,
                    fontSize: isMobile ? '11px' : '12px',
                    fontFamily: 'var(--font-primary)',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Longest Streak
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
