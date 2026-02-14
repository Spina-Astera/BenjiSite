import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Medal, Award, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      icon: Trophy,
      title: 'GOOGLE HACKATHON WINNER',
      description:
        'Led team to victory at Google Hackathon, creating Path Pilot—a career exploration web application helping students discover their ideal career paths based on personality and interests.',
      date: '2024',
      featured: true,
    },
    {
      icon: Medal,
      title: 'TOP 10 NATIONAL RANKING',
      subtitle: 'Long Jump',
      description:
        'Ranked among top 10 in the country for Long Jump at National Outdoor Championships.',
      date: '2023',
      featured: false,
    },
    {
      icon: Award,
      title: 'TOP 10 NATIONAL RANKING',
      subtitle: '4x100m Relay',
      description:
        'Ranked among top 10 in the country for 4x100m relay at National Outdoor Championships.',
      date: '2023',
      featured: false,
    },
    {
      icon: Star,
      title: 'STEM SCHOLAR',
      subtitle: 'Academic Excellence',
      description:
        'Recognized as a STEM Scholar at Maynooth University for outstanding academic performance in Computer Engineering.',
      date: '2023',
      featured: false,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: -30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Featured card animation
      gsap.fromTo(
        '.achievement-featured',
        {
          opacity: 0,
          rotateX: -90,
        },
        {
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Secondary cards stagger
      gsap.fromTo(
        '.achievement-card',
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Icon bounce
      gsap.fromTo(
        '.achievement-icon',
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-950/10 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="section-title text-white">
            <span className="text-stroke">Achievements</span>
          </h2>
          <p className="mt-4 font-body text-white/60">
            Milestones and accomplishments along my journey
          </p>
        </div>

        {/* Achievements Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto perspective-1000"
        >
          {/* Featured Achievement */}
          <div className="achievement-featured md:col-span-2 lg:col-span-2 group">
            <div className="relative h-full p-8 bg-gradient-to-br from-red-600/20 to-red-900/10 border-2 border-red-500/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-red-500 hover:shadow-[0_0_40px_rgba(255,0,0,0.3)] preserve-3d">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full blur-[100px]" />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="achievement-icon w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center animate-pulse-glow">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-display text-sm text-red-500 uppercase tracking-wider">
                    {achievements[0].date}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  {achievements[0].title}
                </h3>

                <p className="font-body text-white/70 leading-relaxed">
                  {achievements[0].description}
                </p>

                {/* Decorative corner */}
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-red-500/30 rounded-br-lg" />
              </div>
            </div>
          </div>

          {/* Secondary Achievements */}
          {achievements.slice(1).map((achievement, index) => (
            <div
              key={index}
              className="achievement-card group"
            >
              <div className="relative h-full p-6 bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-red-500/50 hover:-translate-y-2 preserve-3d">
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="achievement-icon w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                      <achievement.icon className="w-6 h-6 text-red-500 group-hover:text-red-400" />
                    </div>
                    <span className="font-display text-xs text-white/50 uppercase tracking-wider">
                      {achievement.date}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    {achievement.title}
                  </h3>

                  {achievement.subtitle && (
                    <p className="font-display text-sm text-red-500 uppercase tracking-wider mb-2">
                      {achievement.subtitle}
                    </p>
                  )}

                  <p className="font-body text-sm text-white/60 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { value: '3.94', label: 'GPA' },
            { value: '200+', label: 'Test Cases' },
            { value: '99.8%', label: 'Emulator Accuracy' },
            { value: '40%', label: 'Complexity Reduction' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="font-display text-2xl md:text-3xl font-bold text-red-500">
                {stat.value}
              </div>
              <div className="font-body text-xs text-white/50 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
    </section>
  );
};

export default Achievements;
