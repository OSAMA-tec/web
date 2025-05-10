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

// Interactive project card with developer theme
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
  return (
    <motion.div 
      className="bg-[#1E1E2A] rounded-lg overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E2A] to-transparent"></div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 gradient-text">{title}</h3>
        <p className="text-[#e6f1ff]/70 text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-[#64ffda]/10 text-[#64ffda]"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {githubLink && (
              <a 
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e6f1ff]/60 hover:text-[#64ffda] transition-colors"
                aria-label="View GitHub repository"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {link && (
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e6f1ff]/60 hover:text-[#64ffda] transition-colors"
                aria-label="View live project"
              >
                <Eye className="w-5 h-5" />
              </a>
            )}
          </div>
          
          <div className="text-xs text-[#e6f1ff]/40 font-mono">// explore</div>
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
      <section id="contact" className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div 
              className="bg-[#1E1E2A] rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Get In Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#64ffda]/20 p-3 rounded-lg mr-4">
                    <Mail className="text-[#64ffda] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Email</h4>
                    <a 
                      href="mailto:contact@osamahashmi.dev" 
                      className="text-[#e6f1ff]/70 hover:text-[#64ffda] transition-colors"
                    >
                      contact@osamahashmi.dev
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#64ffda]/20 p-3 rounded-lg mr-4">
                    <Github className="text-[#64ffda] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">GitHub</h4>
                    <a 
                      href="https://github.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e6f1ff]/70 hover:text-[#64ffda] transition-colors"
                    >
                      github.com/osamahashmi
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#64ffda]/20 p-3 rounded-lg mr-4">
                    <Linkedin className="text-[#64ffda] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">LinkedIn</h4>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e6f1ff]/70 hover:text-[#64ffda] transition-colors"
                    >
                      linkedin.com/in/osamahashmi
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#64ffda]/20 p-3 rounded-lg mr-4">
                    <Twitter className="text-[#64ffda] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Twitter</h4>
                    <a 
                      href="https://twitter.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e6f1ff]/70 hover:text-[#64ffda] transition-colors"
                    >
                      twitter.com/osamahashmi
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.form
              className="bg-[#1E1E2A] rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Send Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[#e6f1ff]/80 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-[#0a192f]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[#e6f1ff]/80 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-[#0a192f]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-[#e6f1ff]/80 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-[#0a192f]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors"
                    placeholder="Subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[#e6f1ff]/80 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-[#0a192f]/50 text-[#e6f1ff] border border-[#1E1E2A] rounded-md focus:outline-none focus:border-[#64ffda] transition-colors"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#64ffda] text-[#0a192f] font-medium rounded-md hover:bg-[#64ffda]/90 transition-colors duration-300 flex items-center justify-center"
                >
                  Send Message
                </button>
              </div>
            </motion.form>
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
