import React from 'react';

// LOGO 1: Power Wordmark - Pure Typography
const LogoPowerWordmark = ({ size = 'large' }) => {
  const sizes = {
    large: { fontSize: '3rem', letterSpacing: '-0.02em' },
    medium: { fontSize: '1.5rem', letterSpacing: '-0.01em' },
    small: { fontSize: '0.875rem', letterSpacing: '0' },
    favicon: { fontSize: '1.25rem', letterSpacing: '0' },
  };

  const style = sizes[size] || sizes.large;

  return (
    <div 
      className="font-heading font-bold tracking-tight"
      style={{ 
        fontFamily: "'Playfair Display', serif",
        fontSize: style.fontSize,
        letterSpacing: style.letterSpacing,
        lineHeight: 1,
      }}
    >
      <span className="text-white">TKT</span>
      <span 
        className="text-[#C41E3A] italic"
        style={{ 
          fontSize: size === 'large' ? '3.5rem' : 'inherit',
          fontWeight: 900,
        }}
      >
        2
      </span>
      <span className="text-white">Rocket</span>
    </div>
  );
};

// Favicon version for Logo 1
const LogoPowerWordmarkFavicon = () => (
  <div 
    className="w-10 h-10 flex items-center justify-center bg-[#0a0a0a] border border-[#333]"
  >
    <span 
      className="font-heading font-bold text-white text-lg"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      T<span className="text-[#C41E3A] italic">2</span>R
    </span>
  </div>
);

// LOGO 2: Trajectory - Icon + Wordmark
const TrajectoryIcon = ({ size = 40, color = '#C9A84C' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Upward diagonal trajectory with geometric rocket hint */}
    <path 
      d="M8 32 L32 8" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="square"
    />
    <path 
      d="M24 8 L32 8 L32 16" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
    {/* Exhaust trail dots */}
    <circle cx="12" cy="28" r="1.5" fill={color} opacity="0.6" />
    <circle cx="16" cy="24" r="1" fill={color} opacity="0.4" />
  </svg>
);

const LogoTrajectory = ({ layout = 'horizontal', size = 'large' }) => {
  const isHorizontal = layout === 'horizontal';
  const iconSize = size === 'large' ? 48 : size === 'medium' ? 32 : 24;
  const fontSize = size === 'large' ? '1.75rem' : size === 'medium' ? '1.25rem' : '0.875rem';

  return (
    <div className={`flex ${isHorizontal ? 'flex-row items-center gap-4' : 'flex-col items-center gap-2'}`}>
      <TrajectoryIcon size={iconSize} />
      <div 
        className="font-body font-semibold tracking-wide"
        style={{ 
          fontFamily: "'Manrope', sans-serif",
          fontSize,
          letterSpacing: '0.05em',
        }}
      >
        <span className="text-white">TKT</span>
        <span className="text-[#C41E3A] font-bold">2</span>
        <span className="text-white">Rocket</span>
      </div>
    </div>
  );
};

// Favicon version for Logo 2
const LogoTrajectoryFavicon = () => (
  <div className="w-10 h-10 flex items-center justify-center bg-[#0a0a0a] border border-[#333]">
    <TrajectoryIcon size={28} />
  </div>
);

// LOGO 3: Monogram - T + R intertwined
const MonogramIcon = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer circle/shield shape */}
    <circle 
      cx="30" 
      cy="30" 
      r="28" 
      stroke="#C9A84C" 
      strokeWidth="1.5"
      fill="none"
    />
    {/* Inner geometric frame */}
    <rect 
      x="14" 
      y="14" 
      width="32" 
      height="32" 
      stroke="#C9A84C" 
      strokeWidth="0.5"
      fill="none"
      opacity="0.4"
    />
    {/* T letter - centered horizontal bar */}
    <path 
      d="M18 20 H42" 
      stroke="#C41E3A" 
      strokeWidth="3" 
      strokeLinecap="square"
    />
    {/* T letter - vertical stem */}
    <path 
      d="M30 20 V40" 
      stroke="#C41E3A" 
      strokeWidth="3" 
      strokeLinecap="square"
    />
    {/* R letter - curved element overlaid */}
    <path 
      d="M22 24 V40 M22 24 H32 C38 24 38 32 32 32 H22 M32 32 L40 42" 
      stroke="#C9A84C" 
      strokeWidth="2" 
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
    />
  </svg>
);

