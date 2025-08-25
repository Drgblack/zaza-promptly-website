'use client'

import { useEffect } from 'react'

export default function HeroIllustration() {
  // Mouse parallax effect for desktop only
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return // skip touch devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.getElementById('hero-illustration')
    if (!root) return

    const layers = {
      blob: root.querySelector('.hero-drift') as HTMLElement | null,
      tiles: root.querySelectorAll<HTMLElement>('.tile'),
      bubbles: root.querySelectorAll<HTMLElement>('.bubble'),
      sparkles: root.querySelector<HTMLElement>('.sparkles'),
    }

    function onMove(e: MouseEvent) {
      const r = root!.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = (e.clientX - cx) / r.width   // -0.5..0.5
      const dy = (e.clientY - cy) / r.height  // -0.5..0.5
      
      // Apply subtle parallax transforms
      if (layers.blob) layers.blob.style.transform = `translate(${dx * 10}px, ${dy * 6}px)`
      if (layers.sparkles) layers.sparkles.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`
      
      layers.tiles.forEach((el, i) => { 
        el.style.transform = `translate(${dx * (14 + i)}px, ${dy * (10 + i * 0.6)}px)` 
      })
      layers.bubbles.forEach((el, i) => { 
        el.style.transform = `translate(${dx * (8 + i)}px, ${dy * (6 + i * 0.5)}px)` 
      })
    }
    
    root.addEventListener('mousemove', onMove)
    return () => root.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      id="hero-illustration"
      className="relative mx-auto mt-4 md:mt-5 mb-5 md:mb-7 w-full max-w-6xl
                 h-[220px] md:h-[300px] lg:h-[360px] pointer-events-none will-change-transform"
      aria-hidden="true"
      role="img"
      aria-label="Interactive illustration showing AI-powered teaching tools"
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1200 360" 
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background gradient blob */}
        <defs>
          <radialGradient id="bg-gradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.03"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background blob */}
        <ellipse 
          className="hero-drift" 
          cx="600" 
          cy="180" 
          rx="500" 
          ry="140" 
          fill="url(#bg-gradient)"
        />

        {/* Tile 1 - Report Writing */}
        <g className="tile tile-1">
          <rect x="80" y="45" rx="16" ry="16" width="140" height="90" fill="#ffffff" opacity="0.92" filter="url(#glow)"/>
          <rect x="95" y="65" width="110" height="8" fill="#e2e8f0" rx="4"/>
          <rect x="95" y="78" width="85" height="6" fill="#cbd5e1" rx="3"/>
          <rect x="95" y="88" width="95" height="6" fill="#cbd5e1" rx="3"/>
          <rect x="95" y="98" width="70" height="6" fill="#cbd5e1" rx="3"/>
          <circle cx="195" cy="115" r="8" fill="#10b981"/>
          <path d="M191 115 l3 3 l6 -6" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>

        {/* Tile 2 - Parent Communication */}
        <g className="tile tile-2">
          <rect x="750" y="55" rx="16" ry="16" width="140" height="90" fill="#ffffff" opacity="0.90" filter="url(#glow)"/>
          <circle cx="780" cy="85" r="12" fill="#f1f5f9"/>
          <rect x="800" y="78" width="70" height="6" fill="#475569" rx="3"/>
          <rect x="800" y="88" width="50" height="4" fill="#64748b" rx="2"/>
          <circle cx="860" cy="110" r="15" fill="#3b82f6"/>
          <path d="M853 110 l5 5 l10 -10" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>

        {/* Tile 3 - AI Assistant */}
        <g className="tile tile-3">
          <rect x="420" y="25" rx="16" ry="16" width="140" height="90" fill="#ffffff" opacity="0.94" filter="url(#glow)"/>
          <circle cx="460" cy="60" r="18" fill="#8b5cf6"/>
          <path d="M450 60 Q460 45 470 60 Q460 75 450 60" fill="#ffffff"/>
          <rect x="490" y="55" width="50" height="4" fill="#8b5cf6" rx="2"/>
          <rect x="490" y="65" width="35" height="4" fill="#a78bfa" rx="2"/>
        </g>

        {/* Tile 4 - Analytics Dashboard */}
        <g className="tile tile-4">
          <rect x="120" y="200" rx="16" ry="16" width="140" height="90" fill="#ffffff" opacity="0.88" filter="url(#glow)"/>
          <rect x="140" y="230" width="15" height="35" fill="#06b6d4" rx="2"/>
          <rect x="160" y="220" width="15" height="45" fill="#0ea5e9" rx="2"/>
          <rect x="180" y="225" width="15" height="40" fill="#0284c7" rx="2"/>
          <rect x="200" y="215" width="15" height="50" fill="#0369a1" rx="2"/>
        </g>

        {/* Tile 5 - Time Management */}
        <g className="tile tile-5">
          <rect x="780" y="210" rx="16" ry="16" width="140" height="90" fill="#ffffff" opacity="0.90" filter="url(#glow)"/>
          <circle cx="830" cy="245" r="20" fill="none" stroke="#10b981" strokeWidth="3"/>
          <path d="M830 225 L830 245 L845 260" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <rect x="860" y="235" width="40" height="6" fill="#10b981" rx="3"/>
          <rect x="860" y="245" width="30" height="4" fill="#22c55e" rx="2"/>
        </g>

        {/* NEW Tile 6 - SaaS Platform */}
        <g className="tile tile-6">
          <rect x="255" y="18" rx="16" ry="16" width="140" height="90" fill="#ffffff" opacity="0.88" filter="url(#glow)"/>
          <rect x="280" y="45" width="40" height="25" fill="none" stroke="#06b6d4" strokeWidth="3" rx="4"/>
          <rect x="330" y="45" width="40" height="25" fill="none" stroke="#06b6d4" strokeWidth="3" rx="4"/>
          <path d="M300 58 L330 58" stroke="#06b6d4" strokeWidth="2"/>
          <circle cx="315" cy="58" r="3" fill="#06b6d4"/>
        </g>

        {/* NEW Tile 7 - Success Metrics */}
        <g className="tile tile-7">
          <rect x="940" y="22" rx="16" ry="16" width="140" height="90" fill="#ffffff" opacity="0.86" filter="url(#glow)"/>
          <path d="M965 75 L975 85 L1000 55" stroke="#f43f5e" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <circle cx="1000" cy="55" r="4" fill="#f43f5e"/>
          <rect x="1010" y="65" width="35" height="6" fill="#f43f5e" rx="3"/>
          <rect x="1010" y="75" width="25" height="4" fill="#fb7185" rx="2"/>
        </g>

        {/* Message Bubble 1 */}
        <g className="bubble b1">
          <rect x="320" y="180" rx="14" ry="14" width="200" height="54" fill="#ffffff" opacity="0.96" filter="url(#glow)"/>
          <circle cx="340" cy="200" r="8" fill="#f1f5f9"/>
          <rect x="355" y="195" width="120" height="4" fill="#475569" rx="2"/>
          <rect x="355" y="205" width="80" height="3" fill="#64748b" rx="1.5"/>
          <path d="M330 234 L340 244 L350 234" fill="#ffffff"/>
        </g>

        {/* Message Bubble 2 */}
        <g className="bubble b2">
          <rect x="680" y="150" rx="14" ry="14" width="180" height="48" fill="#ffffff" opacity="0.94" filter="url(#glow)"/>
          <rect x="700" y="165" width="100" height="4" fill="#8b5cf6" rx="2"/>
          <rect x="700" y="175" width="70" height="3" fill="#a78bfa" rx="1.5"/>
          <path d="M770 198 L780 208 L790 198" fill="#ffffff"/>
        </g>

        {/* NEW Message Bubble 3 */}
        <g className="bubble b3">
          <rect x="520" y="230" rx="14" ry="14" width="220" height="54" fill="#ffffff" opacity="0.94" filter="url(#glow)"/>
          <rect x="540" y="245" width="130" height="4" fill="#10b981" rx="2"/>
          <rect x="540" y="255" width="90" height="3" fill="#22c55e" rx="1.5"/>
          <circle cx="710" cy="252" r="6" fill="#10b981"/>
          <path d="M625 284 L635 294 L645 284" fill="#ffffff"/>
        </g>

        {/* Sparkles */}
        <g className="sparkles">
          <circle cx="360" cy="54" r="2.5" fill="#a5b4fc" opacity="0.8"/>
          <circle cx="880" cy="62" r="2" fill="#99f6e4" opacity="0.8"/>
          <circle cx="740" cy="36" r="2.25" fill="#fca5a5" opacity="0.8"/>
          <circle cx="200" cy="160" r="2" fill="#fde68a" opacity="0.8"/>
          <circle cx="950" cy="140" r="2.5" fill="#d8b4fe" opacity="0.8"/>
        </g>

        {/* Animated connector line */}
        <path 
          className="connector" 
          d="M340 115 C 470 80, 720 90, 860 120"
          stroke="#94a3b8" 
          strokeDasharray="4 6" 
          strokeWidth="2" 
          fill="none" 
          opacity="0.6"
        />
      </svg>

      <style jsx>{`
        .hero-drift { 
          animation: drift 16s ease-in-out infinite; 
        }
        
        @keyframes drift { 
          0%, 100% { transform: translateY(0) scale(1); } 
          50% { transform: translateY(8px) scale(1.015); } 
        }

        /* Staggered floating animations for tiles */
        .tile-1 { animation: float1 9s ease-in-out infinite 0.2s; }
        .tile-2 { animation: float2 10s ease-in-out infinite 0.6s; }
        .tile-3 { animation: float3 11s ease-in-out infinite 0.4s; }
        .tile-4 { animation: float2 12s ease-in-out infinite 0.9s reverse; }
        .tile-5 { animation: float1 10.5s ease-in-out infinite 0.7s reverse; }
        .tile-6 { animation: float3 12.5s ease-in-out infinite 0.3s; }
        .tile-7 { animation: float2 13s ease-in-out infinite 1.1s; }

        @keyframes float1 { 
          0%, 100% { transform: translateY(0) rotate(0.2deg); } 
          50% { transform: translateY(-12px) rotate(-0.8deg); } 
        }
        @keyframes float2 { 
          0%, 100% { transform: translateY(0) rotate(-0.2deg); } 
          50% { transform: translateY(-16px) rotate(0.8deg); } 
        }
        @keyframes float3 { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }

        /* Bubble animations */
        .bubble { animation: bob 7s ease-in-out infinite; }
        .bubble.b2 { animation-delay: 0.8s; }
        .bubble.b3 { animation-delay: 1.6s; }
        
        @keyframes bob { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-7px); } 
        }

        /* Sparkle animations */
        .sparkles circle { 
          animation: twinkle 2.6s ease-in-out infinite; 
          transform-origin: center; 
        }
        .sparkles circle:nth-child(2) { animation-delay: 0.8s; }
        .sparkles circle:nth-child(3) { animation-delay: 1.4s; }
        .sparkles circle:nth-child(4) { animation-delay: 0.4s; }
        .sparkles circle:nth-child(5) { animation-delay: 1.2s; }
        
        @keyframes twinkle { 
          0%, 100% { opacity: 0.4; transform: scale(1); } 
          50% { opacity: 0.9; transform: scale(1.35); } 
        }

        /* Connector line draws in on load */
        .connector { 
          stroke-dasharray: 400; 
          stroke-dashoffset: 400; 
          animation: draw 1.8s ease forwards 0.4s; 
        }
        
        @keyframes draw { 
          to { stroke-dashoffset: 0; } 
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-drift,
          .tile-1, .tile-2, .tile-3, .tile-4, .tile-5, .tile-6, .tile-7,
          .bubble, .sparkles circle, .connector {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}