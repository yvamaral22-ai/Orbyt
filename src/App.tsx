import React, { useState, useEffect, useRef, memo, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
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
  Play,
  ArrowLeft,
  X,
  Quote
} from 'lucide-react';
import { cn } from './lib/utils';
const simuVideo = "/simu.mp4";

// --- Types ---

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

// --- Data ---

const blogPosts: BlogPost[] = [
  {
    id: 'saas-proprio',
    title: 'Por que sua empresa precisa de um SaaS próprio em 2026?',
    excerpt: 'Descubra como a transição de serviços manuais para plataformas automatizadas pode escalar seu faturamento e reduzir custos operacionais drasticamente.',
    content: `
      <p>No cenário tecnológico de 2026, a eficiência não é mais um diferencial, é o requisito básico para a sobrevivência. Empresas que ainda dependem de processos manuais ou planilhas descentralizadas estão perdendo terreno para competidores que utilizam o modelo SaaS (Software as a Service).</p>
      
      <h2>1. Escalabilidade Infinita</h2>
      <p>Diferente de um serviço prestado por humanos, um software pode atender 10 ou 10.000 clientes simultaneamente com o mesmo esforço de desenvolvimento. O custo marginal de cada novo usuário tende a zero.</p>
      
      <h2>2. Receita Recurrente Predictível</h2>
      <p>O modelo de assinatura permite que sua empresa tenha uma previsibilidade de caixa muito maior. Isso facilita investimentos em inovação e expansão, pois você sabe exatamente quanto entrará no próximo mês.</p>
      
      <h2>3. Dados como Ativo Estratégico</h2>
      <p>Um SaaS próprio permite coletar dados valiosos sobre o comportamento do seu cliente. Esses dados, quando bem analisados, tornam-se o maior ativo da sua empresa, permitindo melhorias contínuas no produto e estratégias de marketing muito mais assertivas.</p>
      
      <p>Na Kytrona, somos especialistas em transformar processos complexos em interfaces intuitivas e sistemas robustos. Se você tem uma ideia de SaaS, agora é o momento de tirar do papel.</p>
    `,
    date: '24 Mar, 2026',
    readTime: '5 min',
    category: 'Estratégia',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Lucas Kytrona',
      role: 'CEO & Lead Architect',
      avatar: 'https://i.pravatar.cc/150?u=lucas'
    }
  },
  {
    id: 'design-tendencias-2026',
    title: 'Tendências de Design para 2026: Além do Minimalismo',
    excerpt: 'O minimalismo está evoluindo. Conheça o "Brutalismo Refinado" e como a profundidade visual está transformando a experiência do usuário.',
    content: `
      <p>O design digital está passando por uma revolução. Após anos de minimalismo extremo e interfaces "limpas" que acabaram se tornando genéricas, 2026 marca o retorno da personalidade e da profundidade visual.</p>
      
      <h2>O Surgimento do Brutalismo Refinado</h2>
      <p>Estamos vendo uma mistura de tipografias ousadas, grids visíveis e cores vibrantes, mas com uma camada de refinamento técnico. Não é mais sobre ser "sujo", mas sobre ser "marcante".</p>
      
      <h2>Micro-interações com Propósito</h2>
      <p>As animações não são mais apenas decorativas. Elas guiam o olhar do usuário e fornecem feedback tátil virtual, tornando a navegação uma experiência sensorial.</p>
      
      <h2>Interfaces Adaptativas</h2>
      <p>O design agora se adapta não apenas ao tamanho da tela, mas ao contexto do usuário, utilizando IA para reorganizar elementos baseados na intenção de uso imediata.</p>
      
      <p>Na Kytrona, nossa filosofia de "Estética Marcante" antecipa essas tendências para garantir que seu produto não seja apenas funcional, mas inesquecível.</p>
    `,
    date: '20 Mar, 2026',
    readTime: '4 min',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Ana Clara',
      role: 'Head of Design',
      avatar: 'https://i.pravatar.cc/150?u=ana'
    }
  },
  {
    id: 'performance-web-vendas',
    title: 'Como a Performance Web impacta diretamente seu faturamento',
    excerpt: 'Cada milissegundo conta. Estudos mostram que sites que carregam em menos de 2 segundos convertem até 3x mais que a média.',
    content: `
      <p>Você pode ter o melhor produto do mundo e o design mais bonito, mas se o seu site demora para carregar, você está jogando dinheiro fora. Em 2026, a paciência do usuário é medida em milissegundos.</p>
      
      <h2>A Regra dos 2 Segundos</h2>
      <p>Dados do Google indicam que a probabilidade de rejeição aumenta em 32% à medida que o tempo de carregamento da página vai de 1 segundo para 3 segundos.</p>
      
      <h2>SEO e Core Web Vitals</h2>
      <p>O Google prioriza sites rápidos. Uma boa performance não é apenas para o usuário, é para o algoritmo. Estar no topo das buscas depende diretamente da sua pontuação de performance.</p>
      
      <h2>Mobile First é Passado, Mobile Only é a Realidade</h2>
      <p>A maioria das conversões acontece em dispositivos móveis, muitas vezes em conexões instáveis. Seu código precisa ser leve e otimizado para essas condições.</p>
      
      <p>Nossos sistemas na Kytrona são construídos com foco em performance extrema, utilizando as tecnologias mais modernas de renderização e cache.</p>
    `,
    date: '15 Mar, 2026',
    readTime: '6 min',
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Gabriel Silva',
      role: 'CTO',
      avatar: 'https://i.pravatar.cc/150?u=gabriel'
    }
  }
];

// --- Helper Components ---

const Logo = ({ className = "w-8 h-8", iconClassName = "w-5 h-5" }: { className?: string; iconClassName?: string }) => (
  <div className={cn("bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20", className)}>
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("text-surface", iconClassName)}
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  </div>
);

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

const Parallax = ({ children, offset = 50 }: { children: React.ReactNode; offset?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

const FloatingElement = ({ children, className, speed = 1 }: { children?: React.ReactNode; className?: string; speed?: number }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 5000], [0, -500 * speed]);

  return (
    <motion.div style={{ y }} className={cn("absolute pointer-events-none", className)}>
      {children}
    </motion.div>
  );
};

const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
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