// Alternative Monogram - TKT intertwined
const MonogramTKT = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer shield/crest shape */}
    <path 
      d="M30 2 L56 14 L56 38 L30 58 L4 38 L4 14 Z" 
      stroke="#C9A84C" 
      strokeWidth="1.5"
      fill="none"
    />
    {/* T - Left */}
    <path 
      d="M12 18 H22 M17 18 V42" 
      stroke="#C41E3A" 
      strokeWidth="2.5" 
      strokeLinecap="square"
    />
    {/* K - Center */}
    <path 
      d="M28 18 V42 M28 30 L38 18 M28 30 L38 42" 
      stroke="#C41E3A" 
      strokeWidth="2.5" 
      strokeLinecap="square"
    />
    {/* T - Right */}
    <path 
      d="M42 18 H52 M47 18 V42" 
      stroke="#C41E3A" 
      strokeWidth="2.5" 
      strokeLinecap="square"
    />
    {/* Gold accent line */}
    <path 
      d="M20 48 H40" 
      stroke="#C9A84C" 
      strokeWidth="1" 
      strokeLinecap="square"
    />
  </svg>
);

const LogoMonogram = ({ variant = 'tr', size = 'large' }) => {
  const iconSize = size === 'large' ? 80 : size === 'medium' ? 56 : 40;
  const fontSize = size === 'large' ? '0.75rem' : '0.625rem';
  const Icon = variant === 'tr' ? MonogramIcon : MonogramTKT;

  return (
    <div className="flex flex-col items-center gap-3">
      <Icon size={iconSize} />
      <div 
        className="font-body tracking-[0.3em] uppercase"
        style={{ 
          fontFamily: "'Manrope', sans-serif",
          fontSize,
          fontWeight: 400,
        }}
      >
        <span className="text-white">TKT</span>
        <span className="text-[#C41E3A]">2</span>
        <span className="text-white">Rocket</span>
      </div>
    </div>
  );
};

// Favicon version for Logo 3
const LogoMonogramFavicon = ({ variant = 'tr' }) => (
  <div className="w-10 h-10 flex items-center justify-center bg-[#0a0a0a] border border-[#333] p-1">
    {variant === 'tr' ? <MonogramIcon size={32} /> : <MonogramTKT size={32} />}
  </div>
);

