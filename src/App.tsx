import React, { useState, useEffect, useRef, memo } from 'react';
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
  Play,
  ArrowLeft
} from 'lucide-react';
import { cn } from './lib/utils';
import simuVideo from './simu.mp4';
// const simuVideo = "/simu.mp4";

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
      
      <p>Na Orbyt, somos especialistas em transformar processos complexos em interfaces intuitivas e sistemas robustos. Se você tem uma ideia de SaaS, agora é o momento de tirar do papel.</p>
    `,
    date: '24 Mar, 2026',
    readTime: '5 min',
    category: 'Estratégia',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Lucas Orbyt',
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
      
      <p>Na Orbyt, nossa filosofia de "Estética Marcante" antecipa essas tendências para garantir que seu produto não seja apenas funcional, mas inesquecível.</p>
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
      
      <p>Nossos sistemas na Orbyt são construídos com foco em performance extrema, utilizando as tecnologias mais modernas de renderização e cache.</p>
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

const Navbar = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
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
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 bg-gradient-to-br from-brand-soft to-brand rounded flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-brand/20">
              <Terminal className="w-5 h-5 text-surface" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-none tracking-tighter uppercase">ORBYT <span className="text-brand">TECNOLOGIA</span></span>
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
                onClick={(e) => {
                  e.preventDefault();
                  if (item.id === 'insights') {
                    onNavigate('insights');
                  } else {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
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
              <a href="#contato" onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('contato');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}>VAMOS CRIAR</a>
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

const VideoBackground = memo(() => {
  const [activeVideo, setActiveVideo] = useState(1);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoUrl = simuVideo;

  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    
    if (v1) {
      v1.play().catch(() => {});
    }

    // Pré-carrega o segundo vídeo
    if (v2) {
      v2.load();
    }

    const checkTime = () => {
      const activeRef = activeVideo === 1 ? v1 : v2;
      const nextRef = activeVideo === 1 ? v2 : v1;

      if (activeRef && nextRef && activeRef.duration > 0) {
        const timeLeft = activeRef.duration - activeRef.currentTime;
        
        // Inicia a transição 1.2 segundos antes do fim
        if (timeLeft < 1.2 && nextRef.paused) {
          nextRef.currentTime = 0;
          nextRef.play().then(() => {
            setActiveVideo(activeVideo === 1 ? 2 : 1);
          }).catch(() => {});
        }
      }
      requestAnimationFrame(checkTime);
    };

    const rafId = requestAnimationFrame(checkTime);
    return () => cancelAnimationFrame(rafId);
  }, [activeVideo]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-surface">
      <div className="absolute inset-0 transform-gpu">
        <video
          ref={videoRef1}
          muted
          playsInline
          preload="auto"
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out",
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
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out",
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
        <motion.div style={{ x: orb1X, y: orb1Y }} className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand/10 blur-[120px] rounded-full will-change-transform" />
        <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-olive/10 blur-[120px] rounded-full will-change-transform" />
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tighter mb-8 uppercase">
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

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <footer className="py-20 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-brand rounded flex items-center justify-center rotate-3">
            <Terminal className="w-5 h-5 text-surface" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter uppercase">ORBYT <span className="text-brand">TECNOLOGIA</span></span>
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
          <button onClick={() => onNavigate('insights')} className="hover:text-brand transition-colors text-left">Insights</button>
          <button onClick={() => onNavigate('privacy')} className="hover:text-brand transition-colors text-left">Privacidade</button>
          <button onClick={() => onNavigate('terms')} className="hover:text-brand transition-colors text-left">Termos</button>
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

const Insights = ({ onSelectPost, key }: { onSelectPost: (post: BlogPost) => void; key?: string }) => {
  return (
    <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-brand font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Insights & Estratégia
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none"
          >
            Pensamento <span className="text-brand italic">Digital</span> para Negócios
          </motion.h1>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-muted max-w-xs text-sm leading-relaxed"
        >
          Exploramos a intersecção entre tecnologia de ponta, design marcante e estratégia de crescimento.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectPost(post)}
            className="group cursor-pointer"
          >
            <SpotlightCard className="h-full flex flex-col p-0 overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand/90 text-surface text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[10px] text-muted uppercase tracking-widest mb-4">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-brand rounded-full" />
                  <span>{post.readTime} de leitura</span>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-brand transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full border border-white/10" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white uppercase">{post.author.name}</span>
                      <span className="text-[8px] text-muted uppercase">{post.author.role}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-brand opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const BlogPostDetail = ({ post, onBack, key }: { post: BlogPost; onBack: () => void; key?: string }) => {
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

const PrivacyPolicy = ({ onBack, key }: { onBack: () => void; key?: string }) => (
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
        <p>A Orbyt Tecnologia valoriza a sua privacidade. Esta política descreve como coletamos, usamos e protegemos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
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
        <p>Para exercer seus direitos ou tirar dúvidas sobre nossa política, entre em contato através do e-mail: <span className="text-brand">contato@orbyttecnologia.com.br</span></p>
      </section>
    </div>
  </motion.div>
);

const TermsOfService = ({ onBack, key }: { onBack: () => void; key?: string }) => (
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
        <p>Ao acessar o site da Orbyt Tecnologia, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">2. Licença de Uso</h2>
        <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Orbyt Tecnologia, apenas para visualização transitória pessoal e não comercial.</p>
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
        <p>Os materiais no site da Orbyt Tecnologia são fornecidos 'como estão'. A Orbyt Tecnologia não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Limitações</h2>
        <p>Em nenhum caso a Orbyt Tecnologia ou seus fornecedores serão responsáveis por quaisquer danos decorrentes do uso ou da incapacidade de usar os materiais em nosso site, mesmo que tenhamos sido notificados oralmente ou por escrito da possibilidade de tais danos.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">5. Precisão dos Materiais</h2>
        <p>Os materiais exibidos no site da Orbyt Tecnologia podem incluir erros técnicos, tipográficos ou fotográficos. Não garantimos que qualquer material em nosso site seja preciso, completo ou atual. Podemos fazer alterações nos materiais contidos em nosso site a qualquer momento, sem aviso prévio.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">6. Links</h2>
        <p>A Orbyt Tecnologia não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por nossa parte. O uso de qualquer site vinculado é por conta e risco do usuário.</p>
      </section>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms' | 'insights' | 'post'>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
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
          className="relative"
        >
          <Navbar onNavigate={navigateTo} />
          
          <AnimatePresence mode="wait">
            {currentPage === 'home' ? (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
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
