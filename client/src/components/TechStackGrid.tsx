import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud';
  icon: string;
  proficiency: number; // 1-5
  description: string;
}

const techStack: TechItem[] = [
  // Frontend
  { name: 'React', category: 'frontend', icon: '⚛️', proficiency: 5, description: 'Component-based UI library' },
  { name: 'TypeScript', category: 'frontend', icon: '🔷', proficiency: 5, description: 'Typed JavaScript superset' },
  { name: 'Next.js', category: 'frontend', icon: '▲', proficiency: 4, description: 'React production framework' },
  { name: 'Tailwind CSS', category: 'frontend', icon: '🎨', proficiency: 5, description: 'Utility-first CSS framework' },
  { name: 'Framer Motion', category: 'frontend', icon: '🎭', proficiency: 4, description: 'Animation library for React' },

  // Backend
  { name: 'Node.js', category: 'backend', icon: '🟢', proficiency: 5, description: 'JavaScript runtime environment' },
  { name: 'Express.js', category: 'backend', icon: '🚂', proficiency: 5, description: 'Fast web framework for Node.js' },
  { name: 'Python', category: 'backend', icon: '🐍', proficiency: 4, description: 'Versatile programming language' },
  { name: 'Django', category: 'backend', icon: '🎸', proficiency: 4, description: 'High-level Python web framework' },
  { name: 'FastAPI', category: 'backend', icon: '⚡', proficiency: 4, description: 'Modern Python API framework' },

  // Database
  { name: 'MongoDB', category: 'database', icon: '🍃', proficiency: 5, description: 'NoSQL document database' },
  { name: 'PostgreSQL', category: 'database', icon: '🐘', proficiency: 4, description: 'Advanced relational database' },
  { name: 'Redis', category: 'database', icon: '🔴', proficiency: 4, description: 'In-memory data structure store' },
  { name: 'Prisma', category: 'database', icon: '🔺', proficiency: 4, description: 'Next-generation ORM' },

  // Tools
  { name: 'Git', category: 'tools', icon: '📚', proficiency: 5, description: 'Version control system' },
  { name: 'Docker', category: 'tools', icon: '🐳', proficiency: 4, description: 'Containerization platform' },
  { name: 'VS Code', category: 'tools', icon: '💙', proficiency: 5, description: 'Code editor' },
  { name: 'Postman', category: 'tools', icon: '📮', proficiency: 5, description: 'API development tool' },

  // Cloud
  { name: 'AWS', category: 'cloud', icon: '☁️', proficiency: 4, description: 'Amazon Web Services' },
  { name: 'Vercel', category: 'cloud', icon: '▲', proficiency: 5, description: 'Frontend deployment platform' },
  { name: 'Netlify', category: 'cloud', icon: '🌐', proficiency: 4, description: 'Web development platform' },
];

const categoryColors = {
  frontend: '#00d4ff',
  backend: '#00ff88',
  database: '#ff6b35',
  tools: '#ff3366',
  cloud: '#8b5cf6',
};

const categoryIcons = {
  frontend: '🎨',
  backend: '⚙️',
  database: '🗄️',
  tools: '🛠️',
  cloud: '☁️',
};

const categoryLabels = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  database: 'Database & Storage',
  tools: 'Development Tools',
  cloud: 'Cloud & DevOps',
};

