import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Linkedin, Send, Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'kwakuadu0510@gmail.com',
      href: 'mailto:kwakuadu0510@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '089-406-6268',
      href: 'tel:089-406-6268',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Dublin, Ireland',
      href: null,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/benjamin-adu',
      href: 'https://www.linkedin.com/in/benjamin-adu-6a198b2b9/',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.title-word',
        {
          opacity: 0,
          y: 100,
          rotateX: -45,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info stagger
      gsap.fromTo(
        '.contact-info-item',
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          scaleX: 0,
          transformOrigin: 'right',
        },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form fields stagger
      gsap.fromTo(
        '.form-field',
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully!');

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-950/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tight perspective-1000">
            <span className="title-word inline-block">LET&apos;S</span>{' '}
            <span className="title-word inline-block text-stroke">CONNECT</span>
          </h2>
          <p className="mt-4 font-body text-white/60 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-6">
                Get In Touch
              </h3>
              <p className="font-body text-white/70 leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision. Whether you have a
                question or just want to say hi, feel free to reach out!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="contact-info-item group flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <item.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-xs uppercase tracking-wider text-white/50">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="font-body text-white group-hover:text-red-500 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-white">{item.value}</p>
                    )}
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.value)}
                    className="p-2 text-white/30 hover:text-white transition-colors"
                    aria-label={`Copy ${item.label}`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="font-display text-sm uppercase tracking-wider text-white/50 mb-4">
                Follow Me
              </p>
              <div className="flex gap-3">
                {[
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/benjamin-adu-6a198b2b9/' },
                  { name: 'GitHub', href: 'https://github.com' },
                  { name: 'Twitter', href: 'https://twitter.com' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg font-display text-sm text-white/70 hover:text-white hover:border-red-500/50 hover:bg-white/10 transition-all"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 bg-white/5 border border-white/10 rounded-2xl"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>

            {/* Name Field */}
            <div className="form-field">
              <label
                htmlFor="name"
                className="block font-display text-sm uppercase tracking-wider text-white/50 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-0 py-4 bg-transparent border-b-2 border-white/20 text-white font-body focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div className="form-field">
              <label
                htmlFor="email"
                className="block font-display text-sm uppercase tracking-wider text-white/50 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-0 py-4 bg-transparent border-b-2 border-white/20 text-white font-body focus:border-red-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Message Field */}
            <div className="form-field">
              <label
                htmlFor="message"
                className="block font-display text-sm uppercase tracking-wider text-white/50 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-0 py-4 bg-transparent border-b-2 border-white/20 text-white font-body focus:border-red-500 focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <div className="form-field pt-4">
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full btn-submit flex items-center justify-center gap-2 rounded-lg transition-all ${
                  isSubmitted
                    ? 'bg-green-500 hover:bg-green-500'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-24 pt-12 border-t border-white/10">
        <div className="w-full px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-white/50">
              © 2024 Benjamin Opuni-Adu. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(`#${link.toLowerCase()}`)
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-display text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <p className="text-center font-body text-xs text-white/30 mt-6">
            Made with passion in Dublin, Ireland
          </p>
        </div>
      </footer>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-red-500/50 via-transparent to-red-500/50" />
    </section>
  );
};

export default Contact;
