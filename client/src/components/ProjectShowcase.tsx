import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Database, Server, Smartphone } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useAdvancedMobile } from '@/hooks/use-mobile';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  features: string[];
  github: string;
  live?: string;
  status: 'completed' | 'in-progress' | 'planned';
  complexity: 'beginner' | 'intermediate' | 'advanced';
  codeStats: {
    lines: number;
    files: number;
    commits: number;
  };
}

const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Interactive Portfolio',
    description: 'A modern, responsive portfolio website built with React and TypeScript, featuring advanced animations and performance optimizations.',
    techStack: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express.js'],
      database: ['MongoDB'],
      tools: ['Vite', 'Git', 'VS Code']
    },
    features: [
      'Responsive design with mobile-first approach',
      'Advanced animations and micro-interactions',
      'Performance monitoring and optimization',
      'Multiple theme support with smooth transitions',
      'Real-time contact form with validation'
    ],
    github: 'https://github.com/osama/portfolio',
    live: 'https://osama-portfolio.vercel.app',
    status: 'completed',
    complexity: 'advanced',
    codeStats: {
      lines: 15420,
      files: 87,
      commits: 156
    }
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.',
    techStack: {
      frontend: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      backend: ['Node.js', 'Express.js', 'JWT'],
      database: ['PostgreSQL', 'Redis'],
      tools: ['Stripe API', 'Docker', 'AWS']
    },
    features: [
      'User authentication and authorization',
      'Shopping cart and wishlist functionality',
      'Stripe payment integration',
      'Admin dashboard with analytics',
      'Order tracking and management'
    ],
    github: 'https://github.com/osama/ecommerce',
    live: 'https://ecommerce-demo.vercel.app',
    status: 'completed',
    complexity: 'advanced',
    codeStats: {
      lines: 23150,
      files: 142,
      commits: 287
    }
  },
  {
    id: 'task-manager',
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates and team collaboration features.',
    techStack: {
      frontend: ['React', 'TypeScript', 'Material-UI'],
      backend: ['Node.js', 'Socket.io', 'Express.js'],
      database: ['MongoDB'],
      tools: ['JWT', 'Cloudinary', 'Heroku']
    },
    features: [
      'Real-time collaboration with Socket.io',
      'Drag and drop task management',
      'Team invitation and role management',
      'File attachments and comments',
      'Progress tracking and analytics'
    ],
    github: 'https://github.com/osama/task-manager',
    status: 'in-progress',
    complexity: 'intermediate',
    codeStats: {
      lines: 12890,
      files: 76,
      commits: 134
    }
  }
];

