import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image 3D flip reveal
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          rotateY: -90,
        },
        {
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content paragraphs stagger
      gsap.fromTo(
        '.about-paragraph',
        {
          opacity: 0,
          x: 80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-card',
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on image
      gsap.to(imageRef.current, {
        y: -50,
        rotate: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: Award,
      value: '3.94',
      label: 'GPA',
    },
    {
      icon: GraduationCap,
      value: 'STEM',
      label: 'Scholar',
    },
    {
      icon: Trophy,
      value: 'Google',
      label: 'Hackathon Winner',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-950/10 to-transparent" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Image Column */}
          <div className="lg:col-span-5 perspective-1000">
            <div
              ref={imageRef}
              className="relative preserve-3d"
              style={{ transform: 'perspective(1000px) rotateY(-5deg)' }}
            >
              {/* Image container */}
              <div className="relative overflow-hidden rounded-lg group">
                <img
                  src="/profile.jpg"
                  alt="Benjamin Opuni-Adu"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Decorative border */}
              <div className="absolute -inset-3 border-2 border-red-500/30 rounded-lg -z-10 transform translate-x-4 translate-y-4" />

              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-red-500" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-red-500" />
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7">
            {/* Section Title */}
            <h2
              ref={titleRef}
              className="section-title text-white mb-8"
            >
              About <span className="text-stroke">Me</span>
            </h2>

            {/* Content */}
            <div ref={contentRef} className="space-y-6">
              <p className="about-paragraph font-body text-lg text-white/80 leading-relaxed">
                I&apos;m{' '}
                <span className="text-red-500 font-semibold">
                  Benjamin Opuni-Adu
                </span>
                , a Computer Engineering student at{' '}
                <span className="text-white font-medium">
                  The National University of Ireland, Maynooth
                </span>
                . With a GPA of 3.94, I&apos;m a STEM Scholar and active member
                of the Engineering Honor Society and Athletics Society.
              </p>

              <p className="about-paragraph font-body text-lg text-white/80 leading-relaxed">
                My passion lies at the intersection of{' '}
                <span className="text-white font-medium">
                  hardware and software
                </span>{' '}
                — creating intelligent systems that solve real-world problems.
                From embedded systems to web applications, I bring a meticulous
                attention to detail and a drive for excellence to every project.
              </p>

              <p className="about-paragraph font-body text-lg text-white/80 leading-relaxed">
                I thrive in collaborative environments and enjoy tackling complex
                challenges that push the boundaries of what&apos;s possible. My
                experience spans from low-level microprocessor emulation to
                high-level web development, giving me a unique perspective on
                full-stack system design.
              </p>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 mt-10"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card group relative p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 cursor-default"
                >
                  <stat.icon className="w-6 h-6 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-red-500 transition-colors">
                    {stat.value}
                  </div>
                  <div className="font-body text-sm text-white/60 mt-1">
                    {stat.label}
                  </div>
                </div>
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

export default About;