const Navbar = ({ onNavigate, onOpenPopup }: { onNavigate: (page: string) => void; onOpenPopup: () => void }) => {
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
  const [cursorHover, setCursorHover] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (id === 'insights') {
      onNavigate('insights');
    } else {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

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
          <div className="flex items-center gap-3 group cursor-pointer magnetic-btn" onClick={() => onNavigate('home')}>
            <div className="transition-transform duration-500 rotate-3 group-hover:rotate-12">
              <Logo />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-none tracking-tighter uppercase">KYTRONA <span className="text-brand">TECNOLOGIA</span></span>
              <span className="text-[8px] uppercase tracking-widest text-muted">Software, Produtos e Presença Digital</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-muted uppercase tracking-widest">
            {[
              { name: 'Serviços', id: 'servicos' },
              { name: 'Portfólio', id: 'portfolio' },
              { name: 'Insights', id: 'insights' },
              { name: 'Processo', id: 'processo' }
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={cn(
                  "hover:text-brand transition-colors relative group font-mono text-[10px] magnetic-btn px-2 py-1",
                  activeSection === item.id ? "text-brand" : ""
                )}
              >
                <span>{item.name}</span>
                <motion.span 
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-brand transition-all",
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            ))}
            <MagneticButton 
              onClick={onOpenPopup}
              className="bg-brand text-surface px-5 py-2 rounded-full hover:scale-105 transition-all duration-300 font-bold text-[10px]"
            >
              ANÁLISE GRÁTIS
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
                onClick={(e) => handleLinkClick(e, item.id)}
                className="text-3xl font-display font-bold uppercase tracking-tighter hover:text-brand transition-colors"
              >
                {item.name}
              </a>
            ))}
            <MagneticButton 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPopup();
              }}
              className="px-10 py-5 bg-brand text-surface rounded-full font-bold text-lg uppercase tracking-widest mt-8"
            >
              Análise Grátis
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const VideoBackground = memo(() => {
  const [activeVideo, setActiveVideo] = useState(1);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoUrl = simuVideo;

  useEffect(() => {
    // Início imediato do primeiro vídeo
    if (videoRef1.current) {
      videoRef1.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    if (!v1 || !v2) return;

    let rafId: number;
    const fadeTime = 1.5; // segundos antes do fim para iniciar o crossfade

    const checkTime = () => {
      const active = activeVideo === 1 ? v1 : v2;
      const next = activeVideo === 1 ? v2 : v1;

      if (active.duration > 0) {
        const timeLeft = active.duration - active.currentTime;
        
        // Inicia o próximo vídeo um pouco antes do atual acabar
        if (timeLeft <= fadeTime && next.paused) {
          next.currentTime = 0;
          next.play().then(() => {
            setActiveVideo(activeVideo === 1 ? 2 : 1);
          }).catch(() => {});
        }
      }
      rafId = requestAnimationFrame(checkTime);
    };

    rafId = requestAnimationFrame(checkTime);
    return () => cancelAnimationFrame(rafId);
  }, [activeVideo]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-surface gsap-video-parallax">
      <div className="absolute inset-0 transform-gpu">
        <video
          ref={videoRef1}
          muted
          playsInline
          preload="auto"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out",
            activeVideo === 1 ? "opacity-100" : "opacity-0"
          )}
          style={{ transform: 'translate3d(0,0,0)' }}
          src={videoUrl}
        />
        <video
          ref={videoRef2}
          muted
          playsInline
          preload="auto"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out",
            activeVideo === 2 ? "opacity-100" : "opacity-0"
          )}
          style={{ transform: 'translate3d(0,0,0)' }}
          src={videoUrl}
        />
      </div>

      {/* Overlay otimizado: Gradientes são mais leves que backdrop-blur em telas cheias */}
      <div className="absolute inset-0 bg-surface/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface/40 via-transparent to-surface/40" />
    </div>
  );
});
VideoBackground.displayName = 'VideoBackground';

