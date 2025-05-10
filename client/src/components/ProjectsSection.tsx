import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projectsData } from "@/data/projectsData";

type ProjectCategory = "All" | "React" | "Three.js" | "Full Stack" | "Backend";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  const filterCategories: ProjectCategory[] = ["All", "React", "Three.js", "Full Stack", "Backend"];
  
  const filteredProjects = activeFilter === "All" 
    ? projectsData 
    : projectsData.filter(project => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-[#121212] to-[#0a192f]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold font-poppins mb-2 text-center">
            <span className="text-[#64ffda]">03.</span> Projects
          </h2>
          <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-6 mx-auto"></div>
          <p className="text-center text-[#e6f1ff]/70 max-w-2xl mx-auto mb-12">
            Here are some of my recent projects that showcase my skills and problem-solving abilities. Each project represents unique challenges that I've overcome.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {filterCategories.map((category, index) => (
              <button 
                key={index}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeFilter === category 
                    ? "bg-[#64ffda] text-[#0a192f]"
                    : "bg-[#1E1E2A] hover:bg-[#64ffda] hover:text-[#0a192f] text-[#e6f1ff]"
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={index}
              className="project-card card-hover bg-[#1E1E2A] rounded-lg overflow-hidden shadow-lg"
              variants={childVariants}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
                <div className="absolute top-2 right-2 flex space-x-2">
                  {project.categories.map((category, catIndex) => (
                    <span 
                      key={catIndex}
                      className={`px-2 py-1 text-xs rounded-full ${
                        category === "Three.js" 
                          ? "bg-[#64ffda] text-[#0a192f]" 
                          : "bg-[#8b5cf6]/80 text-[#e6f1ff]"
                      }`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-semibold font-poppins mb-2">{project.title}</h3>
                <p className="text-[#e6f1ff]/70 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {project.liveLink && (
                      <a 
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#64ffda] hover:text-[#8b5cf6] transition-colors"
                        aria-label="View live project"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#64ffda] hover:text-[#8b5cf6] transition-colors"
                        aria-label="View GitHub repository"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <button className="px-3 py-1 border border-[#64ffda] text-[#64ffda] text-sm rounded hover:bg-[#64ffda]/10 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a 
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border-2 border-[#64ffda] text-[#64ffda] font-medium rounded-md hover:bg-[#64ffda]/10 transition-colors duration-300"
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
