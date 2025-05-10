import { useEffect, useState, useRef } from "react";
import useScrollReveal from "@/lib/useScrollReveal";
import { motion } from "framer-motion";
import { Eye, Layers, Code, Database, Mail, Github, Linkedin, Twitter, X, MessageSquare } from "lucide-react";

// Code animation component for developer-themed sections
function CodeBlock({ 
  fileName, 
  language = "javascript", 
  children, 
  delay = 0 
}: { 
  fileName: string; 
  language?: string; 
  children: React.ReactNode; 
  delay?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <motion.div 
      className="code-block mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="code-block-header">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-[#e6f1ff]/70 text-sm">{fileName}</div>
        </div>
        <div className="text-[#e6f1ff]/50 text-xs uppercase">{language}</div>
      </div>
      
      <div className={`code-block-content ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="line-numbers">
          {Array.from({ length: (children?.toString()?.split('\n').length || 1) }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="code-content">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// Interactive project card with 3D terminal-like theme
function ProjectCard({ 
  title, 
  description, 
  tags, 
  image, 
  link, 
  githubLink, 
  delay = 0 
}: { 
  title: string; 
  description: string; 
  tags: string[]; 
  image: string; 
  link?: string; 
  githubLink?: string;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative group perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    >
      {/* Terminal-like header */}
      <div className="absolute -top-5 left-0 right-0 bg-[#0a192f] rounded-t-lg border-t border-l border-r border-[#64ffda]/30 px-3 py-1 z-20 flex items-center">
        <div className="flex space-x-1.5 mr-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-[#e6f1ff]/70 font-mono overflow-hidden whitespace-nowrap">
          ~/{title.toLowerCase().replace(/\s/g, '-')}
        </div>
      </div>
      
      <div 
        className={`
          bg-[#1E1E2A] rounded-lg overflow-hidden shadow-xl border border-[#64ffda]/30
          transform transition-all duration-500 
          ${isHovered ? 'shadow-[0_10px_50px_-12px_rgba(100,255,218,0.25)]' : ''}
        `}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className={`
              w-full h-full object-cover
              transition-all duration-700 
              ${isHovered ? 'scale-110 filter contrast-125 brightness-110' : ''}
            `}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E2A] to-transparent"></div>
          
          {/* Animated overlay on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-[#8b5cf6]/20 opacity-0"
            animate={{ opacity: isHovered ? 0.4 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Tag pills positioned at the top right */}
          <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-2 max-w-[70%]">
            {tags.map((tag, index) => (
              <motion.span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-[#0a192f]/80 backdrop-blur-sm text-[#64ffda] border border-[#64ffda]/30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: delay + (index * 0.1) }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(100, 255, 218, 0.2)" }}
              >
                #{tag.toLowerCase().replace(/\s|\./g, '')}
              </motion.span>
            ))}
          </div>
        </div>
        
        <div className="p-6 relative">
          {/* Glowing border effect on hover */}
          <motion.div 
            className="absolute inset-0 rounded-b-lg opacity-0"
            style={{ 
              background: 'linear-gradient(to right, rgba(100, 255, 218, 0.1), rgba(139, 92, 246, 0.1))',
              boxShadow: 'inset 0 0 15px rgba(100, 255, 218, 0.2)' 
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className="relative z-10">
            {/* Title with code-like syntax */}
            <div className="font-mono text-xs text-[#8b5cf6] mb-2">const projectName = </div>
            <h3 className="text-xl font-bold mb-3 gradient-text">{title};</h3>
            
            {/* Description with typing animation effect on hover */}
            <div className="h-16 mb-6 overflow-hidden">
              <motion.p 
                className="text-[#e6f1ff]/70 text-sm"
                initial={{ y: 0 }}
                animate={{ y: isHovered ? [-2, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                {description}
              </motion.p>
            </div>
            
            <div className="font-mono text-xs text-[#8b5cf6] mb-2">{"// Links"}</div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                {githubLink && (
                  <motion.a 
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e6f1ff] p-2 bg-[#0a192f] rounded-full hover:bg-[#64ffda]/20 transition-colors"
                    aria-label="View GitHub repository"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                )}
                {link && (
                  <motion.a 
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e6f1ff] p-2 bg-[#0a192f] rounded-full hover:bg-[#64ffda]/20 transition-colors"
                    aria-label="View live project"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
              
              {/* Animated view details button */}
              <motion.div 
                className="relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#64ffda] to-[#8b5cf6] opacity-0"
                  animate={{ opacity: isHovered ? 0.2 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <button 
                  className="px-3 py-1.5 border border-[#64ffda] text-[#64ffda] text-sm rounded-md 
                  font-mono hover:bg-[#64ffda]/10 transition-colors flex items-center gap-1"
                >
                  <span className="text-[#8b5cf6]">{">"}</span> view_details()
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Home component
export default function Home() {
  const [typedText, setTypedText] = useState("");
  const typingRef = useRef<HTMLSpanElement>(null);
  
  // Set title and meta description on mount
  useEffect(() => {
    document.title = "Osama Hashmi - Full Stack Developer";
  }, []);

  // Initialize scroll animations
  useScrollReveal();
  
  // Cursor blinking effect
  useEffect(() => {
    if (!typingRef.current) return;
    
    // Simulate terminal typing for intro text
    const textToType = "I'm a Full Stack Developer focused on creating exceptional digital experiences with modern technologies.";
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < textToType.length) {
        setTypedText(textToType.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <main className="relative">
      {/* Hero Section - Developer Themed */}
      <section id="home" className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-3xl">
            <motion.div 
              className="inline-block font-mono mb-4 text-sm text-[#64ffda]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              $ whoami
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-[#e6f1ff]">Osama</span>
              <span className="text-[#64ffda]">.</span>
              <span className="text-[#e6f1ff]">Hashmi</span>
              <span className="text-[#8b5cf6]">()</span>
            </motion.h1>
            
            <motion.div 
              className="mb-8 font-mono text-[#e6f1ff]/70 text-lg bg-[#1E1E2A]/50 p-4 rounded-md border-l-2 border-[#64ffda]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex">
                <span className="text-[#8b5cf6] mr-2">const</span>
                <span className="text-[#64ffda]">role</span>
                <span className="mr-2"> = </span>
                <span className="text-[#e6f1ff]">"Full Stack Developer";</span>
              </div>
              <div className="flex mt-2">
                <span className="text-[#8b5cf6] mr-2">const</span>
                <span className="text-[#64ffda]">description</span>
                <span className="mr-2"> = </span>
                <span className="text-[#e6f1ff]">"</span>
                <span ref={typingRef}>{typedText}</span>
                <span className="animate-pulse">|</span>
                <span className="text-[#e6f1ff]">";</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a 
                href="#projects" 
                className="px-6 py-3 border-2 border-[#64ffda] text-[#64ffda] rounded-md hover:bg-[#64ffda]/10 transition-colors duration-300 flex items-center gap-2"
              >
                <Code size={18} />
                <span>View Projects</span>
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-[#64ffda] text-[#0a192f] rounded-md hover:bg-[#64ffda]/90 transition-colors duration-300 flex items-center gap-2 font-medium"
              >
                <MessageSquare size={18} />
                <span>Contact Me</span>
              </a>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <motion.div 
            className="text-[#e6f1ff]/60 mb-2 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            scroll.down()
          </motion.div>
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="#64ffda" strokeWidth="2"/>
              <circle className="animate-pulse" cx="8" cy="8" r="3" fill="#64ffda"/>
            </svg>
          </motion.div>
        </div>
      </section>
      
      {/* About Section - Code-themed */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#0a192f] to-[#121212]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-[#64ffda]">01.</span> About Me
            </h2>
            <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <CodeBlock fileName="about.js" delay={0.2}>
                <div>
                  <span className="code-keyword">const</span> <span className="code-function">aboutMe</span> <span>=</span> {`{`}
                  <div className="ml-4">
                    <span className="code-property">name</span>: <span className="code-string">'Osama Hashmi'</span>,
                    <div><span className="code-property">title</span>: <span className="code-string">'Full Stack Developer'</span>,</div>
                    <div><span className="code-property">focus</span>: <span className="code-string">'Building exceptional digital experiences'</span>,</div>
                    <div><span className="code-property">experience</span>: <span className="code-string">'5+ years'</span>,</div>
                    <div><span className="code-property">location</span>: <span className="code-string">'San Francisco, CA'</span>,</div>
                    <div><span className="code-property">interests</span>: [<span className="code-string">'Web Development'</span>, <span className="code-string">'UI/UX'</span>, <span className="code-string">'Open Source'</span>, <span className="code-string">'3D Graphics'</span>],</div>
                    <div>
                      <span className="code-property">bio</span>: <span className="code-function">function</span>() {`{`}
                      <div className="ml-4">
                        <span className="code-keyword">return</span> <span className="code-string">'Hello! I\'m Osama, a passionate Full Stack Developer with a love for creating interactive and efficient web applications. My journey in web development started back in 2015, and since then I\'ve worked with a range of technologies to deliver solutions that solve real-world problems.'</span>;
                      </div>
                      {`}`}
                    </div>
                  </div>
                  {`};`}
                </div>
              </CodeBlock>
              
              <CodeBlock fileName="philosophy.js" delay={0.4}>
                <div>
                  <span className="code-comment">// My Development Philosophy</span>
                  <div>
                    <span className="code-keyword">const</span> <span className="code-function">philosophy</span> <span>=</span> [
                    <div className="ml-4">
                      <div><span className="code-string">'Clean, maintainable code over quick fixes'</span>,</div>
                      <div><span className="code-string">'Performance and accessibility as core priorities'</span>,</div>
                      <div><span className="code-string">'User-centered design and development'</span>,</div>
                      <div><span className="code-string">'Continuous learning and adaptation'</span></div>
                    </div>
                    ];
                  </div>
                </div>
              </CodeBlock>
            </div>
            
            <motion.div 
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative max-w-md">
                <img 
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700&q=80" 
                  alt="Osama Hashmi - Full Stack Developer" 
                  className="rounded-lg shadow-xl relative z-10 object-cover h-[500px]"
                />
                <div className="absolute -bottom-4 -right-4 border-2 border-[#64ffda] rounded-lg w-full h-full"></div>
                
                {/* Tech tags overlay */}
                <div className="absolute top-4 left-4 space-y-2">
                  <div className="bg-[#0a192f]/80 backdrop-blur-sm text-[#64ffda] px-3 py-1 rounded-full text-sm inline-block">
                    #javascript
                  </div>
                  <div className="bg-[#0a192f]/80 backdrop-blur-sm text-[#8b5cf6] px-3 py-1 rounded-full text-sm inline-block">
                    #react
                  </div>
                  <div className="bg-[#0a192f]/80 backdrop-blur-sm text-[#64ffda] px-3 py-1 rounded-full text-sm inline-block">
                    #node.js
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="py-20 bg-[#0a192f]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-[#64ffda]">02.</span> Experience
            </h2>
            <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
            <p className="text-center text-[#e6f1ff]/70 max-w-2xl mx-auto">
              My professional journey in the tech world.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#64ffda]/50 to-[#8b5cf6]/50"></div>
            
            {/* Experience Timeline Items */}
            {[
              {
                company: "TechVision Inc.",
                title: "Senior Full Stack Developer",
                period: "2021 - Present",
                description: "Leading the development of enterprise web applications using React, Node.js, and PostgreSQL. Implementing CI/CD pipelines and mentoring junior developers.",
                technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
                highlight: "Reduced API response time by 40% through optimization"
              },
              {
                company: "InnovateSoft",
                title: "Full Stack Developer",
                period: "2019 - 2021",
                description: "Developed and maintained multiple client websites and web applications. Collaborated with design team to implement responsive and accessible interfaces.",
                technologies: ["JavaScript", "React", "Express", "MongoDB", "AWS"],
                highlight: "Built a real-time analytics dashboard that increased client retention by 25%"
              },
              {
                company: "WebCraft Solutions",
                title: "Frontend Developer",
                period: "2017 - 2019",
                description: "Created responsive UIs for web applications and integrated with backend APIs. Worked directly with clients to gather requirements and implement solutions.",
                technologies: ["JavaScript", "HTML/CSS", "React", "Redux", "SASS"],
                highlight: "Implemented UI redesign that improved user engagement by 30%"
              }
            ].map((exp, index) => (
              <motion.div 
                key={index}
                className={`relative z-10 flex mb-12 ${index % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'} items-center`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-[#64ffda] border-4 border-[#0a192f] shadow-glow"></div>
                
                {/* Timeline content */}
                <div 
                  className={`w-full md:w-5/12 p-6 bg-[#1E1E2A] rounded-lg border border-[#64ffda]/20
                   hover:shadow-[0_10px_40px_-15px_rgba(100,255,218,0.2)] transition-all duration-300
                   ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}
                >
                  <div className="flex flex-col h-full">
                    <div className="font-mono text-xs text-[#8b5cf6] mb-1">// {exp.period}</div>
                    <h3 className="text-xl font-bold gradient-text mb-1">{exp.company}</h3>
                    <div className="text-[#64ffda] font-medium mb-3">{exp.title}</div>
                    <p className="text-[#e6f1ff]/70 text-sm mb-4">{exp.description}</p>
                    
                    {/* Key Achievement */}
                    <div className="mb-4 p-3 bg-[#8b5cf6]/10 border-l-2 border-[#8b5cf6] rounded">
                      <div className="text-xs text-[#64ffda] font-mono mb-1">{"// Key Achievement:"}</div>
                      <div className="text-[#e6f1ff]/90 text-sm italic">{exp.highlight}</div>
                    </div>
                    
                    {/* Technologies */}
                    <div className="mt-auto">
                      <div className="text-xs text-[#64ffda] font-mono mb-2">{"// Technologies:"}</div>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="text-xs px-2 py-1 bg-[#0a192f] text-[#e6f1ff]/80 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Skills Section - Code-themed */}
      <section id="skills" className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-[#64ffda]">02.</span> Skills
            </h2>
            <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend Skills */}
            <motion.div 
              className="bg-[#1E1E2A] rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-center mb-6">
                <Layers className="text-[#64ffda] w-8 h-8" />
                <h3 className="text-xl font-semibold ml-4">Frontend</h3>
              </div>
              
              <div className="space-y-5">
                {[
                  { name: "React.js", percentage: 95 },
                  { name: "JavaScript (ES6+)", percentage: 90 },
                  { name: "Three.js", percentage: 85 },
                  { name: "HTML5 & CSS3", percentage: 95 },
                  { name: "Tailwind CSS", percentage: 90 },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span>{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-sm bg-[rgba(100,255,218,0.2)] overflow-hidden">
                      <motion.div 
                        className="h-full rounded-sm bg-gradient-to-r from-[#64ffda] to-[#8b5cf6]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Backend Skills */}
            <motion.div 
              className="bg-[#1E1E2A] rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-center mb-6">
                <Database className="text-[#64ffda] w-8 h-8" />
                <h3 className="text-xl font-semibold ml-4">Backend</h3>
              </div>
              
              <div className="space-y-5">
                {[
                  { name: "Node.js", percentage: 90 },
                  { name: "Express.js", percentage: 85 },
                  { name: "MongoDB", percentage: 80 },
                  { name: "SQL (PostgreSQL)", percentage: 75 },
                  { name: "RESTful APIs", percentage: 90 },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span>{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-sm bg-[rgba(100,255,218,0.2)] overflow-hidden">
                      <motion.div 
                        className="h-full rounded-sm bg-gradient-to-r from-[#64ffda] to-[#8b5cf6]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Other Skills */}
            <motion.div 
              className="bg-[#1E1E2A] rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-center mb-6">
                <Code className="text-[#64ffda] w-8 h-8" />
                <h3 className="text-xl font-semibold ml-4">Tools & Others</h3>
              </div>
              
              <div className="space-y-5">
                {[
                  { name: "Git & GitHub", percentage: 90 },
                  { name: "Docker", percentage: 70 },
                  { name: "CI/CD", percentage: 75 },
                  { name: "Responsive Design", percentage: 95 },
                  { name: "Figma & UI/UX", percentage: 80 },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span>{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-sm bg-[rgba(100,255,218,0.2)] overflow-hidden">
                      <motion.div 
                        className="h-full rounded-sm bg-gradient-to-r from-[#64ffda] to-[#8b5cf6]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-[#121212] to-[#0a192f]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-[#64ffda]">03.</span> Projects
            </h2>
            <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
            <p className="text-center text-[#e6f1ff]/70 max-w-2xl mx-auto">
              Here's a selection of my recent projects. Each one showcases different skills and technologies.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard 
              title="3D Interactive Dashboard"
              description="A data visualization dashboard with interactive 3D elements built using Three.js and React. Features real-time data updates and custom animations."
              tags={["React", "Three.js", "WebGL", "D3.js"]}
              image="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80"
              link="https://example.com/dashboard"
              githubLink="https://github.com/example/dashboard"
              delay={0.1}
            />
            
            <ProjectCard 
              title="E-Commerce Platform"
              description="A full-stack e-commerce solution with product management, cart functionality, user authentication, and payment integration using Stripe."
              tags={["React", "Node.js", "MongoDB", "Stripe API"]}
              image="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80"
              link="https://example.com/ecommerce"
              githubLink="https://github.com/example/ecommerce"
              delay={0.2}
            />
            
            <ProjectCard 
              title="3D Product Configurator"
              description="An interactive tool allowing users to customize products in 3D space, change colors, materials, and view from different angles."
              tags={["Three.js", "React", "WebGL", "GLSL"]}
              image="https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80"
              link="https://example.com/configurator"
              githubLink="https://github.com/example/configurator"
              delay={0.3}
            />
            
            <ProjectCard 
              title="Social Media Platform"
              description="A full-stack social platform with real-time chat, post creation, user profiles, and notification system using Socket.io."
              tags={["React", "Node.js", "Socket.io", "MongoDB"]}
              image="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80"
              link="https://example.com/social"
              githubLink="https://github.com/example/social"
              delay={0.4}
            />
            
            <ProjectCard 
              title="REST API Service"
              description="A scalable RESTful API service with authentication, rate limiting, and comprehensive documentation using Swagger."
              tags={["Node.js", "Express", "JWT", "Swagger"]}
              image="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80"
              githubLink="https://github.com/example/api"
              delay={0.5}
            />
            
            <ProjectCard 
              title="3D Portfolio Website"
              description="An immersive portfolio website with interactive 3D elements, custom shaders, and animations built with Three.js and React."
              tags={["Three.js", "React", "GLSL", "Framer Motion"]}
              image="https://images.pixabay.com/photo/2017/08/10/08/47/code-2620118_1280.jpg"
              link="https://example.com/portfolio"
              githubLink="https://github.com/example/portfolio"
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#121212] relative overflow-hidden">
        {/* Background code pattern */}
        <div className="absolute inset-0 opacity-5 z-0 text-[8px] font-mono overflow-hidden text-[#64ffda] leading-tight">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i}>
              {`{ "name": "contact", "email": "<email>", "subject": "<subject>", "message": "<message>", "timestamp": "${new Date().toISOString()}" }`}
            </div>
          ))}
        </div>
      
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-[#64ffda]">04.</span> Contact
            </h2>
            <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
            <p className="text-center text-[#e6f1ff]/70 max-w-2xl mx-auto">
              Let's connect! I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {/* Terminal-inspired contact form */}
            <motion.div
              className="bg-[#0a192f] rounded-lg overflow-hidden border border-[#64ffda]/30 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Terminal header */}
              <div className="bg-[#1E1E2A] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-mono text-[#e6f1ff]/70">contact@osamahashmi.dev:~</div>
                </div>
                <div className="text-xs text-[#e6f1ff]/50 font-mono">Connected</div>
              </div>
              
              {/* Terminal content */}
              <div className="p-6 bg-[#0a192f]/90 backdrop-blur-md">
                <div className="font-mono text-sm text-[#e6f1ff] mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-[#8b5cf6]">$</span>
                    <span className="typing-animation w-full">echo "Hello! Send me a message and I'll get back to you soon."</span>
                  </div>
                  <div className="text-[#64ffda] ml-4">Hello! Send me a message and I'll get back to you soon.</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-[#8b5cf6]">$</span>
                    <span>contact --new</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact form */}
                  <motion.form
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-[#8b5cf6] font-mono text-sm">const</span>
                        <label htmlFor="name" className="ml-2 text-[#64ffda] font-mono text-sm">name</label>
                        <span className="text-[#e6f1ff] font-mono text-sm ml-2">=</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 bg-[#1E1E2A]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors pl-6"
                          placeholder="Your Name"
                        />
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">"</span>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">";</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-[#8b5cf6] font-mono text-sm">const</span>
                        <label htmlFor="email" className="ml-2 text-[#64ffda] font-mono text-sm">email</label>
                        <span className="text-[#e6f1ff] font-mono text-sm ml-2">=</span>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 bg-[#1E1E2A]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors pl-6"
                          placeholder="your@email.com"
                        />
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">"</span>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">";</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-[#8b5cf6] font-mono text-sm">const</span>
                        <label htmlFor="subject" className="ml-2 text-[#64ffda] font-mono text-sm">subject</label>
                        <span className="text-[#e6f1ff] font-mono text-sm ml-2">=</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          id="subject"
                          className="w-full px-4 py-3 bg-[#1E1E2A]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors pl-6"
                          placeholder="Subject"
                        />
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">"</span>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#8b5cf6] font-mono">";</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-[#8b5cf6] font-mono text-sm">const</span>
                        <label htmlFor="message" className="ml-2 text-[#64ffda] font-mono text-sm">message</label>
                        <span className="text-[#e6f1ff] font-mono text-sm ml-2">=</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-2 top-3 text-[#8b5cf6] font-mono">`</span>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-3 bg-[#1E1E2A]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors pl-6 pr-6"
                          placeholder="Your message..."
                        ></textarea>
                        <span className="absolute right-2 bottom-3 text-[#8b5cf6] font-mono">`;</span>
                      </div>
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="w-full mt-6 px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-mono rounded-md 
                      hover:bg-[#64ffda]/10 transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-[#8b5cf6]/20 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                      <span className="relative z-10">sendMessage()</span>
                    </motion.button>
                  </motion.form>
                  
                  {/* Contact details with terminal-style output */}
                  <motion.div 
                    className="font-mono text-sm space-y-4 border-t md:border-t-0 md:border-l border-[#64ffda]/20 pt-6 md:pt-0 md:pl-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-[#8b5cf6]">$</span>
                        <span>cat contact-info.json</span>
                      </div>
                      <div className="bg-[#1E1E2A]/50 p-4 rounded-md">
                        <pre className="text-xs overflow-x-auto">
{`{
  "email": "contact@osamahashmi.dev",
  "location": "San Francisco, CA",
  "availability": "Open to opportunities",
  "response_time": "Within 24 hours",
  "social": {
    "github": "github.com/osamahashmi",
    "linkedin": "linkedin.com/in/osamahashmi",
    "twitter": "twitter.com/osamahashmi"
  }
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-[#8b5cf6]">$</span>
                        <span>ls -la social/</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <motion.a 
                          href="https://github.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-[#1E1E2A]/50 rounded-md hover:bg-[#1E1E2A] transition-colors text-[#e6f1ff]/80 hover:text-[#64ffda]"
                          whileHover={{ x: 3 }}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          <span className="text-xs">GitHub</span>
                        </motion.a>
                        
                        <motion.a 
                          href="https://linkedin.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-[#1E1E2A]/50 rounded-md hover:bg-[#1E1E2A] transition-colors text-[#e6f1ff]/80 hover:text-[#64ffda]"
                          whileHover={{ x: 3 }}
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          <span className="text-xs">LinkedIn</span>
                        </motion.a>
                        
                        <motion.a 
                          href="https://twitter.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-[#1E1E2A]/50 rounded-md hover:bg-[#1E1E2A] transition-colors text-[#e6f1ff]/80 hover:text-[#64ffda]"
                          whileHover={{ x: 3 }}
                        >
                          <Twitter className="w-4 h-4 mr-2" />
                          <span className="text-xs">Twitter</span>
                        </motion.a>
                        
                        <motion.a 
                          href="mailto:contact@osamahashmi.dev"
                          className="flex items-center px-3 py-2 bg-[#1E1E2A]/50 rounded-md hover:bg-[#1E1E2A] transition-colors text-[#e6f1ff]/80 hover:text-[#64ffda]"
                          whileHover={{ x: 3 }}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="text-xs">Email</span>
                        </motion.a>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-[#8b5cf6]">$</span>
                        <span>uptime</span>
                      </div>
                      <div className="bg-[#1E1E2A]/50 p-3 rounded-md text-xs">
                        <p>Available for freelance work and open to job opportunities</p>
                        <p className="mt-2 text-[#64ffda]">Ready to collaborate on your next project!</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Terminal footer */}
              <div className="bg-[#1E1E2A] px-4 py-2 text-xs text-[#e6f1ff]/50 flex justify-between items-center">
                <span>status: ready</span>
                <motion.span 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  waiting for input...
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-[#0a192f] border-t border-[#1E1E2A]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#e6f1ff]/60 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Osama Hashmi. All rights reserved.
            </div>
            <div className="text-[#e6f1ff]/60 font-mono text-sm">
              <span className="code-comment">// Built with React & ❤️</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
