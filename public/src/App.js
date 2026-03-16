import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Menu, X, ChevronDown, ArrowRight, Lock, Eye, Shield,
  Instagram, Send, Users, Sparkles, MessageCircle, Award
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { Toaster } from "sonner";
import LogoShowcase from "./LogoShowcase";
import "@/App.css";

// WhatsApp link - substituir pelo número real
const WHATSAPP_LINK = "https://wa.me/5511977983834?text=Olá! Quero saber mais sobre a parceria com a TKT2Rocket";
const TELEGRAM_LINK = "https://t.me/Tkt2Rocket";
const INSTAGRAM_LINK = "https://www.instagram.com/tkt2rocket.agencia/";

// Particle component for background
const Particles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Navigation Component - Mobile First
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Sobre", href: "#sobre" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Resultados", href: "#resultados" },
  ];

  const scrollToSection = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        data-testid="navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container-luxury flex items-center justify-between h-20 md:h-24">
          <a href="#" className="flex items-center" data-testid="logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_tkt2-launch/artifacts/p47y4c36_logo.transparent02.png" 
              alt="TKT2Rocket" 
              className="h-16 md:h-20 w-auto"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="nav-link"
                data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all duration-300 btn-glow"
              data-testid="nav-cta-button"
            >
              Falar no WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-button"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu"
            data-testid="mobile-menu"
          >
            <button
              className="absolute top-6 right-6 p-2 text-foreground z-[110]"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="mobile-menu-link"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-4 font-bold uppercase tracking-widest mt-4"
            >
              Falar no WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section - Mobile First, High Conversion
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      data-testid="hero-section"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1760224254181-adac9e1a1900?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwyfHxyZWQlMjBzaWxrJTIwZmFicmljJTIwdGV4dHVyZSUyMGRhcmslMjBsdXh1cnl8ZW58MHx8fHwxNzcxNzM3Njg1fDA&ixlib=rb-4.1.0&q=85')`
          }}
        />
        <div className="hero-overlay absolute inset-0" />
      </motion.div>

      {/* Particles */}
      <Particles />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container-luxury text-center px-4 md:px-6 max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight max-w-4xl mx-auto"
          data-testid="hero-title"
        >
          Do Exibicionismo ao Lucro: <span className="text-primary">Transforme suas fotos e vídeos em dinheiro de verdade</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed"
          data-testid="hero-subtitle"
        >
          A TKT2Rocket gerencia seu perfil no Privacy, HotVips e OnlyFans para você vender conteúdo com segurança e sigilo, ganhar mais e ter liberdade para crescer.
        </motion.p>

        {/* CTA Buttons - Mobile First */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 md:mb-12"
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-card hover:bg-card/80 text-white px-6 md:px-8 py-4 md:py-5 font-bold text-sm md:text-base uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-3 border border-primary/30 hover:border-primary hover:shadow-[0_0_20px_rgba(196,30,58,0.4)]"
            data-testid="cta-whatsapp"
          >
            <MessageCircle size={22} className="text-white/80" />
            Já sou criadora e quero ganhar mais
          </a>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-card hover:bg-card/80 text-white px-6 md:px-8 py-4 md:py-5 font-bold text-sm md:text-base uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-3 border border-secondary/30 hover:border-secondary hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]"
            data-testid="cta-telegram"
          >
            <Send size={22} className="text-white/80" />
            Posto por diversão e quero lucrar
          </a>
        </motion.div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass-card p-4 md:p-6 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center py-2">
              <div className="text-2xl md:text-3xl font-bold text-primary font-heading">+25</div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Criadoras Gerenciadas</div>
            </div>
            <div className="text-center py-2 sm:border-x border-border">
              <div className="text-2xl md:text-3xl font-bold text-primary font-heading">Top 1</div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Ranking do Privacy</div>
            </div>
            <div className="text-center py-2">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Award className="text-secondary" size={24} />
                <span className="text-secondary font-bold text-lg md:text-xl">Oficial</span>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Parceiro HotVips</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

