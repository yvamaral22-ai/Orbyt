import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  Smartphone, 
  Database, 
  Terminal, 
  Zap,
  Rocket,
  ShieldCheck,
  BarChart3,
  MessageSquare,
  Star,
  Play
} from 'lucide-react';
import { cn } from './lib/utils';
// import simuVideo from './simu.mp4';
const simuVideo = "/simu.mp4";

// --- Types ---

// --- Helper Components ---

const SpotlightCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn("group relative rounded-3xl border border-white/5 bg-white/5 p-8 overflow-hidden backdrop-blur-xl", className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(214, 124, 82, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
};

const MagneticButton = ({ children, className, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { damping: 20, stiffness: 200 });

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 200;
    const yPct = (mouseY / height - 0.5) * 200;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("perspective-1000", className)}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const Counter = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuad = (t: number) => t * (2 - t);
            setCount(Math.floor(easeOutQuad(progress) * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      <span className="text-4xl font-display font-bold text-brand">{count}+</span>
      <span className="text-xs text-muted uppercase tracking-widest">{label}</span>
    </div>
  );
};

// --- Main Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['inicio', 'servicos', 'portfolio', 'depoimentos', 'processo', 'contato'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 px-6 py-3 rounded-full border border-white/10 backdrop-blur-xl w-[95%] max-w-5xl",
          scrolled ? "bg-surface/80 shadow-2xl" : "bg-transparent"
        )}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-gradient-to-br from-brand-soft to-brand rounded flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-brand/20">
              <Terminal className="w-5 h-5 text-surface" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-none tracking-tighter">ORBYT <span className="text-brand">TECNOLOGIA</span></span>
              <span className="text-[8px] uppercase tracking-widest text-muted">Software, Produtos e Presença Digital</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-muted uppercase tracking-widest">
            {[
              { name: 'Serviços', id: 'servicos' },
              { name: 'Portfólio', id: 'portfolio' },
              { name: 'Depoimentos', id: 'depoimentos' },
              { name: 'Processo', id: 'processo' }
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className={cn(
                  "hover:text-brand transition-colors relative group",
                  activeSection === item.id ? "text-brand" : ""
                )}
              >
                {item.name}
                <motion.span 
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-brand transition-all",
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            ))}
            <MagneticButton className="bg-brand text-surface px-5 py-2 rounded-full hover:scale-105 transition-all duration-300 font-bold text-[10px]">
              <a href="#contato">VAMOS CRIAR</a>
            </MagneticButton>
          </div>

          <button 
            className="md:hidden text-ink p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn("w-full h-0.5 bg-ink transition-all", mobileMenuOpen ? "rotate-45 translate-y-2" : "")} />
              <span className={cn("w-full h-0.5 bg-ink transition-all", mobileMenuOpen ? "opacity-0" : "")} />
              <span className={cn("w-full h-0.5 bg-ink transition-all", mobileMenuOpen ? "-rotate-45 -translate-y-2" : "")} />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {[
              { name: 'Início', id: 'inicio' },
              { name: 'Serviços', id: 'servicos' },
              { name: 'Portfólio', id: 'portfolio' },
              { name: 'Depoimentos', id: 'depoimentos' },
              { name: 'Processo', id: 'processo' },
              { name: 'Contato', id: 'contato' }
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-display font-bold uppercase tracking-tighter hover:text-brand transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const VideoBackground = () => {
  const videoUrl = simuVideo;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReversing, setIsReversing] = useState(false);
  const reverseRequestRef = useRef<number>(0);

  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    let isMounted = true;
    
    const monitorVideo = (now: number) => {
      if (!isMounted) return;
      
      const video = videoRef.current;
      if (!video || !video.duration || video.readyState < 2) {
        reverseRequestRef.current = requestAnimationFrame(monitorVideo);
        return;
      }

      if (isReversing) {
        if (!lastTimeRef.current) lastTimeRef.current = now;
        const deltaTime = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;

        // Rebobina na mesma velocidade (1x)
        const nextTime = video.currentTime - deltaTime;
        
        if (nextTime <= 0.2) {
          video.currentTime = 0.2;
          setIsReversing(false);
          lastTimeRef.current = 0;
          video.play().catch(() => {});
        } else {
          video.currentTime = nextTime;
        }
      } else {
        // Monitoramento de alta precisão para o final
        // Inverte 0.5s antes do fim real para garantir que NUNCA trave
        const threshold = 0.5;
        if (video.currentTime >= video.duration - threshold) {
          video.pause();
          setIsReversing(true);
          lastTimeRef.current = now;
        }
      }
      reverseRequestRef.current = requestAnimationFrame(monitorVideo);
    };

    reverseRequestRef.current = requestAnimationFrame(monitorVideo);

    return () => {
      isMounted = false;
      if (reverseRequestRef.current) cancelAnimationFrame(reverseRequestRef.current);
    };
  }, [isReversing]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <video 
        ref={videoRef}
        key={videoUrl}
        autoPlay 
        muted 
        playsInline 
        className="w-full h-full object-cover opacity-30 grayscale-[0.4] contrast-[1.1]"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface opacity-40" />
    </div>
  );
};

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const orb1X = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const orb1Y = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);
  const orb2X = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
  const orb2Y = useTransform(mouseY, [0, window.innerHeight], [20, -20]);

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden px-6">
      <VideoBackground />
      
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div style={{ x: orb1X, y: orb1Y }} className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand/10 blur-[120px] rounded-full" />
        <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-olive/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-brand-soft text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
            Software com presença, estratégia e profundidade visual
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tighter mb-8">
            A Orbyt cria sites, sistemas e SaaS com <span className="text-brand italic">estética marcante</span> para transformar atenção em autoridade.
          </h1>
          <p className="text-lg text-muted max-w-xl mb-10 leading-relaxed">
            Experiências digitais para marcas e negócios que querem sair do visual genérico: interfaces modernas, interatividade inteligente, performance e valor percebido desde o primeiro scroll.
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton className="px-8 py-4 bg-brand text-surface rounded-full font-bold text-sm hover:shadow-[0_0_30px_rgba(214,124,82,0.3)] transition-all">
              <a href="#contato">Quero um projeto assim</a>
            </MagneticButton>
            <MagneticButton className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full font-bold text-sm transition-all">
              <a href="#servicos">Explorar serviços</a>
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative perspective-1000"
        >
          <TiltCard className="w-full">
            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-widest">Build + Branding</span>
                <span className="text-[10px] text-muted uppercase tracking-widest">Seleção Curada</span>
              </div>
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand/20 to-olive/20 border border-white/10 relative overflow-hidden mb-8">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <motion.div 
                  animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 left-10 w-2/3 h-1/2 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl" 
                />
                <motion.div 
                  animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 right-10 w-1/3 h-2/3 bg-brand/20 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl" 
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold mb-2">Linguagem visual própria</h3>
                  <p className="text-xs text-muted max-w-[250px]">Direção de arte, UX, frontend refinado e arquitetura sólida pela Orbyt.</p>
                </div>
                <div className="flex gap-2">
                  {['Web', 'SaaS', 'Apps'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

const TechStack = () => {
  const techs = [
    { name: "React 18", icon: Code2 },
    { name: "TypeScript", icon: Terminal },
    { name: "Tailwind CSS", icon: Layers },
    { name: "Framer Motion", icon: Zap },
    { name: "Node.js", icon: Cpu },
    { name: "PostgreSQL", icon: Database },
    { name: "Vite", icon: Rocket },
    { name: "Firebase", icon: ShieldCheck }
  ];

  return (
    <div className="py-20 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-brand text-[10px] uppercase tracking-[0.3em] font-bold mb-10 block text-center">Tecnologias de Ponta</span>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {techs.map((tech, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand/50 transition-colors">
                <tech.icon className="w-6 h-6 text-muted group-hover:text-brand transition-colors" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted/60 group-hover:text-brand transition-colors">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      q: "Quanto tempo leva para desenvolver um site premium?",
      a: "Projetos institucionais levam de 2 a 4 semanas. Plataformas SaaS e sistemas complexos variam de 6 a 12 semanas, dependendo das funcionalidades."
    },
    {
      q: "Vocês trabalham com design pronto ou criam do zero?",
      a: "Tudo é criado do zero. Não usamos templates. Cada pixel é pensado para a estratégia da sua marca e os objetivos do seu negócio."
    },
    {
      q: "O site será otimizado para o Google (SEO)?",
      a: "Sim. Utilizamos as melhores práticas de SEO técnico, performance extrema (Core Web Vitals) e semântica de código para garantir visibilidade."
    },
    {
      q: "Como funciona o suporte após a entrega?",
      a: "Oferecemos 30 dias de suporte total pós-lançamento e planos de manutenção mensal para evolução contínua do produto."
    }
  ];

  return (
    <section className="py-32 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-brand text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Dúvidas Frequentes</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
          Transparência em <span className="text-brand italic">cada etapa</span> do processo.
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-lg">{faq.q}</span>
              <motion.div animate={{ rotate: openIndex === idx ? 45 : 0 }}>
                <Zap className={cn("w-5 h-5", openIndex === idx ? "text-brand" : "text-muted")} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-muted leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

const Marquee = () => {
  const items = [
    "Websites premium", "Plataformas SaaS", "Sistemas internos", "UX estratégico", 
    "Motion design", "3D e profundidade", "Automação de processos", "Landing pages que convertem"
  ];

  return (
    <div className="py-10 border-y border-white/5 overflow-hidden bg-white/[0.02]">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap"
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="text-sm font-bold uppercase tracking-[0.3em] text-muted/40 hover:text-brand transition-colors cursor-default">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Sites institucionais de alto impacto",
      description: "Páginas que posicionam sua marca, valorizam seu serviço e guiam o usuário até a ação certa com clareza visual.",
      icon: Globe
    },
    {
      number: "02",
      title: "SaaS e plataformas digitais",
      description: "Produto com estrutura escalável, interface clara e experiência de uso que equilibra negócio, tecnologia e design.",
      icon: Cpu
    },
    {
      number: "03",
      title: "Sistemas sob demanda",
      description: "Soluções para operações internas, automações, dashboards e fluxos que economizam tempo e aumentam controle.",
      icon: Database
    },
    {
      number: "04",
      title: "Identidade digital com movimento",
      description: "Microinterações, camadas visuais, efeitos 3D e ritmo de navegação pensados para manter a atenção do usuário.",
      icon: Zap
    }
  ];

  return (
    <section id="servicos" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-20">
        <span className="text-brand text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">O que eu desenvolvo</span>
        <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
          Não é só “um site bonito”. É presença digital com <span className="text-brand italic">intenção</span>.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <SpotlightCard className="h-full group flex flex-col justify-between">
              <div>
                <span className="text-4xl font-display font-black text-white/5 mb-6 block group-hover:text-brand/20 transition-colors">{service.number}</span>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-muted leading-relaxed mb-8">{service.description}</p>
              </div>
              <div className="flex items-center gap-2 text-brand text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Saber mais <ArrowUpRight className="w-3 h-3" />
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      title: "Imersão",
      description: "Entendemos profundamente seu negócio, objetivos e dores para traçar a melhor estratégia técnica.",
      number: "01"
    },
    {
      title: "Direção visual",
      description: "Defino atmosfera, tipografia, paleta, hierarquia e comportamento da interface.",
      number: "02"
    },
    {
      title: "Construção",
      description: "Codificação ágil com entregas incrementais, garantindo transparência e qualidade em cada sprint.",
      number: "03"
    },
    {
      title: "Refino",
      description: "Ajusto interações, narrativa visual e detalhes que elevam a percepção de qualidade.",
      number: "04"
    }
  ];

  return (
    <section id="processo" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <span className="text-brand text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Como eu trabalho</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-8">
            Da ideia ao produto com um processo <span className="text-brand italic">enxuto</span> e orientado a resultado.
          </h2>
          <MagneticButton className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full font-bold text-sm transition-all">
            Ver detalhes do processo
          </MagneticButton>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-brand/30 transition-colors group"
            >
              <div className="text-5xl font-display font-black text-brand/10 mb-6 group-hover:text-brand/20 transition-colors">{step.number}</div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const projects = [
    {
      title: "BarberFlow SaaS",
      category: "SaaS de Gestão",
      description: "Ecossistema completo para barbearias premium: agendamento inteligente, gestão de estoque e dashboard de faturamento em tempo real.",
      color: "from-brand/20 to-brand-soft/20",
      featured: true,
      type: "dashboard",
      badge: "Case de Sucesso"
    },
    {
      title: "Aura Luxury",
      category: "E-commerce Premium",
      description: "Experiência de compra imersiva para marcas de alto padrão, com foco em performance e narrativa visual cinematográfica.",
      color: "from-olive/20 to-brand/10",
      featured: false,
      type: "gallery",
      badge: "Conceito"
    },
    {
      title: "Nexus Analytics",
      category: "Dashboard de Dados",
      description: "Visualização de dados complexos simplificada para tomada de decisão estratégica em tempo real.",
      color: "from-blue-500/10 to-brand/10",
      featured: false,
      type: "analytics",
      badge: "Conceito"
    }
  ];

  const renderBrowserContent = (type: string) => {
    switch (type) {
      case 'dashboard':
        return (
          <div className="flex-1 p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center mb-2">
              <div className="h-3 w-20 bg-brand/30 rounded" />
              <div className="h-3 w-12 bg-white/10 rounded" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-white/5 rounded-lg border border-white/5 flex flex-col p-2 gap-1">
                  <div className="h-1 w-full bg-white/10 rounded" />
                  <div className="h-2 w-1/2 bg-brand/20 rounded" />
                </div>
              ))}
            </div>
            <div className="flex-1 bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col gap-2">
              <div className="h-2 w-full bg-white/10 rounded" />
              <div className="h-2 w-full bg-white/10 rounded" />
              <div className="h-2 w-2/3 bg-white/10 rounded" />
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div className="flex-1 p-4 grid grid-cols-2 gap-3">
            <div className="col-span-2 h-12 bg-white/10 rounded-xl" />
            <div className="aspect-square bg-white/5 rounded-xl border border-white/5" />
            <div className="aspect-square bg-white/5 rounded-xl border border-white/5" />
            <div className="col-span-2 h-4 bg-white/5 rounded" />
          </div>
        );
      case 'analytics':
        return (
          <div className="flex-1 p-4 flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-brand/20" />
              <div className="flex-1 flex flex-col gap-2 justify-center">
                <div className="h-2 w-1/2 bg-white/10 rounded" />
                <div className="h-1 w-1/4 bg-white/5 rounded" />
              </div>
            </div>
            <div className="flex-1 flex items-end gap-1 px-2 pb-2">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  className="flex-1 bg-brand/30 rounded-t-sm" 
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="portfolio" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-brand text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Portfólio conceitual</span>
        <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
          Projetos pensados para mostrar <span className="text-brand italic">amplitude técnica</span> e força de apresentação.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "group relative rounded-[2.5rem] border border-white/10 bg-white/5 overflow-hidden flex flex-col",
              project.featured ? "md:col-span-2 lg:col-span-2" : ""
            )}
          >
            <div className={cn("aspect-video w-full bg-gradient-to-br relative overflow-hidden p-8", project.color)}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              
              {/* Browser Frame Simulation */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="w-full h-full bg-surface/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="h-6 bg-white/5 border-bottom border-white/10 flex items-center px-3 gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                  <div className="ml-2 h-2 w-24 bg-white/10 rounded-full" />
                </div>
                {renderBrowserContent(project.type)}
              </motion.div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-brand text-[10px] uppercase tracking-widest font-bold">{project.category}</span>
                  {project.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold uppercase tracking-widest text-muted">
                      {project.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-8">{project.description}</p>
              </div>
              <MagneticButton 
                onClick={() => setSelectedProject(project)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-brand transition-colors"
              >
                {project.featured ? "Solicitar Demo" : "Ver Detalhes"} <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-surface/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface border border-white/10 rounded-[3rem] p-8 md:p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <Zap className="w-6 h-6 text-brand rotate-45" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className={cn("aspect-video rounded-3xl bg-gradient-to-br relative overflow-hidden flex items-center justify-center", selectedProject.color)}>
                   <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                   <Terminal className="w-20 h-20 text-white/20" />
                </div>
                <div>
                  <span className="text-brand text-[10px] uppercase tracking-widest font-bold mb-4 block">{selectedProject.category}</span>
                  <h3 className="text-4xl font-display font-bold mb-6">{selectedProject.title}</h3>
                  <p className="text-muted leading-relaxed mb-8">{selectedProject.description}</p>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-brand" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Arquitetura Segura</h4>
                        <p className="text-xs text-muted">Proteção de dados e performance otimizada.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-brand" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Escalabilidade</h4>
                        <p className="text-xs text-muted">Pronto para crescer com seu negócio.</p>
                      </div>
                    </div>
                  </div>

                  <MagneticButton className="w-full py-4 bg-brand text-surface rounded-full font-bold text-sm">
                    <a href="#contato" onClick={() => setSelectedProject(null)}>Conversar sobre este projeto</a>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "A Orbyt conseguiu traduzir o que a gente queria passar sem cair no visual comum de tecnologia. O projeto ficou elegante, rápido e com muita presença.",
      author: "Marina Costa",
      role: "Direção de Marca"
    },
    {
      quote: "O resultado teve impacto real na forma como nossos clientes perceberam o negócio. Não foi só um site, foi reposicionamento.",
      author: "Lucas Almeida",
      role: "Founder de plataforma digital"
    },
    {
      quote: "Processo objetivo, comunicação clara e um nível de cuidado visual que realmente diferencia. A entrega parece produto de empresa grande.",
      author: "Renata Siqueira",
      role: "Operações e crescimento"
    }
  ];

  return (
    <section id="depoimentos" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center mb-20">
        <span className="text-brand text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Depoimentos</span>
        <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
          Confiança se constrói quando <span className="text-brand italic">estética, clareza e execução</span> andam juntas.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/5 flex flex-col justify-between"
          >
            <div>
              <Star className="w-6 h-6 text-brand mb-6 fill-brand/20" />
              <p className="text-lg leading-relaxed mb-8 italic text-ink/90">"{t.quote}"</p>
            </div>
            <div>
              <strong className="block font-display text-lg">{t.author}</strong>
              <span className="text-xs text-muted uppercase tracking-widest">{t.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Featured = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Destaque visual</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8">
            Uma composição que mistura <span className="text-brand italic">editorial</span>, interface e profundidade.
          </h2>
          <p className="text-muted leading-relaxed text-lg mb-10">
            A proposta aqui foge do clichê neon e da estética “tech genérica”. A linguagem visual usa tons minerais, cobre queimado, contrastes suaves e superfícies translúcidas para parecer sofisticada sem ficar fria.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-brand text-[10px] font-bold uppercase tracking-widest mb-2 block">Estratégia</span>
              <h4 className="font-bold">Seu serviço explicado com mais valor percebido</h4>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-brand text-[10px] font-bold uppercase tracking-widest mb-2 block">Tecnologia</span>
              <h4 className="font-bold">Base pronta para evoluir para stack moderna</h4>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-brand/20 to-olive/20 border border-white/10 overflow-hidden flex items-center justify-center p-12"
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
          <SpotlightCard className="w-full h-full flex flex-col justify-center items-center text-center">
            <span className="text-brand text-[10px] font-bold uppercase tracking-widest mb-4 block">Experiência</span>
            <h3 className="text-3xl font-display font-bold mb-6">Interatividade que convida a explorar</h3>
            <p className="text-muted text-sm max-w-xs">Elementos respondem ao movimento do mouse, surgem com ritmo e criam uma sensação tátil mesmo em uma página leve.</p>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "contato@orbyttecnologia.com.br";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contato" className="py-32 px-6">
      <div className="max-w-7xl mx-auto rounded-[3rem] bg-brand p-12 md:p-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <span className="text-surface/60 text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">Vamos construir algo memorável</span>
          <h2 className="text-5xl md:text-8xl font-display font-bold text-surface leading-[0.85] tracking-tighter mb-12">
            SE A IDEIA É <span className="text-white italic">IMPRESSIONAR</span> <br /> 
            ESSE É O CAMINHO.
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="relative group">
              <MagneticButton 
                onClick={copyEmail}
                className="px-10 py-5 bg-surface text-brand rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl flex items-center gap-3"
              >
                {email}
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-green-600">✓</motion.span>
                  ) : (
                    <Mail className="w-5 h-5" />
                  )}
                </AnimatePresence>
              </MagneticButton>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-widest text-surface/60 font-bold">
                {copied ? "E-mail copiado!" : "Clique para copiar"}
              </div>
            </div>
            <MagneticButton className="px-10 py-5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all">
              <a href="https://wa.me/553598403870" target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp</a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-brand rounded flex items-center justify-center rotate-3">
            <Terminal className="w-5 h-5 text-surface" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter">ORBYT <span className="text-brand">TECNOLOGIA</span></span>
        </div>
        <p className="text-muted text-sm max-w-xs leading-relaxed">
          Desenvolvimento de software focado em design estratégico e performance extrema. Transformando ideias em autoridade digital.
        </p>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Social</h4>
        <div className="flex flex-col gap-4 text-sm text-muted">
          <a href="https://github.com/yvamaral22-ai" className="hover:text-brand transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/ygor-vieira-91bb84237/" className="hover:text-brand transition-colors">LinkedIn</a>
          <a href="mailto:contato@orbyttecnologia.com.br" className="hover:text-brand transition-colors">E-mail</a>
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
        <div className="flex flex-col gap-4 text-sm text-muted">
          <a href="#" className="hover:text-brand transition-colors">Privacidade</a>
          <a href="#" className="hover:text-brand transition-colors">Termos</a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-muted text-[10px] uppercase tracking-widest">
        © {new Date().getFullYear()} Orbyt Tecnologia. Todos os direitos reservados.
      </p>
      <div className="flex gap-4">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-muted">Disponível para novos projetos</span>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative selection:bg-brand selection:text-white">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="noise" />
      <div ref={cursorRef} className="cursor-glow fixed w-[400px] h-[400px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 z-0 bg-brand/5 blur-[100px]" />
      <div className="fixed w-2 h-2 bg-brand rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[100] hidden md:block" style={{ left: mouseX, top: mouseY }} />
      
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center rotate-12 animate-pulse shadow-2xl shadow-brand/20">
                <Terminal className="w-8 h-8 text-surface" />
              </div>
              <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full w-full bg-brand" 
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted">Iniciando Orbyt Studio</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <Hero />
          <TechStack />
          <Marquee />
          <Services />
          <Portfolio />
          <Testimonials />
          <FAQ />
          <Featured />
          <Process />
          <Contact />
          <Footer />

          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="fixed bottom-8 right-8 z-[90] md:hidden"
          >
            <a 
              href="https://wa.me/553598403870" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-brand text-surface rounded-full flex items-center justify-center shadow-2xl shadow-brand/40"
            >
              <MessageSquare className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
