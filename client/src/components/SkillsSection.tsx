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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="skills" className="py-20 bg-[#121212]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold font-poppins mb-2 text-center">
            <span className="text-[#64ffda]">02.</span> Skills & Technologies
          </h2>
          <div className="h-1 w-32 bg-[#8b5cf6]/50 mb-12 mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="bg-[#0a192f]/50 rounded-lg p-6 shadow-lg"
              variants={childVariants}
            >
              <div className="flex items-center mb-6">
                {category.icon}
                <h3 className="text-xl font-semibold font-poppins ml-4">{category.title}</h3>
              </div>
              
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span>{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{ "--progress": `${skill.percentage}%` } as React.CSSProperties}
                      ></div>
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