// Animation wrapper for scroll reveal
const RevealOnScroll = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// How It Works Section - 3 Pillars
const HowItWorksSection = () => {
  const pillars = [
    {
      number: "01",
      title: "Gestão de Trocas de Divulgação",
      description: "Você entra numa rede de mais de 25 perfis parceiros — alguns com mais de 15 mil assinantes. Sua divulgação começa no dia 1, dentro dos maiores canais do nicho. Sem esperar. Sem construir do zero.",
      icon: <Users size={28} />
    },
    {
      number: "02",
      title: "Mentoria Completa",
      description: "Do zero ao avançado. Como abrir plataformas, vender conteúdo exclusivo, aumentar retenção de assinantes, fazer colabs e melhorar o que você já produz. A gente pega na mão — todos os dias, o dia todo.",
      icon: <Sparkles size={28} />
    },
    {
      number: "03",
      title: "Gestão de Redes Sociais",
      description: "Criamos e gerenciamos múltiplas contas em todas as plataformas: Instagram, TikTok, Threads, X. Escrevemos, postamos e esquentamos o algoritmo. Quando o viral vier — e ele vem — você já está pronta.",
      icon: <Send size={28} />
    }
  ];

  return (
    <section id="como-funciona" className="section-padding bg-muted/30 relative" data-testid="how-it-works-section">
      <div className="container-luxury">
        <RevealOnScroll>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 max-w-3xl mx-auto" data-testid="how-it-works-title">
            Como Funciona a Parceria
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="text-muted-foreground text-center text-base md:text-lg mb-12 md:mb-16 max-w-xl mx-auto">
            Somos sócios do seu crescimento no Privacy e HotVips — só crescemos se você crescer.
          </p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <RevealOnScroll key={index} delay={index * 0.15}>
              <div 
                className="glass-card p-6 md:p-8 h-full flex flex-col relative overflow-hidden group text-center md:text-left"
                data-testid={`pillar-${pillar.number}`}
              >
                <div className="flex items-center justify-center md:justify-between mb-4 md:mb-6">
                  <span className="text-secondary font-heading text-4xl md:text-5xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">
                    {pillar.number}
                  </span>
                  <div className="hidden md:flex w-12 h-12 md:w-14 md:h-14 bg-primary/10 border border-primary/30 items-center justify-center text-primary">
                    {pillar.icon}
                  </div>
                </div>
                
                <h3 className="font-heading text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-4">
                  {pillar.title}
                </h3>
                
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed flex-1">
                  {pillar.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partnership Section - Modelo de Negócio
const PartnershipSection = () => {
  return (
    <section id="parceria" className="partnership-section section-padding" data-testid="partnership-section">
      <div className="container-luxury text-center">
        <RevealOnScroll>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 md:mb-8 max-w-2xl mx-auto" data-testid="partnership-title">
            Nosso Modelo de Parceria
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="max-w-2xl mx-auto">
            <p className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 md:mb-8">
              <strong className="text-secondary">Só ganhamos quando você ganha.</strong>
            </p>
            <p className="text-foreground/80 text-base md:text-lg lg:text-xl leading-relaxed mb-6 max-w-xl mx-auto">
              Somos seus sócios no crescimento e garantimos sua receita atual se você já for criadora.
            </p>
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-lg mx-auto">
              Sem mensalidade fixa. Sem custos iniciais. Nossa remuneração é baseada no crescimento que geramos para você.
            </p>
            <p className="text-foreground text-xl md:text-2xl font-heading font-bold max-w-md mx-auto">
              Se você não cresce, nós não ganhamos. Simples assim.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-12">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto max-w-xs bg-secondary hover:bg-secondary/80 text-background px-6 md:px-8 py-4 font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              data-testid="partnership-cta-button"
            >
              <MessageCircle size={20} />
              Quero entender o modelo
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding relative overflow-hidden" data-testid="about-section">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <RevealOnScroll>
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1759930781127-ba97445c7de5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBzaWxob3VldHRlJTIwc3R1ZGlvJTIwbGlnaHRpbmclMjBkYXJrJTIwbW9vZHl8ZW58MHx8fHwxNzcxNzM3Njg3fDA&ixlib=rb-4.1.0&q=85"
                  alt="Criadora de conteúdo de sucesso gerenciada pela agência TKT2Rocket"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-32 h-32 md:w-48 md:h-48 border border-secondary/30" />
            </div>
          </RevealOnScroll>

          <div className="order-1 lg:order-2">
            <RevealOnScroll>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8" data-testid="about-title">
                Quem Somos
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="space-y-4 md:space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed mb-8 md:mb-12">
                <p>
                  A TKT2Rocket nasceu de dentro do nicho. Somos produtores de conteúdo que construíram, na prática, uma das maiores operações de marketing adulto Brasil no segmento 18+.
                </p>
                <p>
                  Nossa fundadora chegou ao <strong className="text-primary">Top 1 do Privacy</strong>, menos de <strong className="text-primary">2% do OnlyFans</strong> e é presença constante nos tops do HotVips — plataforma onde somos <strong className="text-foreground">Parceiro Oficial</strong>.
                </p>
                <p className="text-secondary font-medium">
                  Não ensinamos teoria. Ensinamos exatamente como vender no Privacy e crescer no HotVips.
                </p>
                <p>
                  Hoje oferecemos assessoria para criadoras que querem ganhar dinheiro no HotVips, Privacy e OnlyFans com segurança e sigilo total.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <RevealOnScroll delay={0.3}>
                <div className="stat-card py-4">
                  <div className="stat-number text-xl md:text-2xl lg:text-3xl">🏆</div>
                  <div className="stat-label text-[10px] md:text-xs">Agência Oficial HotVips</div>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.4}>
                <div className="stat-card py-4">
                  <div className="stat-number text-xl md:text-2xl lg:text-3xl">Top 1</div>
                  <div className="stat-label text-[10px] md:text-xs">Privacy & Top 2% OnlyFans</div>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.5}>
                <div className="stat-card py-4">
                  <div className="stat-number text-xl md:text-2xl lg:text-3xl">+25</div>
                  <div className="stat-label text-[10px] md:text-xs">criadoras ativas</div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Privacy Section - Sua Privacidade é Nossa Prioridade
const PrivacySection = () => {
  const features = [
    {
      icon: <Shield size={28} />,
      title: "Sigilo Total"
    },
    {
      icon: <Lock size={28} />,
      title: "Contrato de Confidencialidade"
    },
    {
      icon: <Eye size={28} />,
      title: "Zero Exposição Não Autorizada"
    }
  ];

  return (
    <section className="section-padding bg-muted/30" data-testid="privacy-section">
      <div className="container-luxury">
        <RevealOnScroll>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 max-w-xl mx-auto" data-testid="privacy-title">
            Sua Privacidade é Nossa Prioridade
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <RevealOnScroll key={index} delay={0.1 + index * 0.1}>
              <div className="glass-card p-6 md:p-8 text-center" data-testid={`privacy-feature-${index + 1}`}>
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary rounded-full">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg md:text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

// Results Section
const ResultsSection = () => {
  const metrics = [
    {
      value: "Top 1",
      label: "Ranking alcançado no Privacy pela fundadora"
    },
    {
      value: "Top 2%",
      label: "Posição no OnlyFans global"
    },
    {
      value: "+25",
      label: "Criadoras ativas no nicho"
    }
  ];

  const testimonials = [
    {
      quote: "Finalmente consigo focar no que amo fazer. A TKT2Rocket cuida de todo o resto com profissionalismo que nunca vi em outras agências.",
      author: "M.",
      detail: "parceira desde 2023"
    },
    {
      quote: "Em 3 meses, minha receita dobrou. Mas o melhor foi ter tempo livre de volta. Isso não tem preço.",
      author: "J.",
      detail: "parceira desde 2024"
    }
  ];

  return (
    <section id="resultados" className="section-padding" data-testid="results-section">
      <div className="container-luxury">
        <RevealOnScroll>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 max-w-lg mx-auto" data-testid="results-title">
            Números que falam.
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <RevealOnScroll key={index} delay={index * 0.15}>
              <div className="glass-card p-6 md:p-8 text-center" data-testid={`metric-${index + 1}`}>
                <div className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4">
                  {metric.value}
                </div>
                <p className="text-muted-foreground text-sm md:text-base max-w-[200px] mx-auto">{metric.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <RevealOnScroll key={index} delay={0.3 + index * 0.15}>
              <div className="testimonial-card text-center md:text-left" data-testid={`testimonial-${index + 1}`}>
                <p className="text-foreground text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="w-10 h-10 bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">{testimonial.author}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{testimonial.detail}</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const faqs = [
    {
      question: "Preciso ter um número mínimo de assinantes para ser parceira?",
      answer: "Não. Avaliamos seu potencial e desejo de crescer. Atendemos tanto iniciantes do zero quanto criadoras que já faturam e querem escala."
    },
    {
      question: "Vocês gerenciam meu perfil sem eu perder o controle?",
      answer: "Sim. O perfil é seu. Nós cuidamos da parte chata de postagens e vendas para você ter liberdade, com total transparência e controle sobre tudo."
    },
    {
      question: "Como funciona o modelo financeiro da parceria?",
      answer: "Trabalhamos no sucesso compartilhado: só ganhamos se você ganhar. Não cobramos taxas fixas; nossa remuneração vem do crescimento que geramos juntas."
    },
    {
      question: "Trabalham com quais plataformas?",
      answer: "Dominamos Privacy, HotVips, OnlyFans e Telegram. Somos Agência Parceira Oficial do HotVips, o que garante recursos exclusivos para nossas criadoras."
    },
    {
      question: "Como é feita a seleção de novas parceiras?",
      answer: "Começamos com uma conversa no WhatsApp ou Telegram para entender seu momento. Como o atendimento é exclusivo e humano, as vagas são limitadas."
    }
  ];

  return (
    <section className="section-padding bg-muted/30" data-testid="faq-section">
      <div className="container-luxury max-w-2xl mx-auto">
        <RevealOnScroll>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 max-w-md mx-auto" data-testid="faq-title">
            Perguntas frequentes
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card border-0 px-4 md:px-6"
                data-testid={`faq-item-${index + 1}`}
              >
                <AccordionTrigger className="text-left font-heading text-base md:text-lg font-semibold text-foreground hover:text-primary hover:no-underline py-4 md:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base pb-4 md:pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="section-padding" data-testid="final-cta-section">
      <div className="container-luxury text-center max-w-2xl mx-auto">
        <RevealOnScroll>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 max-w-lg mx-auto">
            Pronto para parar de fazer tudo sozinho?
          </h2>
        </RevealOnScroll>
        
        <RevealOnScroll delay={0.1}>
          <p className="text-secondary text-base md:text-lg mb-8 md:mb-10">
            As vagas para novas parcerias são limitadas.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-card hover:bg-card/80 text-white px-6 md:px-8 py-4 md:py-5 font-bold text-sm md:text-base uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-3 border border-primary/30 hover:border-primary hover:shadow-[0_0_20px_rgba(196,30,58,0.4)]"
              data-testid="final-cta-whatsapp"
            >
              <MessageCircle size={22} className="text-white/80" />
              Falar no WhatsApp
            </a>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-card hover:bg-card/80 text-white px-6 md:px-8 py-4 md:py-5 font-bold text-sm md:text-base uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-3 border border-secondary/30 hover:border-secondary hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]"
              data-testid="final-cta-telegram"
            >
              <Send size={22} className="text-white/80" />
              Entrar no Telegram
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div className="flex justify-center mt-8 md:mt-10">
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-card hover:bg-card/80 px-6 py-3 border border-primary/30 hover:border-primary hover:shadow-[0_0_20px_rgba(196,30,58,0.4)] transition-all duration-300"
              data-testid="instagram-link"
            >
              <Instagram size={24} className="text-primary" />
              <span className="text-foreground font-medium">@tkt2rocket.agencia</span>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer py-8 md:py-12" data-testid="footer">
      <div className="container-luxury">
        <div className="flex flex-col items-center gap-6">
          <img
            src="https://customer-assets.emergentagent.com/job_tkt2-launch/artifacts/p47y4c36_logo.transparent02.png"
            alt="TKT2Rocket"
            className="h-14 md:h-16 w-auto"
          />
          
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
          >
            <Instagram size={22} />
            <span className="font-medium">@tkt2rocket.agencia</span>
          </a>
          
          <p className="text-muted-foreground text-sm text-center">
            Você cria. A gente cuida de tudo.
          </p>

          <span className="footer-disclaimer text-xs" data-testid="age-disclaimer">
            +18 · Conteúdo destinado a maiores de idade
          </span>

          <p className="text-muted-foreground text-xs text-center">
            © 2025 TKT2Rocket — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div className="App bg-background min-h-screen">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#121212',
            color: '#F5F5F5',
            border: '1px solid #333'
          }
        }}
      />
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <PartnershipSection />
      <AboutSection />
      <PrivacySection />
      <ResultsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

// Main App with Routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logos" element={<LogoShowcase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
