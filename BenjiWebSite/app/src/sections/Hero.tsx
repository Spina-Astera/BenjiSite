import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([firstNameRef.current, lastNameRef.current], {
        opacity: 0,
        y: 100,
        rotateX: -90,
      });
      gsap.set(subtitleRef.current, {
        opacity: 0,
        filter: 'blur(20px)',
      });
      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: 50,
      });
      gsap.set('.shape', {
        opacity: 0,
        scale: 0,
        rotation: -180,
      });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(firstNameRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        ease: 'expo.out',
      })
        .to(
          lastNameRef.current,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            ease: 'expo.out',
          },
          '-=0.8'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.2'
        )
        .to(
          '.shape',
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'back.out(1.7)',
          },
          '-=0.8'
        );

      // Scroll-triggered animations
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      scrollTl
        .to(firstNameRef.current, {
          scale: 0.85,
          letterSpacing: '0.05em',
          ease: 'none',
        })
        .to(
          lastNameRef.current,
          {
            y: -150,
            opacity: 0.3,
            ease: 'none',
          },
          0
        )
        .to(
          subtitleRef.current,
          {
            y: -80,
            opacity: 0,
            ease: 'none',
          },
          0
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            ease: 'none',
          },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-red-950/30 animate-gradient" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[150px] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-800/15 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
        </div>
      </div>

      {/* Floating Shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
        {/* Circle */}
        <div
          className="shape absolute top-[15%] right-[15%] w-16 h-16 md:w-24 md:h-24 border-2 border-red-500/40 rounded-full animate-float"
          style={{ animationDelay: '0s' }}
        />
        {/* Triangle */}
        <div
          className="shape absolute bottom-[20%] left-[10%] w-0 h-0 animate-float-slow"
          style={{
            borderLeft: '30px solid transparent',
            borderRight: '30px solid transparent',
            borderBottom: '52px solid rgba(255, 0, 0, 0.3)',
            animationDelay: '1s',
          }}
        />
        {/* Square */}
        <div
          className="shape absolute top-[60%] right-[8%] w-12 h-12 md:w-16 md:h-16 border-2 border-red-500/30 rotate-45 animate-float"
          style={{ animationDelay: '2s' }}
        />
        {/* Small dots */}
        <div className="shape absolute top-[30%] left-[20%] w-3 h-3 bg-red-500/50 rounded-full animate-pulse" />
        <div className="shape absolute bottom-[30%] right-[25%] w-2 h-2 bg-red-500/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 perspective-1200">
        {/* First Name */}
        <h1
          ref={firstNameRef}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[120px] font-black text-white uppercase tracking-tight leading-none preserve-3d"
        >
          BENJAMIN
        </h1>

        {/* Last Name - Outlined */}
        <h1
          ref={lastNameRef}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[120px] font-black text-stroke uppercase tracking-tight leading-none mt-2 preserve-3d"
        >
          OPUNI-ADU
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 md:mt-12 font-body text-lg md:text-xl text-white/80 tracking-wide max-w-2xl mx-auto"
        >
          Computer Engineer & Creative Technologist
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 font-display text-sm font-semibold uppercase tracking-widest text-white/80 hover:text-white transition-colors border-b-2 border-transparent hover:border-red-500"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-display text-xs uppercase tracking-widest text-white/50">
          Scroll to explore
        </span>
        <ChevronDown className="w-6 h-6 text-red-500 animate-bounce-subtle" />
      </div>

      {/* Decorative Red Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
    </section>
  );
};

export default Hero;