const Hero = ({ onOpenPopup }: { onOpenPopup: () => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 1200], [0, 400]);
  const heroOpacity = useTransform(scrollY, [800, 1200], [1, 0]);
  const bgScale = useTransform(scrollY, [0, 1500], [1, 1.4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const orb1X = useTransform(mouseX, [0, window.innerWidth], [-40, 40]);
  const orb1Y = useTransform(mouseY, [0, window.innerHeight], [-40, 40]);
  const orb2X = useTransform(mouseX, [0, window.innerWidth], [40, -40]);
  const orb2Y = useTransform(mouseY, [0, window.innerHeight], [40, -40]);

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden px-6">
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 -z-20">
        <VideoBackground />
      </motion.div>
      
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div style={{ x: orb1X, y: orb1Y }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand/20 blur-[120px] rounded-full will-change-transform" />
        <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-soft/10 blur-[120px] rounded-full will-change-transform" />
        
        {/* GTA VI Style Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,126,34,0.1)_0%,transparent_70%)]" />
      </div>

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-12">
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] bg-brand" 
              />
              <span className="text-brand font-mono text-[10px] uppercase tracking-[0.6em] font-bold">
                Premium Software House
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-display leading-[0.8] tracking-tighter mb-12 select-none">
              <span className="block overflow-hidden">
                <span className="block gsap-split-text">Transformamos</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block gsap-split-text italic font-normal text-white/90">visão</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block gsap-split-text text-brand">autoridade</span>
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-muted text-xl md:text-2xl max-w-xl mb-16 font-light leading-relaxed"
            >
              Design brutalista, performance extrema e estratégia de mercado. Não apenas sites, mas ativos digitais de alto valor.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-wrap gap-8"
            >
              <MagneticButton 
                onClick={onOpenPopup}
                className="magnetic-btn px-16 py-8 bg-brand text-surface rounded-none font-bold text-sm uppercase tracking-[0.3em] hover:bg-white transition-colors duration-500 shadow-2xl shadow-brand/20"
              >
                Iniciar Projeto
              </MagneticButton>
              <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-16 py-8 border border-white/10 text-white font-bold text-sm uppercase tracking-[0.3em] hover:bg-white/5 transition-colors backdrop-blur-sm"
              >
                Ver Portfólio
              </button>
            </motion.div>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative perspective-1000 hidden lg:block"
        >
          <TiltCard className="w-full">
            <div className="relative rounded-[3rem] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand-soft/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="flex justify-between items-center mb-10">
                <span className="px-4 py-1.5 rounded-full bg-brand/20 border border-brand/30 text-[10px] font-bold uppercase tracking-widest text-brand">Build + Branding</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              </div>

              <div className="aspect-[4/3] rounded-3xl bg-surface/40 border border-white/10 relative overflow-hidden mb-10 group-hover:border-brand/30 transition-colors duration-500">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                
                <motion.div 
                  animate={{ 
                    y: [0, -30, 0], 
                    x: [0, 15, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-12 left-12 w-3/4 h-3/5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center" 
                >
                  <Zap className="w-12 h-12 text-brand/40" />
                </motion.div>
                
                <motion.div 
                  animate={{ 
                    y: [0, 30, 0], 
                    x: [0, -15, 0],
                    rotate: [0, -2, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-12 right-12 w-1/2 h-2/3 bg-brand/10 rounded-2xl border border-brand/20 backdrop-blur-xl shadow-2xl" 
                />
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-brand transition-colors">Linguagem visual própria</h3>
                  <p className="text-sm text-muted max-w-[280px] leading-relaxed">Direção de arte, UX, frontend refinado e arquitetura sólida pela Kytrona.</p>
                </div>
                <div className="flex gap-2">
                  {['Web', 'SaaS'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

const TechStack = () => {
  const techs = [
    { name: "React 18", icon: Code2, desc: "Interfaces reativas e performáticas" },
    { name: "TypeScript", icon: Terminal, desc: "Tipagem estrita para código robusto" },
    { name: "Tailwind CSS", icon: Layers, desc: "Estilização utilitária e escalável" },
    { name: "Framer Motion", icon: Zap, desc: "Animações fluidas e interativas" },
    { name: "Node.js", icon: Cpu, desc: "Backend escalável e de alta performance" },
    { name: "PostgreSQL", icon: Database, desc: "Banco de dados relacional sólido" },
    { name: "Vite", icon: Rocket, desc: "Build system ultra-rápido" },
    { name: "Firebase", icon: ShieldCheck, desc: "Infraestrutura serverless segura" }
  ];

  return (
    <div className="py-32 border-y border-white/10 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
          <ScrollReveal>
            <span className="text-brand font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">
              Tech Stack / 002
            </span>
            <h2 className="text-5xl md:text-7xl font-display leading-[0.85] tracking-tighter">
              Arquitetura <span className="italic font-normal">sólida</span> para produtos de <span className="text-brand">elite</span>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted text-sm font-mono uppercase tracking-widest max-w-[250px] md:text-right">
              [ Stack Moderna ]
              [ Escalabilidade ]
              [ Performance ]
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {techs.map((tech, idx) => (
            <div 
              key={idx}
              className="group p-10 border-r border-b border-white/10 hover:bg-brand/[0.02] transition-colors relative overflow-hidden gsap-reveal"
            >
              <div className="absolute top-4 right-4 text-[8px] font-mono text-muted/30 group-hover:text-brand/40 transition-colors">
                MOD_00{idx + 1}
              </div>
              <div className="flex flex-col gap-6 relative z-10">
                <div className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center group-hover:border-brand/50 group-hover:bg-brand/5 transition-all duration-500">
                  <tech.icon className="w-6 h-6 text-muted group-hover:text-brand transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-brand transition-colors">{tech.name}</h3>
                  <p className="text-xs text-muted leading-relaxed group-hover:text-white/70 transition-colors">{tech.desc}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </div>
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
    <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <ScrollReveal>
          <div className="lg:sticky lg:top-32">
            <span className="text-brand font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">
              FAQ / 004
            </span>
            <h2 className="text-5xl md:text-7xl font-display leading-[0.85] tracking-tighter mb-10 gsap-reveal">
              Transparência em <span className="italic font-normal text-brand">cada etapa</span> do processo.
            </h2>
            <p className="text-muted text-lg font-light leading-relaxed max-w-md gsap-reveal">
              Dúvidas comuns sobre como elevamos o patamar digital do seu negócio.
            </p>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="group gsap-reveal">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-10 text-left flex justify-between items-start gap-8"
              >
                <div className="flex gap-6">
                  <span className="text-brand font-mono text-xs pt-1">0{idx + 1}</span>
                  <span className="font-display font-bold text-2xl md:text-3xl tracking-tight group-hover:text-brand transition-colors">{faq.q}</span>
                </div>
                <motion.div 
                  animate={{ rotate: openIndex === idx ? 45 : 0 }}
                  className="pt-2"
                >
                  <Zap className={cn("w-6 h-6 transition-colors", openIndex === idx ? "text-brand" : "text-muted/30")} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 pb-10 text-muted text-lg font-light leading-relaxed max-w-2xl">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
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

const Services = ({ onOpenPopup }: { onOpenPopup: () => void }) => {
  const services = [
    {
      number: "01",
      title: "Sites de Alto Impacto",
      description: "Páginas que posicionam sua marca, valorizam seu serviço e guiam o usuário até a ação certa com clareza visual e narrativa editorial.",
      icon: Globe,
      tags: ["UX/UI", "Performance", "SEO"]
    },
    {
      number: "02",
      title: "SaaS & Plataformas",
      description: "Produtos com estrutura escalável, interface clara e experiência de uso que equilibra negócio e tecnologia.",
      icon: Cpu,
      tags: ["React", "Node.js", "Scalability"]
    },
    {
      number: "03",
      title: "Sistemas Sob Demanda",
      description: "Soluções para operações internas, automações e dashboards que economizam tempo.",
      icon: Database,
      tags: ["Automation", "Dashboards", "Internal Tools"]
    },
    {
      number: "04",
      title: "Identidade & Motion",
      description: "Microinterações, camadas visuais e ritmo de navegação pensados para manter a atenção.",
      icon: Zap,
      tags: ["Motion", "Branding", "3D Effects"]
    }
  ];

  return (
    <section id="servicos" className="py-32 border-t border-white/10 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <ScrollReveal>
              <span className="text-brand font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block gsap-reveal">
                Capabilities / 001
              </span>
              <h2 className="text-6xl md:text-9xl font-display leading-[0.85] tracking-tighter overflow-hidden">
                <span className="block gsap-split-text">O que <span className="italic font-normal">dominamos</span></span>
                <span className="block gsap-split-text">para elevar sua marca.</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col items-start md:items-end gap-8 gsap-reveal">
              <p className="text-muted text-sm font-mono uppercase tracking-widest max-w-[200px] md:text-right">
                [ 4 Especialidades ]
                [ Design Brutalista ]
                [ Performance Extrema ]
              </p>
              <MagneticButton 
                onClick={onOpenPopup}
                className="px-12 py-6 bg-brand text-surface rounded-none font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors duration-500"
              >
                Consultoria
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="border-t border-white/10">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative border-b border-white/10 py-20 hover:bg-brand/[0.02] transition-all duration-700 cursor-default px-6"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-1">
                <span className="text-brand font-mono text-4xl font-bold opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                  {service.number}
                </span>
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-none border border-brand/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-500">
                    <service.icon className="w-6 h-6 text-brand group-hover:text-surface transition-colors" />
                  </div>
                  <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-700">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="lg:col-span-4">
                <p className="text-muted text-lg font-light leading-relaxed group-hover:text-white transition-colors duration-500">
                  {service.description}
                </p>
              </div>
              <div className="lg:col-span-2 flex justify-end">
                <div className="flex flex-wrap gap-2 justify-end">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border border-white/10 text-[9px] font-mono uppercase tracking-widest group-hover:border-brand/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Animated Background Line */}
            <motion.div 
              className="absolute bottom-0 left-0 h-[2px] bg-brand w-0 group-hover:w-full transition-all duration-1000 ease-out"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Process = ({ onOpenPopup }: { onOpenPopup: () => void }) => {
  const steps = [
    {
      title: "Imersão Estratégica",
      description: "Entendemos profundamente seu negócio, objetivos e dores para traçar a melhor estratégia técnica e visual.",
      number: "01",
      tags: ["Discovery", "Market Analysis", "UX Strategy"]
    },
    {
      title: "Direção de Arte & UX",
      description: "Defino atmosfera, tipografia, paleta, hierarquia e comportamento da interface para criar uma linguagem única.",
      number: "02",
      tags: ["Visual Identity", "Prototyping", "Motion Design"]
    },
    {
      title: "Construção & Engenharia",
      description: "Codificação ágil com entregas incrementais, garantindo transparência e qualidade em cada sprint de desenvolvimento.",
      number: "03",
      tags: ["React/Next.js", "Clean Code", "Performance"]
    },
    {
      title: "Refino & Lançamento",
      description: "Ajusto interações, narrativa visual e detalhes que elevam a percepção de qualidade antes do deploy final.",
      number: "04",
      tags: ["QA Testing", "SEO Optimization", "Final Polish"]
    }
  ];

  return (
    <section id="processo" className="py-32 border-t border-white/10 relative overflow-hidden">
      <FloatingElement speed={0.1} className="top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start relative z-10">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <ScrollReveal>
              <span className="text-brand font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">
                Methodology / 003
              </span>
              <h2 className="text-6xl md:text-8xl font-display leading-[0.85] tracking-tighter mb-10 gsap-reveal">
                Da ideia ao produto com um processo <span className="text-brand italic">enxuto</span> e orientado a resultado.
              </h2>
              <p className="text-muted text-lg font-light leading-relaxed mb-12 max-w-md gsap-reveal">
                Eliminamos o excesso para focar no que realmente gera valor e autoridade para sua marca no ambiente digital.
              </p>
              <MagneticButton 
                onClick={onOpenPopup}
                className="px-12 py-6 bg-brand text-surface rounded-none font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors duration-500"
              >
                Solicitar Análise Grátis
              </MagneticButton>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 space-y-0 border-l border-white/10">
            {steps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="group relative pl-12 py-16 border-b border-white/10 hover:bg-brand/[0.02] transition-colors">
                  {/* Vertical Rail Dot */}
                  <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-[9px] h-[9px] bg-surface border border-white/30 group-hover:bg-brand group-hover:border-brand transition-all duration-500" />
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="max-w-md">
                      <span className="text-brand font-mono text-xs mb-4 block">Step {step.number}</span>
                      <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 group-hover:translate-x-2 transition-transform duration-500">{step.title}</h3>
                      <p className="text-muted text-lg font-light leading-relaxed mb-8 group-hover:text-white transition-colors">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 border border-white/10 text-[9px] font-mono uppercase tracking-widest group-hover:border-brand/30 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-8xl font-display font-black text-white/[0.02] group-hover:text-brand/[0.05] transition-colors duration-700 leading-none select-none">
                      {step.number}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const projects = [
    {
      title: "Apex Finance",
      category: "Consultoria & Wealth Management",
      description: "Plataforma de alta performance para gestores de patrimônio. Interface ultra-limpa com visualização de ativos em tempo real e relatórios automatizados.",
      color: "from-brand/20 to-brand-soft/20",
      featured: true,
      type: "landing",
      badge: "Fintech",
      colSpan: "lg:col-span-2",
      siteName: "apex.finance"
    },
    {
      title: "Nexus ERP Cloud",
      category: "Gestão Industrial 4.0",
      description: "Dashboard analítico para controle de produção e logística. Integração total com IoT e monitoramento de KPIs em tempo real.",
      color: "from-brand/10 to-brand-soft/10",
      featured: true,
      type: "dashboard",
      badge: "Enterprise",
      colSpan: "lg:col-span-2 lg:row-span-2",
      siteName: "nexus.cloud"
    },
    {
      title: "GreenPulse App",
      category: "Sustentabilidade & ESG",
      description: "Ecossistema mobile para rastreamento de pegada de carbono. Gamificação e recompensas para práticas sustentáveis corporativas.",
      color: "from-emerald-500/10 to-brand/10",
      featured: false,
      type: "mobile",
      badge: "ESG",
      colSpan: "lg:col-span-1 lg:row-span-1",
      siteName: "greenpulse.io"
    },
    {
      title: "Velo Luxury Store",
      category: "E-commerce de Luxo",
      description: "Loja virtual headless com foco em experiência sensorial. Carregamento instantâneo e checkout otimizado para alta conversão.",
      color: "from-brand/20 to-brand-soft/20",
      featured: false,
      type: "ecommerce",
      badge: "Retail",
      colSpan: "lg:col-span-1 lg:row-span-1",
      siteName: "velo.store"
    },
    {
      title: "Aura LXP",
      category: "EdTech & Treinamento",
      description: "Plataforma de aprendizado imersivo para times de elite. Trilhas personalizadas com IA e análise de progresso detalhada.",
      color: "from-brand/20 to-brand-soft/20",
      featured: false,
      type: "analytics",
      badge: "EdTech",
      colSpan: "lg:col-span-2 lg:row-span-1",
      siteName: "aura.edu"
    }
  ];

  const renderBrowserContent = (project: any) => {
    const { type, siteName } = project;
    switch (type) {
      case 'landing':
        return (
          <div className="flex-1 p-0 flex flex-col overflow-hidden bg-surface">
            <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-white/[0.02]">
              <div className="flex gap-1.5 items-center">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">{siteName}</span>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-1 bg-white/10 rounded-full" />
                <div className="w-10 h-1 bg-white/10 rounded-full" />
              </div>
            </div>
            <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden">
              <div className="space-y-3">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "90%" }}
                  className="h-8 bg-gradient-to-r from-brand/30 to-transparent rounded-lg" 
                />
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "70%" }}
                  transition={{ delay: 0.1 }}
                  className="h-4 bg-white/10 rounded-lg" 
                />
              </div>
              <div className="h-48 w-full bg-brand/5 rounded-3xl border border-brand/10 flex items-center justify-center relative overflow-hidden group/hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,124,82,0.15)_0%,transparent_70%)]" />
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-brand/20 flex items-center justify-center border border-brand/30">
                    <ArrowUpRight className="w-8 h-8 text-brand" />
                  </div>
                  <div className="h-2 w-32 bg-brand/40 rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-28 bg-white/[0.02] rounded-2xl border border-white/5 p-4 flex flex-col gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand/10" />
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-white/10 rounded-full" />
                      <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="flex-1 p-0 flex overflow-hidden bg-surface">
            <div className="w-16 border-r border-white/5 bg-white/[0.02] flex flex-col items-center py-6 gap-6">
              <div className="w-8 h-8 rounded-xl bg-brand/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded bg-brand" />
              </div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-brand/20 transition-colors">
                  <div className="w-3 h-3 rounded-sm bg-white/10" />
                </div>
              ))}
            </div>
            <div className="flex-1 p-8 flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-brand uppercase tracking-widest">{siteName}</span>
                  <div className="h-4 w-32 bg-white/10 rounded-full" />
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Revenue", val: "R$ 452k", color: "brand" },
                  { label: "Active", val: "12.8k", color: "white" },
                  { label: "Growth", val: "+14%", color: "white" }
                ].map((stat, i) => (
                  <div key={i} className="h-24 bg-white/[0.02] rounded-2xl border border-white/5 p-5 flex flex-col justify-between group/stat hover:border-brand/30 transition-all">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-muted">{stat.label}</span>
                    <span className={cn("text-xl font-display font-bold", stat.color === 'brand' ? "text-brand" : "text-white")}>{stat.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-white/[0.02] rounded-3xl border border-white/5 p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-3 w-24 bg-white/10 rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-brand" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-full bg-white/10 rounded-full" />
                        <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
                      </div>
                      <div className="w-12 h-4 bg-brand/10 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'mobile':
        return (
          <div className="flex-1 p-0 flex flex-col items-center justify-center bg-surface relative overflow-hidden">
            <div className="w-52 h-[420px] bg-black rounded-[40px] border-[8px] border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-3xl z-20" />
              <div className="absolute inset-0 p-6 flex flex-col gap-6 bg-gradient-to-b from-emerald-500/20 to-surface">
                <div className="mt-8 flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                    <Globe className="w-10 h-10 text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{siteName}</span>
                  <div className="h-2 w-24 bg-white/20 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-20 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/40" />
                      <div className="h-1 w-10 bg-white/10 rounded-full" />
                    </div>
                  ))}
                </div>
                <div className="mt-auto h-14 w-full bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <div className="h-1.5 w-16 bg-white/40 rounded-full" />
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/10 blur-[120px] -z-10" />
          </div>
        );
      case 'ecommerce':
        return (
          <div className="flex-1 p-0 flex flex-col overflow-hidden bg-surface">
            <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded bg-brand/20" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{siteName}</span>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-white/40" />
                </div>
              </div>
            </div>
            <div className="flex-1 p-8 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="aspect-square bg-white/5 rounded-[2rem] border border-white/10 relative overflow-hidden group/prod">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/30 to-transparent opacity-0 group-hover/prod:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Rocket className="w-16 h-16 text-brand/20 group-hover/prod:text-brand/40 transition-all duration-500" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 h-4 bg-white/10 rounded-full" />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="h-8 w-full bg-white/10 rounded-xl" />
                  <div className="h-4 w-2/3 bg-white/5 rounded-lg" />
                  <div className="h-4 w-1/2 bg-white/5 rounded-lg" />
                  <div className="mt-auto h-14 w-full bg-brand rounded-2xl flex items-center justify-center">
                    <div className="h-2 w-24 bg-surface/40 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square bg-white/5 rounded-2xl border border-white/10 hover:border-brand/30 transition-colors" />
                ))}
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="flex-1 p-8 flex flex-col gap-8 bg-surface">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-2xl bg-brand/20 flex items-center justify-center border border-brand/30">
                  <BarChart3 className="w-6 h-6 text-brand" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-brand uppercase tracking-widest">{siteName}</span>
                  <div className="h-4 w-32 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-4 py-1.5 bg-brand/10 rounded-full border border-brand/20 text-[9px] font-mono text-brand uppercase tracking-widest animate-pulse">Live Data</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 bg-white/[0.02] rounded-2xl border border-white/5 p-4 flex flex-col justify-between">
                  <div className="h-1 w-8 bg-white/10 rounded-full" />
                  <div className="h-3 w-16 bg-white/20 rounded-full" />
                </div>
              ))}
            </div>
            <div className="flex-1 flex items-end gap-3 px-6 pb-6 border-b border-white/5 relative">
              <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none opacity-5">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-[1px] w-full bg-white" />)}
              </div>
              {[40, 70, 50, 90, 60, 100, 80, 50, 70, 95, 65, 85].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                  className="flex-1 bg-gradient-to-t from-brand/40 to-brand rounded-t-xl relative group/bar hover:scale-x-110 transition-transform" 
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand text-surface text-[9px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-xl">
                    {h}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between px-4">
              {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'].map(m => (
                <span key={m} className="text-[9px] font-mono text-muted uppercase tracking-widest">{m}</span>
              ))}
            </div>
          </div>
        );
      case 'motion':
        return (
          <div className="flex-1 p-0 flex flex-col items-center justify-center overflow-hidden relative bg-surface">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,124,82,0.05)_0%,transparent_70%)]" />
            
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] border border-brand/10 rounded-full"
            />
            
            <motion.div 
              animate={{ 
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200px] h-[200px] border border-brand/5 rounded-full"
            />

            <div className="z-10 flex flex-col items-center gap-8">
              <div className="flex gap-4">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      y: [0, -20, 0],
                      borderColor: ["rgba(214,124,82,0.2)", "rgba(214,124,82,1)", "rgba(214,124,82,0.2)"]
                    }}
                    transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center bg-surface/50 backdrop-blur-xl"
                  >
                    <div className={cn("w-6 h-6 rounded-full", i === 1 ? "bg-brand" : "bg-white/10")} />
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-brand to-transparent"
                  />
                </div>
                <span className="text-[8px] font-mono text-brand uppercase tracking-[0.5em] animate-pulse">Processing Experience</span>
              </div>
            </div>

            {/* Floating Particles */}
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div
                key={i}
                animate={{ 
                  x: [Math.random() * 100, Math.random() * -100],
                  y: [Math.random() * 100, Math.random() * -100],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
                className="absolute w-1 h-1 bg-brand rounded-full"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="portfolio" className="portfolio-section relative bg-surface">
      <div className="portfolio-sticky h-screen sticky top-0 flex items-center overflow-hidden">
        <div className="portfolio-container flex gap-12 px-[10vw]">
          <div className="portfolio-intro flex flex-col justify-center min-w-[40vw] pr-20">
            <span className="text-brand text-[10px] uppercase tracking-[0.4em] font-bold mb-8 block gsap-reveal">Selected Works / 002</span>
            <h2 className="text-7xl md:text-9xl font-display font-bold leading-[0.85] tracking-tighter mb-12 gsap-reveal">
              Projetos que <br />
              <span className="text-brand italic">definem o futuro.</span>
            </h2>
            <p className="text-muted text-xl font-light leading-relaxed max-w-md gsap-reveal">
              Uma seleção curada de soluções digitais que combinam estética brutalista com performance extrema.
            </p>
          </div>

          {projects.map((project, idx) => (
            <div
              key={idx}
              className="project-card min-w-[80vw] md:min-w-[45vw] h-[70vh] relative group overflow-hidden border border-white/10 bg-surface/50 backdrop-blur-sm flex flex-col cursor-none"
            >
              <div className={cn("flex-1 relative overflow-hidden p-12", project.color)}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                <div className="absolute top-6 left-6 flex gap-4 opacity-40 z-20">
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest">00{idx + 1}</span>
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest">{project.badge}</span>
                </div>

                <motion.div 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="w-full h-full bg-surface/40 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden flex flex-col relative z-10"
                >
                  <div className="h-6 bg-white/5 border-b border-white/10 flex items-center px-3 gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    {renderBrowserContent(project)}
                  </div>
                </motion.div>
              </div>

              <div className="p-12 bg-surface/80 backdrop-blur-md border-t border-white/10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-brand font-mono text-[10px] uppercase tracking-[0.4em] font-bold">{project.category}</span>
                </div>
                <h3 className="text-4xl font-display tracking-tight mb-6 group-hover:text-brand transition-colors duration-500">{project.title}</h3>
                <div className="flex items-center justify-between">
                  <MagneticButton 
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:text-brand transition-colors"
                  >
                    Ver Detalhes <ArrowUpRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}

          <div className="portfolio-outro flex flex-col justify-center min-w-[40vw] pl-20">
            <h2 className="text-6xl md:text-8xl font-display font-bold leading-[0.85] tracking-tighter mb-12">
              Seu projeto <br />
              <span className="text-brand italic">é o próximo?</span>
            </h2>
            <MagneticButton 
              className="px-12 py-6 bg-brand text-surface rounded-none font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors duration-500 w-fit"
            >
              Vamos Conversar
            </MagneticButton>
          </div>
        </div>
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className={cn("aspect-video rounded-3xl bg-gradient-to-br relative overflow-hidden flex flex-col border border-white/10", selectedProject.color)}>
                   <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                   <div className="h-6 bg-white/5 border-b border-white/10 flex items-center px-3 gap-1.5 relative z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  </div>
                   <div className="flex-1 relative z-10 overflow-hidden flex flex-col">
                    {renderBrowserContent(selectedProject)}
                   </div>
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
      quote: "A Kytrona conseguiu traduzir o que a gente queria passar sem cair no visual comum de tecnologia. O projeto ficou elegante, rápido e com muita presença.",
      author: "Marina Costa",
      role: "Direção de Marca",
      company: "Lumina Studio"
    },
    {
      quote: "O resultado teve impacto real na forma como nossos clientes perceberam o negócio. Não foi só um site, foi reposicionamento estratégico.",
      author: "Lucas Almeida",
      role: "Founder",
      company: "Nexus Digital"
    },
    {
      quote: "Processo objetivo, comunicação clara e um nível de cuidado visual que realmente diferencia. A entrega parece produto de empresa global.",
      author: "Renata Siqueira",
      role: "COO",
      company: "EcoTrack"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="depoimentos" className="py-32 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <span className="text-brand font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">
                Testimonials / 005
              </span>
              <h2 className="text-6xl md:text-8xl font-display leading-[0.85] tracking-tighter mb-10">
                O que dizem sobre nossa <span className="italic font-normal text-brand">entrega</span>.
              </h2>
              <div className="flex gap-4">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "w-12 h-1 transition-all duration-500",
                      activeIndex === idx ? "bg-brand" : "bg-white/10"
                    )}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative"
              >
                <Quote className="absolute -top-12 -left-12 w-24 h-24 text-brand/5" />
                <p className="text-3xl md:text-5xl font-display font-light leading-tight mb-12 italic text-white/90">
                  "{testimonials[activeIndex].quote}"
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[1px] bg-brand" />
                  <div>
                    <h4 className="text-xl font-bold text-white">{testimonials[activeIndex].author}</h4>
                    <p className="text-xs text-muted uppercase tracking-widest">
                      {testimonials[activeIndex].role} @ {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Featured = () => {
  return (
    <section className="py-32 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <ScrollReveal>
              <div className="relative aspect-[16/10] group overflow-hidden">
                <div className="absolute inset-0 bg-brand/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src="https://picsum.photos/seed/kytrona-featured/1200/800" 
                  alt="Featured Composition" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                {/* Technical Overlay */}
                <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10px] font-mono text-brand uppercase tracking-widest bg-surface/80 backdrop-blur-md px-3 py-1 self-start">Visual Direction / 001</span>
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest bg-surface/80 backdrop-blur-md px-3 py-1 self-start">Mineral Palette</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <ScrollReveal delay={0.2}>
              <span className="text-brand font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">
                Visual Identity / 006
              </span>
              <h2 className="text-5xl md:text-7xl font-display leading-[0.85] tracking-tighter mb-10">
                Uma composição que mistura <span className="italic font-normal text-brand">editorial</span> e interface.
              </h2>
              <p className="text-muted text-lg font-light leading-relaxed mb-12">
                A proposta aqui foge do clichê neon e da estética “tech genérica”. A linguagem visual usa tons minerais, contrastes suaves e superfícies translúcidas para parecer sofisticada sem ficar fria.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-none border border-brand/30 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Estratégia de Valor</h4>
                    <p className="text-sm text-muted">Seu serviço explicado com mais valor percebido através de uma narrativa visual coerente.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-none border border-brand/30 flex items-center justify-center shrink-0">
                    <Cpu className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Engenharia de Elite</h4>
                    <p className="text-sm text-muted">Base técnica pronta para evoluir, com performance extrema e código limpo.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ onOpenPopup }: { onOpenPopup: () => void }) => {
  const [copied, setCopied] = useState(false);
  const email = "contato@kytronatecnologia.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contato" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <span className="text-brand text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Vamos construir algo memorável</span>
          <h2 className="text-6xl md:text-8xl font-display font-bold leading-[0.85] tracking-tighter mb-12">
            SE A IDEIA É <span className="text-brand italic">IMPRESSIONAR</span> <br /> 
            ESSE É O CAMINHO.
          </h2>
          <p className="text-muted text-xl font-light leading-relaxed max-w-md mb-12">
            Estamos prontos para transformar sua visão em uma autoridade digital inquestionável.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative z-10 p-1 bg-gradient-to-br from-brand/20 to-transparent rounded-[3rem]"
        >
          <div className="bg-surface rounded-[2.8rem] p-12 md:p-16 border border-white/10">
            <div className="flex flex-col gap-8">
              <MagneticButton 
                onClick={onOpenPopup}
                className="w-full py-8 bg-brand text-surface rounded-2xl font-bold text-xl hover:scale-[1.02] transition-all shadow-2xl shadow-brand/20 flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                Solicitar Análise Grátis <Zap className="w-5 h-5" />
              </MagneticButton>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={copyEmail}
                  className="p-6 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex flex-col items-center gap-3 group relative"
                >
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                    {copied ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-brand">✓</motion.span> : <Mail className="w-5 h-5 text-brand" />}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">E-mail</span>
                  <span className="text-xs truncate w-full text-center">{email}</span>
                </button>

                <a 
                  href="https://wa.me/553598403870" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-6 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex flex-col items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                    <MessageSquare className="w-5 h-5 text-brand" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">WhatsApp</span>
                  <span className="text-xs">+55 35 98403-870</span>
                </a>
              </div>
              
              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand/10 hover:border-brand/30 transition-all cursor-pointer">
                      <div className="w-1 h-1 rounded-full bg-brand" />
                    </div>
                  ))}
                </div>
                <span className="text-[8px] font-mono text-muted uppercase tracking-widest">Kytrona Studio / 2026</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <footer className="py-20 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <Logo className="w-8 h-8 rounded-lg" />
          <span className="font-display font-bold text-2xl tracking-tighter uppercase">KYTRONA <span className="text-brand">TECNOLOGIA</span></span>
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
          <a href="mailto:contato@kytronatecnologia.com" className="hover:text-brand transition-colors">E-mail</a>
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
        <div className="flex flex-col gap-4 text-sm text-muted">
          <button onClick={() => onNavigate('insights')} className="hover:text-brand transition-colors text-left">Insights</button>
          <button onClick={() => onNavigate('privacy')} className="hover:text-brand transition-colors text-left">Privacidade</button>
          <button onClick={() => onNavigate('terms')} className="hover:text-brand transition-colors text-left">Termos</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-muted text-[10px] uppercase tracking-widest">
        © {new Date().getFullYear()} Kytrona Tecnologia. Todos os direitos reservados.
      </p>
      <div className="flex gap-4">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-muted">Disponível para novos projetos</span>
      </div>
    </div>
  </footer>
);

