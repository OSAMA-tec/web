interface Project {
  title: string;
  description: string;
  image: string;
  categories: ("React" | "Three.js" | "Full Stack" | "Backend")[];
  liveLink?: string;
  githubLink?: string;
}

export const projectsData: Project[] = [
  {
    title: "3D Interactive Dashboard",
    description: "A data visualization dashboard with interactive 3D elements built using Three.js and React. Features real-time data updates and custom animations.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
    categories: ["Three.js", "React"],
    liveLink: "https://example.com/dashboard",
    githubLink: "https://github.com/example/dashboard"
  },
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with product management, cart functionality, user authentication, and payment integration using Stripe.",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
    categories: ["React", "Full Stack"],
    liveLink: "https://example.com/ecommerce",
    githubLink: "https://github.com/example/ecommerce"
  },
  {
    title: "3D Product Configurator",
    description: "An interactive tool allowing users to customize products in 3D space, change colors, materials, and view from different angles.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
    categories: ["Three.js", "React"],
    liveLink: "https://example.com/configurator",
    githubLink: "https://github.com/example/configurator"
  },
  {
    title: "Social Media Platform",
    description: "A full-stack social platform with real-time chat, post creation, user profiles, and notification system using Socket.io.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
    categories: ["React", "Full Stack"],
    liveLink: "https://example.com/social",
    githubLink: "https://github.com/example/social"
  },
  {
    title: "REST API Service",
    description: "A scalable RESTful API service with authentication, rate limiting, and comprehensive documentation using Swagger.",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
    categories: ["Backend"],
    githubLink: "https://github.com/example/api"
  },
  {
    title: "3D Portfolio Website",
    description: "An immersive portfolio website with interactive 3D elements, custom shaders, and animations built with Three.js and React.",
    image: "https://images.pixabay.com/photo/2017/08/10/08/47/code-2620118_1280.jpg",
    categories: ["Three.js", "React"],
    liveLink: "https://example.com/portfolio",
    githubLink: "https://github.com/example/portfolio"
  }
];
