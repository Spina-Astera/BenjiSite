import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);

  const languages = [
    'Python',
    'Java',
    'JavaScript',
    'C',
    'HTML',
    'SQL',
    'Arduino C',
    'MATLAB',
  ];

  const tools = [
    'React',
    'Node.js',
    'Firebase',
    'MySQL',
    'Linux',
    'Git',
    'Pandas',
    'JSON',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Inner orbit skills
      gsap.fromTo(
        '.skill-inner',
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: constellationRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Outer orbit skills
      gsap.fromTo(
        '.skill-outer',
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: constellationRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Connecting lines
      gsap.fromTo(
        '.connecting-line',
        {
          opacity: 0,
        },
        {
          opacity: 0.3,
          duration: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: constellationRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous rotation for inner orbit
      gsap.to('.orbit-inner', {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      });

      // Counter-rotation for outer orbit
      gsap.to('.orbit-outer', {
        rotation: -360,
        duration: 90,
        repeat: -1,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate positions for skills in orbit
  const getSkillPosition = (
    index: number,
    total: number,
    radius: number
  ) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px]" />
        {/* Star field */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="section-title text-white glow-red">
            SKILLS
          </h2>
          <p className="mt-4 font-body text-white/60">
            Technologies & Tools I Work With
          </p>
        </div>

        {/* Constellation Container */}
        <div
          ref={constellationRef}
          className="relative w-full max-w-4xl mx-auto aspect-square"
        >
          {/* Connecting Lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 800"
          >
            {/* Lines from center to inner orbit */}
            {languages.map((_, i) => {
              const pos = getSkillPosition(i, languages.length, 200);
              return (
                <line
                  key={`inner-line-${i}`}
                  className="connecting-line"
                  x1="400"
                  y1="400"
                  x2={400 + pos.x}
                  y2={400 + pos.y}
                  stroke="rgba(255, 0, 0, 0.2)"
                  strokeWidth="1"
                />
              );
            })}
            {/* Lines from inner to outer orbit */}
            {tools.map((_, i) => {
              const innerIdx = i % languages.length;
              const innerPos = getSkillPosition(innerIdx, languages.length, 200);
              const outerPos = getSkillPosition(i, tools.length, 320);
              return (
                <line
                  key={`outer-line-${i}`}
                  className="connecting-line"
                  x1={400 + innerPos.x}
                  y1={400 + innerPos.y}
                  x2={400 + outerPos.x}
                  y2={400 + outerPos.y}
                  stroke="rgba(255, 0, 0, 0.15)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {/* Center Title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-black border-2 border-red-500 flex items-center justify-center animate-pulse-glow">
              <div className="text-center">
                <span className="font-display text-2xl md:text-3xl font-bold text-white">
                  TECH
                </span>
                <span className="block font-display text-xs uppercase tracking-wider text-red-500">
                  Stack
                </span>
              </div>
            </div>
          </div>

          {/* Inner Orbit - Languages */}
          <div className="orbit-inner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
            {languages.map((skill, index) => {
              const pos = getSkillPosition(
                index,
                languages.length,
                200 // radius
              );
              return (
                <div
                  key={skill}
                  className="skill-inner absolute top-1/2 left-1/2 group"
                  style={{
                    transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                  }}
                >
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black border-2 border-red-500/60 flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-red-500 group-hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] cursor-default">
                      <span className="font-display text-xs md:text-sm font-semibold text-white text-center px-1">
                        {skill}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outer Orbit - Tools */}
          <div className="orbit-outer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] md:w-[800px] md:h-[800px]">
            {tools.map((skill, index) => {
              const pos = getSkillPosition(
                index,
                tools.length,
                320 // radius
              );
              return (
                <div
                  key={skill}
                  className="skill-outer absolute top-1/2 left-1/2 group"
                  style={{
                    transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                  }}
                >
                  <div className="relative">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] cursor-default">
                      <span className="font-display text-xs font-medium text-white/80 text-center px-1 group-hover:text-white">
                        {skill}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills List (Mobile Fallback) */}
        <div className="md:hidden mt-12 grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-red-500 mb-3">
              Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-body bg-white/10 text-white/80 rounded-full border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-red-500 mb-3">
              Tools & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {tools.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-body bg-white/10 text-white/80 rounded-full border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-red-500/50 via-transparent to-red-500/50" />
    </section>
  );
};

export default Skills;