const Insights: React.FC<{ onSelectPost: (post: BlogPost) => void }> = ({ onSelectPost }) => {
  return (
    <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
        <div className="max-w-3xl">
          <ScrollReveal>
            <span className="text-brand font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">
              Insights & Strategy / 007
            </span>
            <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-[0.85] mb-8">
              Pensamento <span className="text-brand italic">Digital</span> para Negócios.
            </h1>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.2}>
          <p className="text-muted max-w-xs text-sm font-mono uppercase tracking-widest md:text-right">
            [ Artigos ]
            [ Estratégia ]
            [ Tecnologia ]
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectPost(post)}
            className={cn(
              "group cursor-pointer p-10 border-white/10 hover:bg-brand/[0.02] transition-all duration-700",
              index === 0 ? "lg:col-span-8 lg:border-r lg:border-b" : "lg:col-span-4 lg:border-b",
              index === 1 ? "lg:border-r" : "",
              index === 2 ? "" : ""
            )}
          >
            <div className="flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden mb-10">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand text-surface text-[9px] font-mono uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-[9px] font-mono text-muted uppercase tracking-widest mb-6">
                  <span>{post.date}</span>
                  <span className="w-1 h-[1px] bg-brand" />
                  <span>{post.readTime} read</span>
                </div>
                <h3 className={cn(
                  "font-display font-bold tracking-tight mb-6 group-hover:text-brand transition-colors",
                  index === 0 ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
                )}>
                  {post.title}
                </h3>
                <p className="text-muted text-lg font-light leading-relaxed mb-10 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-10 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-none border border-white/10" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{post.author.name}</span>
                      <span className="text-[8px] text-muted uppercase tracking-widest">{post.author.role}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-brand opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const BlogPostDetail: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-40 pb-20 px-6 max-w-4xl mx-auto"
    >
      <button onClick={onBack} className="flex items-center gap-2 text-brand font-bold uppercase tracking-widest text-xs mb-12 hover:gap-4 transition-all">
        <ArrowLeft className="w-4 h-4" /> Voltar para Insights
      </button>

      <div className="mb-12">
        <div className="flex items-center gap-4 text-xs text-brand font-bold uppercase tracking-[0.3em] mb-6">
          <span>{post.category}</span>
          <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
          <span className="text-muted">{post.date}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none mb-8">
          {post.title}
        </h1>
        <div className="flex items-center gap-4">
          <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border border-white/10" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white uppercase tracking-widest">{post.author.name}</span>
            <span className="text-xs text-muted uppercase tracking-widest">{post.author.role}</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-video rounded-3xl overflow-hidden mb-16 border border-white/5">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>

      <div 
        className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8 text-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-20 pt-20 border-t border-white/5">
        <div className="bg-white/5 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Gostou deste insight?</h3>
            <p className="text-muted text-sm">Transformamos essas estratégias em realidade para o seu negócio. Vamos conversar sobre seu próximo projeto?</p>
          </div>
          <MagneticButton className="px-8 py-4 bg-brand text-surface font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform">
            Iniciar Projeto
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
};

