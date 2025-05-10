import { motion } from 'framer-motion';
import { 
  Code, Database, Settings, Check, GitBranch, Cloud, PenTool, 
  Package, Terminal, Server, GitMerge, FolderOpen, FileCode
} from 'lucide-react';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-[#0a192f] relative overflow-hidden">
      {/* Background matrix effect */}
      <div className="absolute inset-0 opacity-10 z-0 text-[10px] font-mono overflow-hidden text-[#64ffda]">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {Array.from({ length: 50 }).map((_, j) => (
              <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
            ))}
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
            <span className="text-[#64ffda]">03.</span> Skills
          </h2>
          <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-2 mx-auto"></div>
          <p className="text-center text-[#e6f1ff]/70 max-w-2xl mx-auto">
            My technical toolkit and proficiency levels. Hover over skills for more details.
          </p>
        </motion.div>
        
        {/* IDE-inspired skills container */}
        <motion.div 
          className="bg-[#1E1E2A] rounded-lg overflow-hidden border border-[#64ffda]/30 shadow-2xl relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* IDE header with tabs */}
          <div className="bg-[#0a192f] border-b border-[#64ffda]/20 flex items-center">
            <div className="flex space-x-2 px-4 py-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            <div className="flex px-2 text-sm overflow-x-auto">
              {['Frontend.js', 'Backend.py', 'DevOps.sh', 'Other.config'].map((tab, index) => (
                <div 
                  key={index} 
                  className={`px-4 py-2 border-r border-[#64ffda]/20 flex items-center space-x-2 cursor-pointer whitespace-nowrap
                  ${index === 0 ? 'bg-[#1E1E2A] text-[#e6f1ff]' : 'bg-[#0a192f] text-[#e6f1ff]/50 hover:text-[#e6f1ff]/80'}`}
                >
                  <span>{tab}</span>
                  {index === 0 && <span className="w-2 h-2 rounded-full bg-[#64ffda]"></span>}
                </div>
              ))}
            </div>
          </div>
          
          {/* IDE sidebar with file explorer */}
          <div className="flex">
            <div className="w-48 border-r border-[#64ffda]/20 p-3 bg-[#151b29] hidden md:block">
              <div className="text-xs font-mono text-[#e6f1ff]/70 mb-2">EXPLORER</div>
              
              <div className="space-y-1">
                <div className="flex items-center text-[#e6f1ff]/90 py-1 px-2 rounded cursor-pointer bg-[#64ffda]/10">
                  <FolderOpen size={16} className="mr-2 text-[#64ffda]" />
                  <span className="text-sm">Skills</span>
                </div>
                
                <div className="ml-4 space-y-1">
                  <div className="flex items-center text-[#e6f1ff]/70 hover:text-[#e6f1ff] py-1 px-2 rounded hover:bg-[#1E1E2A] cursor-pointer">
                    <FileCode size={14} className="mr-2 text-[#8b5cf6]" />
                    <span className="text-xs">Frontend.js</span>
                  </div>
                  <div className="flex items-center text-[#e6f1ff]/50 hover:text-[#e6f1ff] py-1 px-2 rounded hover:bg-[#1E1E2A] cursor-pointer">
                    <FileCode size={14} className="mr-2 text-[#8b5cf6]" />
                    <span className="text-xs">Backend.py</span>
                  </div>
                  <div className="flex items-center text-[#e6f1ff]/50 hover:text-[#e6f1ff] py-1 px-2 rounded hover:bg-[#1E1E2A] cursor-pointer">
                    <FileCode size={14} className="mr-2 text-[#8b5cf6]" />
                    <span className="text-xs">DevOps.sh</span>
                  </div>
                  <div className="flex items-center text-[#e6f1ff]/50 hover:text-[#e6f1ff] py-1 px-2 rounded hover:bg-[#1E1E2A] cursor-pointer">
                    <FileCode size={14} className="mr-2 text-[#8b5cf6]" />
                    <span className="text-xs">Other.config</span>
                  </div>
                </div>
                
                <div className="flex items-center text-[#e6f1ff]/70 py-1 px-2 rounded cursor-pointer hover:bg-[#1E1E2A]">
                  <FolderOpen size={16} className="mr-2 text-[#64ffda]" />
                  <span className="text-sm">Projects</span>
                </div>
                
                <div className="flex items-center text-[#e6f1ff]/70 py-1 px-2 rounded cursor-pointer hover:bg-[#1E1E2A]">
                  <FolderOpen size={16} className="mr-2 text-[#64ffda]" />
                  <span className="text-sm">Experience</span>
                </div>
              </div>
            </div>
            
            {/* IDE main content - skill code editor */}
            <div className="flex-1 p-6 pb-12">
              {/* Line numbers */}
              <div className="flex text-sm font-mono">
                <div className="w-8 text-right pr-3 select-none text-[#e6f1ff]/30 space-y-1.5">
                  {Array.from({ length: 21 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                
                {/* Code content */}
                <div className="flex-1 space-y-1.5">
                  <div className="text-[#8b5cf6]">&#47;&#47; Frontend Development Skills</div>
                  <div className="text-[#e6f1ff]/70">const <span className="text-[#64ffda]">frontendSkills</span> = {`{`}</div>
                  
                  {/* Frontend skills */}
                  {[
                    { name: "React.js", level: 95, desc: "Building complex interactive UIs" },
                    { name: "JavaScript (ES6+)", level: 90, desc: "Modern JS features and patterns" },
                    { name: "TypeScript", level: 85, desc: "Type-safe development" },
                    { name: "Three.js/WebGL", level: 80, desc: "3D visualizations and effects" },
                    { name: "Tailwind CSS", level: 90, desc: "Utility-first styling" },
                    { name: "Framer Motion", level: 85, desc: "Advanced animations" },
                  ].map((skill, index) => (
                    <motion.div 
                      key={index}
                      className="group relative"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center">
                        <span className="text-[#e6f1ff] whitespace-nowrap">  <span className="text-[#8b5cf6]">{skill.name}:</span> </span>
                        <div className="w-full ml-2 h-7 bg-[#0a192f]/50 rounded-sm overflow-hidden flex items-center px-1">
                          <motion.div 
                            className="h-3 rounded-sm bg-gradient-to-r from-[#64ffda]/80 to-[#8b5cf6]/80"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.2, delay: 0.2 * index }}
                            viewport={{ once: true }}
                          ></motion.div>
                          
                          <span className="ml-auto text-xs text-[#e6f1ff]/70 font-mono">{skill.level}%</span>
                        </div>
                      </div>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute left-0 bottom-full mb-2 transform -translate-x-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                        <div className="bg-[#0a192f] text-[#e6f1ff] text-xs p-2 rounded shadow-lg border border-[#64ffda]/30 w-48">
                          <div className="font-medium text-[#64ffda]">{skill.name}</div>
                          <div className="text-[#e6f1ff]/70">{skill.desc}</div>
                        </div>
                        <div className="w-3 h-3 bg-[#0a192f] border-r border-b border-[#64ffda]/30 transform rotate-45 absolute top-full -mt-1.5 left-1/4 ml-1"></div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="text-[#e6f1ff]/70">{`};`}</div>
                  <div className="mt-2"></div>
                  
                  <div className="text-[#8b5cf6]">&#47;&#47; Backend Development Skills</div>
                  <div className="text-[#e6f1ff]/70">const <span className="text-[#64ffda]">backendSkills</span> = {`{`}</div>
                  
                  {/* Backend skills */}
                  {[
                    { name: "Node.js", level: 90, desc: "Server-side JavaScript" },
                    { name: "Express.js", level: 85, desc: "REST API development" },
                    { name: "MongoDB", level: 80, desc: "NoSQL database design" },
                    { name: "PostgreSQL", level: 75, desc: "Relational database management" },
                    { name: "GraphQL", level: 70, desc: "API query language" },
                  ].map((skill, index) => (
                    <motion.div 
                      key={index}
                      className="group relative"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index + 0.7 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center">
                        <span className="text-[#e6f1ff] whitespace-nowrap">  <span className="text-[#8b5cf6]">{skill.name}:</span> </span>
                        <div className="w-full ml-2 h-7 bg-[#0a192f]/50 rounded-sm overflow-hidden flex items-center px-1">
                          <motion.div 
                            className="h-3 rounded-sm bg-gradient-to-r from-[#8b5cf6]/80 to-[#64ffda]/80"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.2, delay: 0.2 * index + 0.7 }}
                            viewport={{ once: true }}
                          ></motion.div>
                          
                          <span className="ml-auto text-xs text-[#e6f1ff]/70 font-mono">{skill.level}%</span>
                        </div>
                      </div>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute left-0 bottom-full mb-2 transform -translate-x-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                        <div className="bg-[#0a192f] text-[#e6f1ff] text-xs p-2 rounded shadow-lg border border-[#64ffda]/30 w-48">
                          <div className="font-medium text-[#64ffda]">{skill.name}</div>
                          <div className="text-[#e6f1ff]/70">{skill.desc}</div>
                        </div>
                        <div className="w-3 h-3 bg-[#0a192f] border-r border-b border-[#64ffda]/30 transform rotate-45 absolute top-full -mt-1.5 left-1/4 ml-1"></div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="text-[#e6f1ff]/70">{`};`}</div>
                </div>
              </div>
              
              {/* IDE status bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#0a192f] border-t border-[#64ffda]/20 py-1 px-4 text-xs text-[#e6f1ff]/50 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <Check size={14} className="text-[#64ffda] mr-1" />
                    <span>All skills up-to-date</span>
                  </div>
                  <div>Ln 21, Col 2</div>
                </div>
                <div className="flex items-center space-x-4">
                  <span>UTF-8</span>
                  <span>JavaScript</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Tool Badges */}
        <motion.div 
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center text-[#64ffda] text-lg mb-8 font-mono">
            {"// Tools & Technologies"}
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center">
            {[
              { name: "Git", icon: <GitBranch className="w-6 h-6" /> },
              { name: "Docker", icon: <Database className="w-6 h-6" /> },
              { name: "AWS", icon: <Cloud className="w-6 h-6" /> },
              { name: "GitHub", icon: <GitBranch className="w-6 h-6" /> },
              { name: "Figma", icon: <PenTool className="w-6 h-6" /> },
              { name: "VSCode", icon: <Code className="w-6 h-6" /> },
              { name: "Jest", icon: <Check className="w-6 h-6" /> },
              { name: "Webpack", icon: <Package className="w-6 h-6" /> },
              { name: "npm", icon: <Package className="w-6 h-6" /> },
              { name: "CI/CD", icon: <GitMerge className="w-6 h-6" /> },
              { name: "Linux", icon: <Terminal className="w-6 h-6" /> },
              { name: "Nginx", icon: <Server className="w-6 h-6" /> },
            ].map((tool, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center p-3 rounded-lg bg-[#1E1E2A] hover:bg-[#64ffda]/10 border border-[#64ffda]/20 hover:border-[#64ffda]/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(100, 255, 218, 0.1)' }}
              >
                <div className="text-[#64ffda] mb-2">
                  {tool.icon}
                </div>
                <div className="text-xs text-[#e6f1ff]/80">{tool.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}