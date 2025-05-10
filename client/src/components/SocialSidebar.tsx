import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function SocialSidebar() {
  return (
    <div className="fixed left-6 bottom-0 z-10 hidden lg:flex flex-col items-center">
      <div className="flex flex-col space-y-6 mb-6">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a 
          href="mailto:contact@osamahashmi.dev" 
          className="text-[#e6f1ff] hover:text-[#64ffda] transition-colors duration-300"
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
      <div className="h-24 w-px bg-[#e6f1ff]"></div>
    </div>
  );
}