const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="pt-40 pb-20 px-6 max-w-4xl mx-auto"
  >
    <button onClick={onBack} className="flex items-center gap-2 text-brand font-bold uppercase tracking-widest text-xs mb-12 hover:gap-4 transition-all">
      <ArrowLeft className="w-4 h-4" /> Voltar para o início
    </button>
    <h1 className="text-5xl md:text-7xl font-display font-bold mb-12 tracking-tighter">Política de <span className="text-brand italic">Privacidade</span></h1>
    <div className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">1. Introdução</h2>
        <p>A Kytrona Tecnologia valoriza a sua privacidade. Esta política descreve como coletamos, usamos e protegemos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">2. Coleta de Dados</h2>
        <p>Coletamos informações que você nos fornece voluntariamente através de nossos formulários de contato, como nome, e-mail e telefone. Também coletamos dados técnicos de navegação (cookies) para melhorar sua experiência em nosso site.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">3. Finalidade do Tratamento</h2>
        <p>Seus dados são utilizados exclusivamente para:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Responder a solicitações de orçamento e contato;</li>
          <li>Enviar comunicações sobre nossos serviços (quando autorizado);</li>
          <li>Melhorar a performance e usabilidade do nosso site.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Segurança</h2>
        <p>Implementamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados, perda ou destruição. Seus dados são armazenados em servidores seguros com criptografia.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">5. Seus Direitos</h2>
        <p>Como titular dos dados, você tem o direito de solicitar a confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos ou inexatos, e a exclusão de seus dados de nossa base de marketing a qualquer momento.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">6. Contato</h2>
        <p>Para exercer seus direitos ou tirar dúvidas sobre nossa política, entre em contato através do e-mail: <span className="text-brand">contato@kytronatecnologia.com</span></p>
      </section>
    </div>
  </motion.div>
);

