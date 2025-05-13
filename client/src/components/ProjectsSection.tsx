
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { projectsData } from "@/data/projectsData";
import { Github, ExternalLink, ChevronRight } from "lucide-react";
import useScrollReveal from "@/lib/useScrollReveal";
import { useTheme } from "@/hooks/use-theme";

type CategoryType = "All" | "React" | "Three.js" | "Full Stack" | "Backend";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { ref, controls } = useScrollReveal();

  const filteredProjects = selectedCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.categories.includes(selectedCategory as any));

  const categories: CategoryType[] = ["All", "React", "Three.js", "Full Stack", "Backend"];

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="circuit-pattern absolute inset-0 opacity-5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <span className="font-mono text-[hsl(var(--portfolio-secondary))] mr-4">03.</span>
            <span className="relative">
              My Projects
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[hsl(var(--portfolio-secondary))] to-[hsl(var(--portfolio-accent))]"></span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-[hsl(var(--portfolio-light))/80]">
            A showcase of my recent work, from interactive 3D experiences to full-stack applications. 
            Each project reflects my passion for creating engaging and intuitive digital solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? `bg-[hsl(var(--portfolio-secondary))] text-[hsl(var(--portfolio-dark))] shadow-lg shadow-[hsl(var(--portfolio-secondary))]/20`
                  : `bg-[hsl(var(--portfolio-dark-light))] text-[hsl(var(--portfolio-light))] hover:bg-[hsl(var(--portfolio-secondary))]/20`
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          ref={containerRef}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group perspective-1000"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
            >
              <div className="relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 backface-hidden h-full bg-[hsl(var(--portfolio-dark-light))]">
                {/* Project Image with Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--portfolio-primary))] to-transparent opacity-70"></div>
                  
                  {/* Category badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {project.categories.map((category) => (
                      <span 
                        key={category} 
                        className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--portfolio-secondary))]/80 text-[hsl(var(--portfolio-dark))] backdrop-blur-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[hsl(var(--portfolio-light))]">{project.title}</h3>
                  <p className="text-sm text-[hsl(var(--portfolio-light))]/75 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Links */}
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-[hsl(var(--portfolio-light))]/10">
                    <div className="flex space-x-3">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[hsl(var(--portfolio-light))]/70 hover:text-[hsl(var(--portfolio-secondary))] transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[hsl(var(--portfolio-light))]/70 hover:text-[hsl(var(--portfolio-secondary))] transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                    
                    <div className="relative overflow-hidden group">
                      <a 
                        href={project.liveLink || project.githubLink || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-[hsl(var(--portfolio-secondary))] group-hover:translate-x-1 transition-transform"
                      >
                        View Details <ChevronRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--portfolio-secondary))] to-[hsl(var(--portfolio-accent))] rounded-xl opacity-0 group-hover:opacity-30 blur group-hover:blur-md transition-all duration-500 -z-10"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show more button */}
        <div className="flex justify-center mt-12">
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all rounded-md bg-[hsl(var(--portfolio-dark-light))] hover:bg-[hsl(var(--portfolio-secondary))]/10 border border-[hsl(var(--portfolio-secondary))] text-[hsl(var(--portfolio-secondary))]"
          >
            <span className="relative">View More Projects <Github className="inline-block ml-2" size={16} /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