// Main Showcase Component
const LogoShowcase = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-white text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            TKT2Rocket — Logo Design Options
          </h1>
          <p className="text-[#A3A3A3] text-sm uppercase tracking-[0.2em]">
            Brand Identity Exploration
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <span className="inline-block w-3 h-3 bg-white"></span>
            <span className="inline-block w-3 h-3 bg-[#C41E3A]"></span>
            <span className="inline-block w-3 h-3 bg-[#C9A84C]"></span>
          </div>
        </div>

        {/* Logo Grid - 3 Columns */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-4">
          
          {/* OPTION 1: Power Wordmark */}
          <div className="border border-[#333] p-8 flex flex-col">
            <div className="text-[#C9A84C] text-xs uppercase tracking-[0.2em] mb-8 font-semibold">
              Opção 1
            </div>
            <h2 className="text-white text-lg font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              "Power Wordmark"
            </h2>
            <p className="text-[#666] text-xs mb-8 leading-relaxed">
              Tipografia pura, sem ícone. Serif moderno e bold. Energia editorial high fashion. Vogue meets tech.
            </p>
            
            {/* Main Logo */}
            <div className="flex-1 flex items-center justify-center py-12 border-t border-b border-[#222] my-4">
              <LogoPowerWordmark size="large" />
            </div>
            
            {/* Variations */}
            <div className="mt-6 space-y-6">
              <div>
                <span className="text-[#666] text-[10px] uppercase tracking-widest block mb-3">Médio</span>
                <LogoPowerWordmark size="medium" />
              </div>
              <div>
                <span className="text-[#666] text-[10px] uppercase tracking-widest block mb-3">Pequeno</span>
                <LogoPowerWordmark size="small" />
              </div>
              <div>
                <span className="text-[#666] text-[10px] uppercase tracking-widest block mb-3">Favicon</span>
                <LogoPowerWordmarkFavicon />
              </div>
            </div>
          </div>

          {/* OPTION 2: Trajectory */}
          <div className="border border-[#333] p-8 flex flex-col">
            <div className="text-[#C9A84C] text-xs uppercase tracking-[0.2em] mb-8 font-semibold">
              Opção 2
            </div>
            <h2 className="text-white text-lg font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              "Trajectory"
            </h2>
            <p className="text-[#666] text-xs mb-8 leading-relaxed">
              Ícone abstrato minimalista + wordmark clean. Linha diagonal sugere trajetória de foguete. Geométrico, não literal.
            </p>
            
            {/* Main Logo - Horizontal */}
            <div className="flex-1 flex items-center justify-center py-12 border-t border-b border-[#222] my-4">
              <LogoTrajectory layout="horizontal" size="large" />
            </div>
            
            {/* Variations */}
            <div className="mt-6 space-y-6">
              <div>
                <span className="text-[#666] text-[10px] uppercase tracking-widest block mb-3">Stacked</span>
                <LogoTrajectory layout="stacked" size="medium" />
              </div>
              <div>
                <span className="text-[#666] text-[10px] uppercase tracking-widest block mb-3">Pequeno</span>
                <LogoTrajectory layout="horizontal" size="small" />
              </div>
              <div>
                <span className="text-[#666] text-[10px] uppercase tracking-widest block mb-3">Favicon</span>
                <LogoTrajectoryFavicon />
              </div>
            </div>
          </div>

          {/* OPTION 3: Monogram */}
          <div className="border border-[#333] p-8 flex flex-col">
            <div className="text-[#C9A84C] text-xs uppercase tracking-[0.2em] mb-8 font-semibold">
              Opção 3
            </div>
            <h2 className="text-white text-lg font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              "Monogram"
            </h2>
            <p className="text-[#666] text-xs mb-8 leading-relaxed">
              Monograma geométrico sofisticado com T e R entrelaçados. Selo de casa de moda luxury. Elegância clássica.
            </p>
            
            {/* Main Logo - TR Version */}
            <div className="flex-1 flex items-center justify-center py-12 border-t border-b border-[#222] my-4">
              <LogoMonogram variant="tr" size="large" />
            </div>
            
            {/* Variations */}
            <div className="mt-6 space-y-6">
              <div>
                <span className="text-[#666] text-[10px] uppercase tracking-widest block mb-3">TKT Shield</span>
                <LogoMonogram variant="tkt" size="medium" />
              </div>
              <div>
                <span className="text-[#666] text-[10px] uppercase tracking-widest block mb-3">Pequeno</span>
                <LogoMonogram variant="tr" size="small" />
              </div>
              <div className="flex gap-2">
                <div>
                  <span className="text-[#666] text-[10px] uppercase tracking-widest block mb-3">Favicon TR</span>
                  <LogoMonogramFavicon variant="tr" />
                </div>
                <div>
                  <span className="text-[#666] text-[10px] uppercase tracking-widest block mb-3">Favicon TKT</span>
                  <LogoMonogramFavicon variant="tkt" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Notes */}
        <div className="mt-16 pt-8 border-t border-[#222] text-center">
          <p className="text-[#666] text-xs uppercase tracking-[0.15em]">
            TKT2Rocket Brand Identity — All concepts © 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
export { 
  LogoPowerWordmark, 
  LogoTrajectory, 
  LogoMonogram,
  TrajectoryIcon,
  MonogramIcon,
  MonogramTKT
};