const TermsOfService: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="pt-40 pb-20 px-6 max-w-4xl mx-auto"
  >
    <button onClick={onBack} className="flex items-center gap-2 text-brand font-bold uppercase tracking-widest text-xs mb-12 hover:gap-4 transition-all">
      <ArrowLeft className="w-4 h-4" /> Voltar para o início
    </button>
    <h1 className="text-5xl md:text-7xl font-display font-bold mb-12 tracking-tighter">Termos de <span className="text-brand italic">Uso</span></h1>
    <div className="prose prose-invert max-w-none text-muted leading-relaxed space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
        <p>Ao acessar o site da Kytrona Tecnologia, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">2. Licença de Uso</h2>
        <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Kytrona Tecnologia, apenas para visualização transitória pessoal e não comercial.</p>
        <p>Esta licença não permite:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Modificar ou copiar os materiais;</li>
          <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública;</li>
          <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site;</li>
          <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">3. Isenção de Responsabilidade</h2>
        <p>Os materiais no site da Kytrona Tecnologia são fornecidos 'como estão'. A Kytrona Tecnologia não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Limitações</h2>
        <p>Em nenhum caso a Kytrona Tecnologia ou seus fornecedores serão responsáveis por quaisquer danos decorrentes do uso ou da incapacidade de usar os materiais em nosso site, mesmo que tenhamos sido notificados oralmente ou por escrito da possibilidade de tais danos.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">5. Precisão dos Materiais</h2>
        <p>Os materiais exibidos no site da Kytrona Tecnologia podem incluir erros técnicos, tipográficos ou fotográficos. Não garantimos que qualquer material em nosso site seja preciso, completo ou atual. Podemos fazer alterações nos materiais contidos em nosso site a qualquer momento, sem aviso prévio.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">6. Links</h2>
        <p>A Kytrona Tecnologia não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por nossa parte. O uso de qualquer site vinculado é por conta e risco do usuário.</p>
      </section>
    </div>
  </motion.div>
);