export default function ProjectShowcase({ className = '' }: { className?: string }) {
  const { getThemeColors, theme } = useTheme();
  const { isMobile, screenSize } = useAdvancedMobile();
  const colors = getThemeColors(theme);
  
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#f59e0b';
      case 'planned': return '#6b7280';
      default: return colors.muted;
    }
  };

  const getComplexityIcon = (complexity: Project['complexity']) => {
    switch (complexity) {
      case 'beginner': return '🟢';
      case 'intermediate': return '🟡';
      case 'advanced': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className={`project-showcase ${className}`}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              background: `linear-gradient(135deg, ${colors.card}95, ${colors.muted}20)`,
              border: `1px solid ${colors.border}`,
              borderRadius: '20px',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: `0 8px 32px ${colors.secondary}10`,
            }}
            whileHover={{
              y: -8,
              boxShadow: `0 16px 48px ${colors.secondary}25`,
              borderColor: `${colors.secondary}60`,
              scale: 1.02
            }}
            onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
          >
            {/* Enhanced Project Header */}
            <div style={{ padding: isMobile ? '20px' : '24px', position: 'relative' }}>
              {/* Background decoration */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${colors.secondary}10 0%, transparent 70%)`,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', position: 'relative', zIndex: 2 }}>
                <h3
                  style={{
                    background: `linear-gradient(135deg, ${colors.foreground}, ${colors.secondary})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontSize: isMobile ? '20px' : '24px',
                    fontWeight: '700',
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.5px',
                  }}
                >
                  {project.title}
                </h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    style={{
                      background: `linear-gradient(135deg, ${getStatusColor(project.status)}, ${getStatusColor(project.status)}80)`,
                      color: 'white',
                      fontSize: isMobile ? '10px' : '11px',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: `0 2px 8px ${getStatusColor(project.status)}30`,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {project.status.replace('-', ' ')}
                  </motion.span>
                  <motion.span
                    style={{
                      fontSize: '18px',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getComplexityIcon(project.complexity)}
                  </motion.span>
                </div>
              </div>

              <p
                style={{
                  color: colors.muted,
                  fontSize: isMobile ? '13px' : '14px',
                  lineHeight: '1.5',
                  margin: '0 0 16px 0',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                {project.description}
              </p>

              {/* Enhanced Tech Stack Preview */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px', position: 'relative', zIndex: 2 }}>
                {[...project.techStack.frontend.slice(0, 3), ...project.techStack.backend.slice(0, 2)].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      boxShadow: `0 4px 12px ${colors.secondary}30`
                    }}
                    style={{
                      background: `linear-gradient(135deg, ${colors.secondary}25, ${colors.secondary}15)`,
                      color: colors.secondary,
                      fontSize: isMobile ? '10px' : '11px',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontFamily: 'var(--font-mono)',
                      border: `1px solid ${colors.secondary}30`,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {(project.techStack.frontend.length + project.techStack.backend.length) > 5 && (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    style={{
                      color: colors.muted,
                      fontSize: isMobile ? '10px' : '11px',
                      padding: '4px 8px',
                      background: `${colors.muted}20`,
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: '500',
                    }}
                  >
                    +{(project.techStack.frontend.length + project.techStack.backend.length) - 5} more
                  </motion.span>
                )}
              </div>

              {/* Enhanced Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 2 }}>
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: `linear-gradient(135deg, ${colors.secondary}25, ${colors.secondary}15)`,
                    color: colors.secondary,
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontSize: isMobile ? '11px' : '12px',
                    fontWeight: '600',
                    border: `1px solid ${colors.secondary}30`,
                    fontFamily: 'var(--font-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: `0 6px 20px ${colors.secondary}30`,
                    borderColor: `${colors.secondary}60`
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Github size={16} />
                  Source Code
                </motion.a>
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}80)`,
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      fontSize: isMobile ? '11px' : '12px',
                      fontWeight: '600',
                      fontFamily: 'var(--font-primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: `0 4px 16px ${colors.accent}30`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: `0 8px 24px ${colors.accent}40`
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                )}
              </div>
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
              {selectedProject === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    borderTop: `1px solid ${colors.border}`,
                    backgroundColor: colors.muted + '10',
                  }}
                >
                  <div style={{ padding: '20px' }}>
                    {/* Code Stats */}
                    <div style={{ marginBottom: '20px' }}>
                      <h4
                        style={{
                          color: colors.foreground,
                          fontSize: '14px',
                          fontWeight: '600',
                          margin: '0 0 8px 0',
                          fontFamily: 'var(--font-secondary)',
                        }}
                      >
                        📊 Code Statistics
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              color: colors.secondary,
                              fontSize: '16px',
                              fontWeight: 'bold',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {project.codeStats.lines.toLocaleString()}
                          </div>
                          <div style={{ color: colors.muted, fontSize: '11px' }}>Lines</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              color: colors.accent,
                              fontSize: '16px',
                              fontWeight: 'bold',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {project.codeStats.files}
                          </div>
                          <div style={{ color: colors.muted, fontSize: '11px' }}>Files</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              color: colors.foreground,
                              fontSize: '16px',
                              fontWeight: 'bold',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {project.codeStats.commits}
                          </div>
                          <div style={{ color: colors.muted, fontSize: '11px' }}>Commits</div>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack Details */}
                    <div style={{ marginBottom: '20px' }}>
                      <h4
                        style={{
                          color: colors.foreground,
                          fontSize: '14px',
                          fontWeight: '600',
                          margin: '0 0 12px 0',
                          fontFamily: 'var(--font-secondary)',
                        }}
                      >
                        🛠️ Tech Stack
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '12px' }}>
                        {Object.entries(project.techStack).map(([category, techs]) => (
                          <div key={category}>
                            <div
                              style={{
                                color: colors.secondary,
                                fontSize: '12px',
                                fontWeight: '600',
                                marginBottom: '4px',
                                textTransform: 'capitalize',
                                fontFamily: 'var(--font-primary)',
                              }}
                            >
                              {category === 'frontend' && <Smartphone size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                              {category === 'backend' && <Server size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                              {category === 'database' && <Database size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                              {category === 'tools' && <Code size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                              {category}
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {techs.map((tech) => (
                                <span
                                  key={tech}
                                  style={{
                                    backgroundColor: colors.border,
                                    color: colors.foreground,
                                    fontSize: '10px',
                                    padding: '2px 6px',
                                    borderRadius: '3px',
                                    fontFamily: 'var(--font-mono)',
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4
                        style={{
                          color: colors.foreground,
                          fontSize: '14px',
                          fontWeight: '600',
                          margin: '0 0 8px 0',
                          fontFamily: 'var(--font-secondary)',
                        }}
                      >
                        ✨ Key Features
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '16px' }}>
                        {project.features.map((feature, index) => (
                          <li
                            key={index}
                            style={{
                              color: colors.muted,
                              fontSize: '12px',
                              lineHeight: '1.4',
                              marginBottom: '4px',
                              fontFamily: 'var(--font-primary)',
                            }}
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
