import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Play, Image as ImageIcon, Video } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  hasVideo?: boolean;
  videoUrl?: string;
  gallery?: string[];
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      title: 'SMART AC',
      subtitle: 'Temperature Control Scale Room',
      description:
        'Led design and implementation of intelligent temperature control using Makeblock and Arduino. Developed hysteresis-closed-control loop system with 99.5% accuracy, integrating sensors and actuators for stable environment maintenance.',
      technologies: ['Arduino', 'MegaPi', 'Arduino C', 'Python'],
      image: '/project-smart-ac.jpg',
      githubUrl: 'https://github.com',
      hasVideo: true,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      gallery: ['/project-smart-ac.jpg'],
    },
    {
      id: 2,
      title: 'PATH PILOT',
      subtitle: 'Google Hackathon Winner',
      description:
        'Led team to victory at Google Hackathon, creating Path Pilot—a career exploration web application helping high school students discover their ideal career paths tailored to their personality and character traits.',
      technologies: ['TypeScript', 'CSS', 'HTML', 'React'],
      image: '/project-path-pilot.jpg',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      hasVideo: false,
      gallery: ['/project-path-pilot.jpg'],
    },
    {
      id: 3,
      title: '6502 EMULATOR',
      subtitle: 'Microprocessor Simulation',
      description:
        'Developed comprehensive emulator replicating 6502 behavior with 99.8% accuracy. Implemented modular architecture reducing complexity by 40%. Conducted extensive testing with 200+ test cases achieving 98% coverage.',
      technologies: ['Python', 'Unit Testing', 'Assembly'],
      image: '/project-emulator.jpg',
      githubUrl: 'https://github.com',
      hasVideo: false,
      gallery: ['/project-emulator.jpg'],
    },
    {
      id: 4,
      title: 'PORTFOLIO',
      subtitle: 'Personal Website',
      description:
        'Designed and developed this portfolio website showcasing projects and skills. Built with modern web technologies, featuring responsive design, smooth animations, and interactive elements.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      image: '/project-portfolio.jpg',
      githubUrl: 'https://github.com',
      hasVideo: false,
      gallery: ['/project-portfolio.jpg'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Project cards stagger
      gsap.fromTo(
        '.project-card',
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setShowGallery(true);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="section-title text-white">
            Featured <span className="text-stroke">Projects</span>
          </h2>
          <p className="mt-4 font-body text-white/60 max-w-2xl mx-auto">
            A selection of my recent work spanning embedded systems, web
            development, and software engineering.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative overflow-hidden rounded-2xl"
            >
              {/* Background Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  {/* Title */}
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="font-display text-sm uppercase tracking-wider text-red-500 mb-3">
                    {project.subtitle}
                  </p>

                  {/* Description - shows on hover */}
                  <p className="font-body text-sm text-white/70 mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-body bg-white/10 text-white/80 rounded-full border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    <button
                      onClick={() => handleViewProject(project)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-display uppercase tracking-wider rounded hover:bg-red-600 transition-colors"
                    >
                      <ImageIcon className="w-4 h-4" />
                      View
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-white/30 text-white text-sm font-display uppercase tracking-wider rounded hover:bg-white/10 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-white/30 text-white text-sm font-display uppercase tracking-wider rounded hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <Github className="w-5 h-5" />
            View All Projects
          </a>
        </div>
      </div>

      {/* Project Gallery Dialog */}
      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-4xl bg-black/95 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {selectedProject?.subtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Media Section */}
            <div className="space-y-4">
              {/* Video placeholder */}
              {selectedProject?.hasVideo && (
                <div className="space-y-2">
                  <h4 className="font-display text-sm uppercase tracking-wider text-red-500 flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Project Video
                  </h4>
                  <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                    <div className="text-center">
                      <Play className="w-12 h-12 text-white/30 mx-auto mb-2" />
                      <p className="text-white/50 text-sm">
                        Video placeholder - Add your video URL
                      </p>
                      <p className="text-white/30 text-xs mt-1">
                        Recommended: YouTube or Vimeo embed
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              <div className="space-y-2">
                <h4 className="font-display text-sm uppercase tracking-wider text-red-500 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Project Images
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProject?.gallery?.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10"
                    >
                      <img
                        src={img}
                        alt={`${selectedProject.title} screenshot ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {/* Placeholder for additional images */}
                  <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center border border-dashed border-white/20">
                    <p className="text-white/30 text-sm text-center px-4">
                      Add more images here
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-display text-sm uppercase tracking-wider text-white mb-2">
                About this project
              </h4>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                {selectedProject?.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {selectedProject?.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-body bg-red-500/20 text-red-400 rounded-full border border-red-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {selectedProject?.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-display uppercase tracking-wider rounded hover:bg-white/20 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
              {selectedProject?.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-display uppercase tracking-wider rounded hover:bg-red-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
    </section>
  );
};

export default Projects;