// --- Lead Popup Component ---

const LeadPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formState, setFormState] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    interesse: '',
    empresa: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Health check removido para simplificar e usar Web3Forms
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Usando FormData para garantir compatibilidade máxima com Web3Forms e evitar erros de chave
      const formData = new FormData();
      formData.append("access_key", "c56f14a1-124d-4dbf-aa00-df325b698005");
      formData.append("from_name", "Kytrona Tecnologia - Site Oficial");
      formData.append("subject", `🚀 NOVO LEAD: ${formState.nome.toUpperCase()}`);
      formData.append("replyto", formState.email);
      
      // Campos amigáveis para a tabela do e-mail
      formData.append("Nome do Cliente", formState.nome);
      formData.append("E-mail de Contato", formState.email);
      formData.append("WhatsApp/Telefone", formState.whatsapp);
      formData.append("Serviço de Interesse", formState.interesse);
      formData.append("Empresa/Projeto", formState.empresa || "Não informado");
      
      // Corpo da mensagem formatado
      const messageBody = `
        Novo lead capturado via site Kytrona Tecnologia.
        
        DETALHES DO CONTATO:
        -------------------
        Nome: ${formState.nome}
        E-mail: ${formState.email}
        WhatsApp: ${formState.whatsapp}
        Interesse: ${formState.interesse}
        Empresa: ${formState.empresa || 'Não informada'}
        
        AÇÃO RÁPIDA:
        -------------------
        Abrir conversa no WhatsApp: https://wa.me/${formState.whatsapp.replace(/\D/g, '')}
      `;
      formData.append("message", messageBody);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Obrigado! Nossos especialistas entrarão em contato em breve.');
        onClose();
      } else {
        // Se der erro de chave, mostramos o erro detalhado do Web3Forms
        throw new Error(result.message || 'Erro ao validar chave do formulário');
      }
    } catch (error: any) {
      console.error('Erro ao enviar lead:', error);
      alert(`Erro ao enviar: ${error.message}\n\nPor favor, verifique se a chave do Web3Forms está correta.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Side: Image */}
            <div className="hidden md:block md:w-5/12 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop" 
                alt="Kytrona Consulting"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                    <Logo className="w-6 h-6" iconClassName="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-white/80">Kytrona Studio</span>
                </div>
                <h3 className="text-2xl font-light text-white leading-tight">
                  Transformando <span className="text-brand italic serif">visão</span> em software de alto nível.
                </h3>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  A Kytrona vai elevar o nível tecnológico do seu negócio.
                </h2>
                <p className="text-muted text-sm md:text-base">
                  Deixe seus dados e receba uma análise estratégica gratuita do seu projeto com nossos especialistas.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Nome *"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand/50 transition-colors text-sm"
                    value={formState.nome}
                    onChange={e => setFormState({...formState, nome: e.target.value})}
                  />
                  <input
                    required
                    type="email"
                    placeholder="E-mail *"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand/50 transition-colors text-sm"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    type="tel"
                    placeholder="WhatsApp *"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand/50 transition-colors text-sm"
                    value={formState.whatsapp}
                    onChange={e => setFormState({...formState, whatsapp: e.target.value})}
                  />
                  <select
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 focus:outline-none focus:border-brand/50 transition-colors text-sm appearance-none"
                    value={formState.interesse}
                    onChange={e => setFormState({...formState, interesse: e.target.value})}
                  >
                    <option value="" disabled className="bg-surface">Estou em busca de...</option>
                    <option value="site" className="bg-surface">Criação de Site Premium</option>
                    <option value="saas" className="bg-surface">Desenvolvimento SaaS</option>
                    <option value="sistema" className="bg-surface">Sistema Personalizado</option>
                    <option value="consultoria" className="bg-surface">Consultoria Tecnológica</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Nome da sua empresa (opcional)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand/50 transition-colors text-sm"
                  value={formState.empresa}
                  onChange={e => setFormState({...formState, empresa: e.target.value})}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand hover:bg-brand/90 text-surface font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-brand/20 uppercase tracking-widest text-xs mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar Análise Grátis'}
                </button>
              </form>

              <p className="text-[10px] text-white/30 text-center mt-6 uppercase tracking-wider">
                Garantimos a privacidade dos seus dados.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms' | 'insights' | 'post'>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'project'>('default');

  // Lenis Smooth Scroll Initialization
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  // GSAP Animations
  useGSAP(() => {
    // Reveal animations for sections
    const sections = gsap.utils.toArray('section');
    sections.forEach((section: any) => {
      const reveals = section.querySelectorAll('.gsap-reveal');
      if (reveals.length > 0) {
        gsap.fromTo(reveals, 
          { 
            y: 100, 
            opacity: 0,
            skewY: 7
          },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Advanced Portfolio Parallax & Scale
    gsap.utils.toArray('.project-card').forEach((card: any) => {
      const inner = card.querySelector('.aspect-video');
      const content = card.querySelector('.gsap-reveal');
      
      if (inner) {
        gsap.fromTo(inner, 
          { scale: 1.2, filter: 'grayscale(100%)' },
          {
            scale: 1,
            filter: 'grayscale(0%)',
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "center center",
              scrub: true
            }
          }
        );
      }

      if (content) {
        gsap.from(content, {
          x: -50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // Advanced Portfolio Horizontal Scroll
    const portfolioSection = document.querySelector('.portfolio-section');
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    if (portfolioSection && portfolioContainer) {
      const scrollWidth = portfolioContainer.scrollWidth - window.innerWidth;
      
      gsap.to(portfolioContainer, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: portfolioSection,
          pin: true,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }

    // Background Color Transitions
    const sectionsWithBg = [
      { trigger: '#servicos', color: '#0A0A0A' },
      { trigger: '.portfolio-section', color: '#0F0F0F' },
      { trigger: '#processo', color: '#050505' },
      { trigger: '#contato', color: '#0A0A0A' }
    ];

    sectionsWithBg.forEach(config => {
      gsap.to(containerRef.current, {
        backgroundColor: config.color,
        scrollTrigger: {
          trigger: config.trigger,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
          scrub: true
        }
      });
    });

    // Advanced Text Reveal (Split Text Style)
    gsap.utils.toArray('.gsap-split-text').forEach((text: any) => {
      gsap.from(text, {
        yPercent: 100,
        opacity: 0,
        rotateX: -30,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: text,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // 3D Tilt Effect for Project Cards
    gsap.utils.toArray('.project-card').forEach((card: any) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.02,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });

    // Glitch Effect for Hero Title
    const glitchLines = document.querySelectorAll('.gsap-split-text');
    glitchLines.forEach((line: any) => {
      gsap.to(line, {
        x: () => (Math.random() - 0.5) * 10,
        y: () => (Math.random() - 0.5) * 5,
        skewX: () => (Math.random() - 0.5) * 10,
        duration: 0.1,
        repeat: -1,
        repeatRefresh: true,
        ease: "none",
        paused: true,
        id: "glitch"
      });

      line.addEventListener('mouseenter', () => {
        gsap.getById("glitch")?.play();
      });
      line.addEventListener('mouseleave', () => {
        gsap.getById("glitch")?.pause();
        gsap.to(line, { x: 0, y: 0, skewX: 0, duration: 0.2 });
      });
    });

    // Video Parallax
    gsap.to('.gsap-video-parallax', {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: 'body',
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    // Magnetic Buttons Logic with GSAP
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    magneticButtons.forEach((btn: any) => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: "power2.out"
        });
        
        const text = btn.querySelector('span, div, svg');
        if (text) {
          gsap.to(text, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
        const text = btn.querySelector('span, div, svg');
        if (text) {
          gsap.to(text, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
          });
        }
      });
    });

    // Footer Reveal
    gsap.from('.footer-content', {
      yPercent: -50,
      opacity: 0,
      scrollTrigger: {
        trigger: 'footer',
        start: "top bottom",
        end: "bottom bottom",
        scrub: true
      }
    });

  }, { scope: containerRef });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 8000);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (cursorRef.current && cursorOuterRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
        gsap.to(cursorOuterRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out"
        });
        cursorRef.current.style.opacity = '1';
        cursorOuterRef.current.style.opacity = '1';
      }

      const target = e.target as HTMLElement;
      const isHoverable = target.closest('button, a, .magnetic-btn');
      const isProject = target.closest('.project-card');

      if (isProject) {
        setCursorType('project');
      } else if (isHoverable) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      clearTimeout(popupTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navigateTo = (page: any) => {
    setCurrentPage(page);
    if (page !== 'post') setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentPage('post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative selection:bg-brand selection:text-white">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className={cn(
          "fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out opacity-0 flex items-center justify-center",
          cursorType === 'default' ? "w-2 h-2 bg-brand" : 
          cursorType === 'hover' ? "w-12 h-12 bg-white scale-110" : 
          "w-24 h-24 bg-brand mix-blend-normal scale-100"
        )}
      >
        {cursorType === 'project' && (
          <span className="text-[10px] font-bold text-surface uppercase tracking-widest animate-pulse">Explorar</span>
        )}
      </div>
      <div 
        ref={cursorOuterRef} 
        className={cn(
          "fixed top-0 left-0 border border-brand/30 rounded-full pointer-events-none z-[9998] transition-all duration-500 ease-out opacity-0",
          cursorType === 'default' ? "w-10 h-10" : "w-16 h-16 opacity-0"
        )}
      />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="noise" />
      <motion.div 
        className="cursor-glow fixed w-[400px] h-[400px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 bg-brand/5 blur-[120px]" 
        style={{ left: mouseX, top: mouseY }} 
      />
      <motion.div 
        className="fixed w-2 h-2 bg-brand rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[100] hidden md:block" 
        style={{ left: mouseX, top: mouseY }} 
      />
      
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
              <div className="rotate-12 animate-pulse shadow-2xl shadow-brand/20">
                <Logo className="w-16 h-16 rounded-2xl" iconClassName="w-10 h-10" />
              </div>
              <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full w-full bg-brand" 
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted">Iniciando Kytrona Studio</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <Navbar onNavigate={navigateTo} onOpenPopup={() => setShowPopup(true)} />
          
          <AnimatePresence mode="wait">
            {currentPage === 'home' ? (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Hero onOpenPopup={() => setShowPopup(true)} />
                <TechStack />
                <Marquee />
                <Services onOpenPopup={() => setShowPopup(true)} />
                <Portfolio />
                <Testimonials />
                <FAQ />
                <Featured />
                <Process onOpenPopup={() => setShowPopup(true)} />
                <Contact onOpenPopup={() => setShowPopup(true)} />
              </motion.div>
            ) : currentPage === 'insights' ? (
              <Insights key="insights" onSelectPost={handleSelectPost} />
            ) : currentPage === 'post' && selectedPost ? (
              <BlogPostDetail key="post" post={selectedPost} onBack={() => navigateTo('insights')} />
            ) : currentPage === 'privacy' ? (
              <PrivacyPolicy key="privacy" onBack={() => navigateTo('home')} />
            ) : (
              <TermsOfService key="terms" onBack={() => navigateTo('home')} />
            )}
          </AnimatePresence>

          <Footer onNavigate={navigateTo} />

          <LeadPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />

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
