
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Server, Cog } from "lucide-react";
import { useAnimateProgress } from "@/lib/useAnimateProgress";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: Skill[];
}

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const frontendSkills: Skill[] = [
    { name: "React.js", percentage: 95 },
    { name: "JavaScript (ES6+)", percentage: 90 },
    { name: "Three.js", percentage: 85 },
    { name: "HTML5 & CSS3", percentage: 95 },
    { name: "Tailwind CSS", percentage: 90 }
  ];
  
  const backendSkills: Skill[] = [
    { name: "Node.js", percentage: 90 },
    { name: "Express.js", percentage: 85 },
    { name: "MongoDB", percentage: 80 },
    { name: "SQL (PostgreSQL, MySQL)", percentage: 75 },
    { name: "RESTful APIs", percentage: 90 }
  ];
  
  const otherSkills: Skill[] = [
    { name: "Git & GitHub", percentage: 90 },
    { name: "Docker", percentage: 70 },
    { name: "CI/CD", percentage: 75 },
    { name: "Responsive Design", percentage: 95 },
    { name: "Figma & UI/UX", percentage: 80 }
  ];
  
  const skillCategories: SkillCategory[] = [
    {
      icon: <Code className="text-[#64ffda] w-8 h-8" />,
      title: "Frontend Development",
      skills: frontendSkills
    },
    {
      icon: <Server className="text-[#64ffda] w-8 h-8" />,
      title: "Backend Development",
      skills: backendSkills
    },
    {
      icon: <Cog className="text-[#64ffda] w-8 h-8" />,
      title: "Tools & Others",
      skills: otherSkills
    }
  ];
  
  useAnimateProgress(isInView);

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-[#0a192f] to-[#121212]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-poppins mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#64ffda] to-[#8b5cf6]">
            <span className="text-[#64ffda]">02.</span> Skills & Technologies
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-[#64ffda] to-[#8b5cf6] mb-8 mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="bg-[#1E1E2A]/80 backdrop-blur-sm rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#64ffda]/10 hover:border-[#64ffda]/30"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <div className="flex items-center mb-8">
                <div className="p-3 bg-[#64ffda]/10 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold font-poppins ml-4 text-[#e6f1ff]">{category.title}</h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex justify-between mb-3">
                      <span className="text-[#e6f1ff] group-hover:text-[#64ffda] transition-colors duration-300">{skill.name}</span>
                      <span className="text-[#8b5cf6]">{skill.percentage}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[#64ffda]/10 overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full bg-gradient-to-r from-[#64ffda] to-[#8b5cf6] group-hover:from-[#8b5cf6] group-hover:to-[#64ffda] transition-all duration-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: 0.1 * skillIndex }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