export default function TechStackGrid({ className = '' }: { className?: string }) {
  const { getThemeColors, theme } = useTheme();
  const { isMobile, screenSize } = useAdvancedMobile();
  const colors = getThemeColors(theme);

  const getGridColumns = () => {
    if (screenSize === 'xs') return 2;
    if (screenSize === 'sm') return 3;
    if (screenSize === 'md') return 4;
    return 5;
  };

  const getProficiencyBars = (proficiency: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        style={{
          width: '8px',
          height: '3px',
          backgroundColor: index < proficiency ? colors.secondary : colors.muted,
          borderRadius: '2px',
          opacity: index < proficiency ? 1 : 0.3,
        }}
      />
    ));
  };

  const groupedTech = techStack.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, TechItem[]>);

  return (
    <div className={`tech-stack-grid ${className}`}>
      {Object.entries(groupedTech).map(([category, items], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          style={{ marginBottom: '32px' }}
        >
          {/* Enhanced Category Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
              padding: '16px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${categoryColors[category as keyof typeof categoryColors]}15, ${categoryColors[category as keyof typeof categoryColors]}05)`,
              border: `1px solid ${categoryColors[category as keyof typeof categoryColors]}30`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background glow effect */}
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: `radial-gradient(circle, ${categoryColors[category as keyof typeof categoryColors]}10 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />

            {/* Category icon */}
            <div
              style={{
                fontSize: isMobile ? '24px' : '28px',
                marginRight: '12px',
                zIndex: 1,
              }}
            >
              {categoryIcons[category as keyof typeof categoryIcons]}
            </div>

            {/* Category title */}
            <div style={{ zIndex: 1 }}>
              <h3
                style={{
                  fontSize: isMobile ? '18px' : '22px',
                  fontWeight: '700',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  background: `linear-gradient(135deg, ${colors.foreground}, ${categoryColors[category as keyof typeof categoryColors]})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
              <div
                style={{
                  fontSize: isMobile ? '11px' : '12px',
                  color: colors.muted,
                  fontFamily: 'var(--font-mono)',
                  marginTop: '2px',
                }}
              >
                {items.length} technologies
              </div>
            </div>

            {/* Decorative line */}
            <div
              style={{
                flex: 1,
                height: '2px',
                marginLeft: '16px',
                background: `linear-gradient(90deg, ${categoryColors[category as keyof typeof categoryColors]}60, transparent)`,
                borderRadius: '1px',
                zIndex: 1,
              }}
            />
          </div>

          {/* Tech Items Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
              gap: '16px',
            }}
          >
            {items.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (categoryIndex * 0.1) + (index * 0.05),
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: `0 12px 40px ${categoryColors[category as keyof typeof categoryColors]}25`,
                  borderColor: `${categoryColors[category as keyof typeof categoryColors]}60`
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: colors.card,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '20px',
                  padding: isMobile ? '18px' : '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 8px 32px ${colors.secondary}15`,
                }}
              >
                {/* Hover glow effect */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${categoryColors[category as keyof typeof categoryColors]}10, transparent)`,
                    opacity: 0,
                    borderRadius: '20px',
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Enhanced Tech Icon */}
                <motion.div
                  style={{
                    fontSize: isMobile ? '28px' : '36px',
                    marginBottom: '12px',
                    height: isMobile ? '40px' : '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${categoryColors[category as keyof typeof categoryColors]}20, ${categoryColors[category as keyof typeof categoryColors]}10)`,
                      borderRadius: '12px',
                      padding: '8px',
                      border: `1px solid ${categoryColors[category as keyof typeof categoryColors]}30`,
                    }}
                  >
                    {tech.icon}
                  </div>
                </motion.div>

                {/* Enhanced Tech Name */}
                <h4
                  style={{
                    color: colors.foreground,
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '700',
                    margin: '0 0 8px 0',
                    fontFamily: 'var(--font-secondary)',
                    position: 'relative',
                    zIndex: 2,
                    letterSpacing: '0.5px',
                  }}
                >
                  {tech.name}
                </h4>

                {/* Enhanced Proficiency Bars */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '3px',
                    marginBottom: '12px',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: (categoryIndex * 0.1) + (index * 0.1) + (index * 0.05)
                      }}
                      style={{
                        width: '12px',
                        height: '4px',
                        backgroundColor: index < tech.proficiency
                          ? categoryColors[category as keyof typeof categoryColors]
                          : colors.muted,
                        borderRadius: '2px',
                        opacity: index < tech.proficiency ? 1 : 0.3,
                        boxShadow: index < tech.proficiency
                          ? `0 0 8px ${categoryColors[category as keyof typeof categoryColors]}50`
                          : 'none',
                        transformOrigin: 'left',
                      }}
                    />
                  ))}
                </div>

                {/* Proficiency Label */}
                <div
                  style={{
                    fontSize: isMobile ? '10px' : '11px',
                    color: categoryColors[category as keyof typeof categoryColors],
                    fontFamily: 'var(--font-mono)',
                    fontWeight: '600',
                    marginBottom: '8px',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {tech.proficiency === 5 ? 'Expert' :
                   tech.proficiency === 4 ? 'Advanced' :
                   tech.proficiency === 3 ? 'Intermediate' :
                   tech.proficiency === 2 ? 'Beginner' : 'Learning'}
                </div>

                {/* Enhanced Description */}
                <p
                  style={{
                    color: colors.muted,
                    fontSize: isMobile ? '11px' : '12px',
                    margin: 0,
                    lineHeight: '1.4',
                    fontFamily: 'var(--font-primary)',
                    position: 'relative',
                    zIndex: 2,
                    fontWeight: '400',
                    opacity: 0.9,
                  }}
                >
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Enhanced Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          background: `linear-gradient(135deg, ${colors.card}95, ${colors.muted}20)`,
          border: `1px solid ${colors.border}`,
          borderRadius: '24px',
          padding: isMobile ? '24px' : '32px',
          marginTop: '40px',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 12px 40px ${colors.secondary}10`,
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: `conic-gradient(from 0deg, ${colors.secondary}10, transparent, ${colors.accent}10, transparent)`,
            borderRadius: '50%',
            animation: 'rotate 20s linear infinite',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            style={{
              background: `linear-gradient(135deg, ${colors.foreground}, ${colors.secondary})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '800',
              margin: '0 0 24px 0',
              textAlign: 'center',
              fontFamily: 'var(--font-display)',
              letterSpacing: '1px',
            }}
          >
            🚀 Tech Arsenal Overview
          </motion.h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
              gap: isMobile ? '20px' : '24px',
              textAlign: 'center',
            }}
          >
            {Object.entries(categoryLabels).map(([key, label], index) => {
              const count = groupedTech[key]?.length || 0;
              const categoryColor = categoryColors[key as keyof typeof categoryColors];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.2 + (index * 0.1),
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${categoryColor}15, ${categoryColor}05)`,
                    border: `1px solid ${categoryColor}30`,
                    borderRadius: '16px',
                    padding: isMobile ? '16px' : '20px',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? '16px' : '20px',
                      marginBottom: '8px',
                    }}
                  >
                    {categoryIcons[key as keyof typeof categoryIcons]}
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.4 + (index * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                    style={{
                      color: categoryColor,
                      fontSize: isMobile ? '28px' : '32px',
                      fontWeight: '900',
                      fontFamily: 'var(--font-display)',
                      textShadow: `0 0 20px ${categoryColor}50`,
                      marginBottom: '4px',
                    }}
                  >
                    {count}
                  </motion.div>
                  <div
                    style={{
                      color: colors.muted,
                      fontSize: isMobile ? '10px' : '11px',
                      fontFamily: 'var(--font-primary)',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {key}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
