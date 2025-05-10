import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Eye, Github, Linkedin, Twitter, Mail } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import SkillsSection from "../components/SkillsSection";

// Main Home component
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initial loading animation
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a192f] flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-3xl font-mono mb-4 text-[#64ffda]">
            <span className="inline-block typing-animation">
              Loading Portfolio...
            </span>
          </div>
          <div className="w-64 h-2 bg-[#1E1E2A] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#64ffda] to-[#8b5cf6] loading-bar"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-[#0a192f] text-[#e6f1ff] min-h-screen">
      {/* Theme selector */}
      <ThemeToggle />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-[#64ffda] font-mono mb-4">
                <span className="typing-animation">Hi, my name is</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-5xl sm:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="gradient-text">Osama Hashmi.</span>
            </motion.h1>
            
            <motion.h2
              className="text-4xl sm:text-6xl font-bold text-[#e6f1ff]/70 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I build things for the web.
            </motion.h2>
            
            <motion.p
              className="text-[#e6f1ff]/70 text-lg max-w-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I'm a full-stack developer specializing in building exceptional digital experiences.
              Currently, I'm focused on creating accessible, responsive web applications 
              with modern JavaScript frameworks and interactive 3D elements.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="#projects" 
                className="border border-[#64ffda] text-[#64ffda] px-8 py-4 rounded-md 
                hover:bg-[#64ffda]/10 transition-colors duration-300 inline-block
                font-mono"
              >
                Check out my work!
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-[#0a192f]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-[#1E1E2A] p-6 rounded-lg shadow-lg border border-[#64ffda]/10">
                <div className="mb-4 font-mono text-[#64ffda]">// about-me.js</div>
                <pre className="text-[#e6f1ff]/90 overflow-x-auto">
                  <code>
{`const aboutMe = {
  name: "Osama Hashmi",
  title: "Full Stack Developer",
  location: "San Francisco, CA",
  education: "Computer Science, MIT",
  interests: [
    "Web Development",
    "3D Graphics",
    "UI/UX Design",
    "Open Source"
  ],
  currentFocus: "Building interactive web experiences"
};

// More than just a developer
function getExperience() {
  return {
    years: 5,
    technologies: [
      "JavaScript/TypeScript",
      "React.js", "Node.js",
      "Three.js", "MongoDB",
      "AWS", "Docker"
    ]
  };
}`}
                  </code>
                </pre>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="text-[#e6f1ff]/70 mb-6">
                Hello! My name is Osama and I enjoy creating things that live on the internet. 
                My interest in web development started back in 2015 when I decided to try editing 
                custom Tumblr themes — turns out hacking together a custom reblog button taught me 
                a lot about HTML & CSS!
              </p>
              
              <p className="text-[#e6f1ff]/70 mb-6">
                Fast-forward to today, and I've had the privilege of working at an advertising agency, 
                a start-up, a huge corporation, and a student-led design studio. My main focus these days 
                is building accessible, inclusive products and digital experiences at Upstatement for a 
                variety of clients.
              </p>
              
              <p className="text-[#e6f1ff]/70 mb-6">
                Here are a few technologies I've been working with recently:
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {["JavaScript (ES6+)", "TypeScript", "React", "Node.js", "Three.js", "MongoDB"].map((tech, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-[#64ffda] mr-2">▹</span>
                    <span className="text-[#e6f1ff]/70">{tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-[#64ffda]">02.</span> Projects
            </h2>
            <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
            <p className="text-center text-[#e6f1ff]/70 max-w-2xl mx-auto">
              A selection of my recent work. Each project reflects my commitment to clean code, 
              intuitive user experiences, and modern design principles.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Interactive Portfolio",
                description: "A 3D interactive portfolio website built using Three.js and React with animated UI elements and custom shaders.",
                tags: ["React", "Three.js", "WebGL"],
                image: "https://via.placeholder.com/640x360/0a192f/64ffda",
                link: "https://example.com",
                githubLink: "https://github.com"
              },
              {
                title: "E-commerce Platform",
                description: "A fully functional e-commerce platform with payment processing, inventory management, and a responsive admin dashboard.",
                tags: ["React", "Node.js", "MongoDB"],
                image: "https://via.placeholder.com/640x360/0a192f/64ffda",
                link: "https://example.com",
                githubLink: "https://github.com"
              },
              {
                title: "Real-time Chat App",
                description: "A real-time messaging application with end-to-end encryption, file sharing, and responsive design for all devices.",
                tags: ["WebSockets", "React", "Express"],
                image: "https://via.placeholder.com/640x360/0a192f/64ffda",
                link: "https://example.com",
                githubLink: "https://github.com"
              },
              {
                title: "Task Management Tool",
                description: "A drag-and-drop task management tool with team collaboration features, notifications and progress tracking.",
                tags: ["TypeScript", "React", "Redux"],
                image: "https://via.placeholder.com/640x360/0a192f/64ffda",
                link: "https://example.com",
                githubLink: "https://github.com"
              },
              {
                title: "Weather Dashboard",
                description: "A weather visualization dashboard with interactive maps, historical data comparison and custom alerts.",
                tags: ["D3.js", "React", "APIs"],
                image: "https://via.placeholder.com/640x360/0a192f/64ffda",
                link: "https://example.com",
                githubLink: "https://github.com"
              },
              {
                title: "Music Streaming Service",
                description: "A music streaming platform with recommendation engine, playlist management and social sharing features.",
                tags: ["React", "Node.js", "MongoDB"],
                image: "https://via.placeholder.com/640x360/0a192f/64ffda",
                link: "https://example.com",
                githubLink: "https://github.com"
              }
            ].map((project, index) => (
              <motion.div 
                key={index}
                className="relative group perspective-1000"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                {/* Terminal-like header */}
                <div className="absolute -top-5 left-0 right-0 bg-[#0a192f] rounded-t-lg border-t border-l border-r border-[#64ffda]/30 px-3 py-1 z-20 flex items-center">
                  <div className="flex space-x-1.5 mr-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-[#e6f1ff]/70 font-mono overflow-hidden whitespace-nowrap">
                    ~/{project.title.toLowerCase().replace(/\s/g, '-')}
                  </div>
                </div>
                
                <div className="bg-[#1E1E2A] rounded-lg overflow-hidden shadow-xl border border-[#64ffda]/30 transform transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E2A] to-transparent"></div>
                    
                    {/* Tag pills positioned at the top right */}
                    <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-2 max-w-[70%]">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span 
                          key={tagIndex}
                          className="text-xs px-2 py-1 rounded-full bg-[#0a192f]/80 backdrop-blur-sm text-[#64ffda] border border-[#64ffda]/30"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + (tagIndex * 0.1) }}
                        >
                          #{tag.toLowerCase().replace(/\s|\./g, '')}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Title with code-like syntax */}
                    <div className="font-mono text-xs text-[#8b5cf6] mb-2">const projectName = </div>
                    <h3 className="text-xl font-bold mb-3 gradient-text">{project.title};</h3>
                    
                    {/* Description */}
                    <div className="h-16 mb-6 overflow-hidden">
                      <p className="text-[#e6f1ff]/70 text-sm">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="font-mono text-xs text-[#8b5cf6] mb-2">{"// Links"}</div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        {project.githubLink && (
                          <a 
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e6f1ff] p-2 bg-[#0a192f] rounded-full hover:bg-[#64ffda]/20 transition-colors"
                            aria-label="View GitHub repository"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.link && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e6f1ff] p-2 bg-[#0a192f] rounded-full hover:bg-[#64ffda]/20 transition-colors"
                            aria-label="View live project"
                          >
                            <Eye className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      
                      <button 
                        className="px-3 py-1.5 border border-[#64ffda] text-[#64ffda] text-sm rounded-md 
                        font-mono hover:bg-[#64ffda]/10 transition-colors flex items-center gap-1"
                      >
                        <span className="text-[#8b5cf6]">{">"}</span> view_details()
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Skills Section using the component */}
      <SkillsSection />
      
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
      <footer className="bg-[#0a192f] text-[#e6f1ff]/50 text-center py-6 text-sm">
        <p className="mb-2">Designed & Built by Osama Hashmi</p>
        <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
      </footer>
    </div>
  );
}