import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown, Activity, Cpu, Database, Network } from '../common/Icons';
import { handleAnchorClick } from '../../utils/scrollToSection';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onOpenContact }) => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const visualRef = useRef(null);
  const throughputRef = useRef(null);

  const pathIn1Ref = useRef(null);
  const pathIn2Ref = useRef(null);
  const pathOut1Ref = useRef(null);
  const pathOut2Ref = useRef(null);

  const packetIn1Ref = useRef(null);
  const packetIn2Ref = useRef(null);
  const packetOut1Ref = useRef(null);
  const packetOut2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered upward entrance
      tl.fromTo(
        '.hero-line',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, delay: 0.2 }
      )
      .fromTo(
        subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(
        visualRef.current,
        { scale: 0.94, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      );

      // Subtle float animation on nodes
      gsap.to('.network-node', {
        y: 'random(-5, 5)',
        x: 'random(-3, 3)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2,
      });

      // Pulse flow on connectors
      const pulseTween = gsap.to('.signal-pulse', {
        strokeDashoffset: -120,
        duration: 3,
        repeat: -1,
        ease: 'linear',
      });

      // Glowing Data Packets travelling through conduits
      const pIn1 = pathIn1Ref.current;
      const pIn2 = pathIn2Ref.current;
      const pOut1 = pathOut1Ref.current;
      const pOut2 = pathOut2Ref.current;

      const lenIn1 = pIn1?.getTotalLength?.() || 150;
      const lenIn2 = pIn2?.getTotalLength?.() || 150;
      const lenOut1 = pOut1?.getTotalLength?.() || 150;
      const lenOut2 = pOut2?.getTotalLength?.() || 150;

      const packetProgress = { val: 0 };
      const packetTl = gsap.timeline({ repeat: -1 });

      packetTl.to(packetProgress, {
        val: 1,
        duration: 2.4,
        ease: 'none',
        onUpdate: () => {
          const t = packetProgress.val;
          if (pIn1 && packetIn1Ref.current) {
            const pt = pIn1.getPointAtLength(t * lenIn1);
            packetIn1Ref.current.setAttribute('cx', pt.x);
            packetIn1Ref.current.setAttribute('cy', pt.y);
          }
          if (pIn2 && packetIn2Ref.current) {
            const pt = pIn2.getPointAtLength(t * lenIn2);
            packetIn2Ref.current.setAttribute('cx', pt.x);
            packetIn2Ref.current.setAttribute('cy', pt.y);
          }
          if (pOut1 && packetOut1Ref.current) {
            const pt = pOut1.getPointAtLength(t * lenOut1);
            packetOut1Ref.current.setAttribute('cx', pt.x);
            packetOut1Ref.current.setAttribute('cy', pt.y);
          }
          if (pOut2 && packetOut2Ref.current) {
            const pt = pOut2.getPointAtLength(t * lenOut2);
            packetOut2Ref.current.setAttribute('cx', pt.x);
            packetOut2Ref.current.setAttribute('cy', pt.y);
          }
        },
      });

      // 3D SCROLL PARALLAX, TILT, AND SCROLL VELOCITY PACKET ACCELERATION
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          const p = self.progress;
          const velocity = Math.abs(self.getVelocity());

          // 3D Parallax & Perspective Tilt
          if (visualRef.current) {
            gsap.to(visualRef.current, {
              rotateX: -14 * p,
              rotateY: 10 * p,
              y: -50 * p,
              scale: 1 - 0.04 * p,
              boxShadow: `0 ${20 + 35 * p}px ${50 + 40 * p}px -10px rgba(47, 79, 210, ${0.08 + 0.16 * p})`,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }

          // Accelerate data packet stream with scroll velocity!
          const speedMultiplier = Math.min(6.5, 1 + velocity / 180);
          gsap.to(packetTl, {
            timeScale: speedMultiplier,
            duration: 0.15,
            overwrite: 'auto',
          });

          // Accelerate connector dash flow
          gsap.to(pulseTween, {
            timeScale: speedMultiplier,
            duration: 0.15,
            overwrite: 'auto',
          });

          // Dynamic throughput telemetry readout
          if (throughputRef.current) {
            const liveThroughput = Math.round(85 + velocity * 0.45);
            throughputRef.current.textContent = `Throughput: ${liveThroughput} msg/s`;
          }
        },
        onScrubComplete: () => {
          // Decelerate smoothly back to idle baseline speed
          gsap.to(packetTl, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
          gsap.to(pulseTween, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
          if (throughputRef.current) {
            throughputRef.current.textContent = 'Avg. Latency < 85ms';
          }
        },
      });

      // Interactive mouse 3D tilt on hover
      const card = visualRef.current;
      if (card) {
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 14,
            rotateX: -y * 14,
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-46px)] flex flex-col justify-center pt-20 sm:pt-24 pb-8 md:pb-12 overflow-hidden bg-[#F5F4EF] border-b border-black/[0.06]"
      id="home"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 grovix-grid-bg opacity-35 pointer-events-none -z-10" />

      {/* Ambient Subtle Tech Mesh Glow (Strictly royal blue accents) */}
      <div className="absolute top-12 left-1/4 w-[480px] h-[300px] bg-[#2F4FD2]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-24 right-1/4 w-[420px] h-[300px] bg-[#3B66F5]/4 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Editorial Label */}
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E5E1D8] text-[11px] font-mono font-semibold uppercase tracking-wider text-[#4A4840]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F4FD2] animate-pulse" />
            Practical Digital Systems &bull; Automation &bull; AI
          </span>
        </div>

        {/* Editorial Grid: Left Typography, Right System Schematic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-7 pr-0 lg:pr-4">
            <h1
              ref={headlineRef}
              className="text-[#111418] font-extrabold tracking-[-0.035em] leading-[1.05] font-heading select-none"
              style={{ fontSize: 'clamp(2.2rem, 4.4vw, 4.35rem)' }}
            >
              <span className="block overflow-hidden pb-0.5">
                <span className="hero-line block">Build smarter.</span>
              </span>
              <span className="block overflow-hidden pb-0.5">
                <span className="hero-line block text-[#111418]">
                  Automate <span className="text-[#2F4FD2]">better.</span>
                </span>
              </span>
              <span className="block overflow-hidden pb-0.5">
                <span className="hero-line block text-[#6D6B5F]">
                  Grow faster.
                </span>
              </span>
            </h1>

            <p
              ref={subtextRef}
              className="mt-4 text-sm sm:text-base md:text-[17px] text-[#4A4840] font-normal leading-relaxed max-w-lg font-body"
            >
              Grovix builds automation, AI systems and custom software that turn complex business processes into simple digital workflows.
            </p>

            {/* CTAs (Prominently visible above the fold) */}
            <div
              ref={ctaRef}
              className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 pt-1"
            >
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#111418] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-[0_8px_20px_-4px_rgba(17,20,24,0.25)] hover:-translate-y-0.5 active:scale-[0.98] group cursor-pointer"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4 text-[#2F4FD2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="#services"
                onClick={(e) => handleAnchorClick(e, '#services')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#EFECE5] text-[#111418] text-xs sm:text-sm font-semibold border border-[#E5E1D8] transition-all duration-200 hover:border-[#DDD8CD] active:scale-[0.98] shadow-xs cursor-pointer group"
              >
                <span>Explore Services</span>
                <ArrowDown className="w-4 h-4 text-[#6D6B5F] group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Verified Operational Proof Points */}
            <div className="mt-6 pt-4 border-t border-[#E5E1D8] flex flex-wrap items-center gap-y-2 gap-x-5 text-[11px] sm:text-xs font-mono text-[#6D6B5F]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F4FD2]" />
                <span className="text-[#111418] font-medium">Zero Manual Re-Entry</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B66F5]" />
                <span className="text-[#111418] font-medium">14–21 Day Sprints</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F4FD2]" />
                <span className="text-[#111418] font-medium">100% Code & Data Ownership</span>
              </div>
            </div>
          </div>

          {/* Right System Schematic Visual (3D Scroll Parallax & Perspective Container) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end pl-0 lg:pl-4 xl:pl-8" style={{ perspective: '1200px' }}>
            <div
              ref={visualRef}
              style={{ transformStyle: 'preserve-3d', transformPerspective: '1200px' }}
              className="relative w-full max-w-[400px] aspect-[4/3.5] rounded-2xl bg-white border border-[#E5E1D8] shadow-[0_16px_48px_-12px_rgba(17,20,24,0.06)] p-5 flex flex-col justify-between overflow-hidden group select-none transition-shadow duration-300"
            >
              {/* Top Bar of Console */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#4A4840] font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#2F4FD2] animate-ping" />
                  <span>GROVIX WORKFLOW ENGINE</span>
                </div>
                <span className="font-mono text-[10px] text-[#2F4FD2] bg-[#EEF2FF] px-2 py-0.5 rounded-md font-semibold border border-[#2F4FD2]/30">
                  SYSTEM ACTIVE
                </span>
              </div>

              {/* Central SVG Network Graph */}
              <div className="relative flex-1 py-3 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 380 240" fill="none">
                  <defs>
                    <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Background grid lines */}
                  <line x1="20" y1="120" x2="360" y2="120" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="190" y1="20" x2="190" y2="220" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Flow Connections with Conduit Paths */}
                  <path
                    ref={pathIn1Ref}
                    d="M 60 70 Q 120 70 190 120"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <path
                    ref={pathIn2Ref}
                    d="M 60 170 Q 120 170 190 120"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <path
                    ref={pathOut1Ref}
                    d="M 190 120 Q 260 70 320 70"
                    stroke="#2F4FD2"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="signal-pulse"
                  />
                  <path
                    ref={pathOut2Ref}
                    d="M 190 120 Q 260 170 320 170"
                    stroke="#3B66F5"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="signal-pulse"
                  />

                  {/* Traveling Glowing Data Packets */}
                  <circle ref={packetIn1Ref} r="4" fill="#2F4FD2" filter="url(#packet-glow)" />
                  <circle ref={packetIn2Ref} r="4" fill="#3B66F5" filter="url(#packet-glow)" />
                  <circle ref={packetOut1Ref} r="4.5" fill="#2F4FD2" filter="url(#packet-glow)" />
                  <circle ref={packetOut2Ref} r="4.5" fill="#3B66F5" filter="url(#packet-glow)" />

                  {/* Central Node */}
                  <g className="network-node">
                    <circle cx="190" cy="120" r="30" fill="#111418" />
                    <circle cx="190" cy="120" r="38" stroke="#2F4FD2" strokeWidth="1.5" strokeOpacity="0.4" />
                    <text x="190" y="116" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">GROVIX</text>
                    <text x="190" y="128" textAnchor="middle" fill="#2F4FD2" fontSize="8" fontFamily="JetBrains Mono">PIPELINE</text>
                  </g>

                  {/* Input Nodes */}
                  <g className="network-node">
                    <rect x="20" y="50" width="80" height="40" rx="8" fill="#FAF9F6" stroke="#E5E1D8" />
                    <text x="60" y="68" textAnchor="middle" fill="#111418" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="600">Manual Entry</text>
                    <text x="60" y="80" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">Spreadsheets</text>
                  </g>
                  <g className="network-node">
                    <rect x="20" y="150" width="80" height="40" rx="8" fill="#FAF9F6" stroke="#E5E1D8" />
                    <text x="60" y="168" textAnchor="middle" fill="#111418" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="600">Legacy ERP</text>
                    <text x="60" y="180" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">Siloed Data</text>
                  </g>

                  {/* Output Nodes */}
                  <g className="network-node">
                    <rect x="280" y="50" width="80" height="40" rx="8" fill="#EEF2FF" stroke="#2F4FD2" strokeWidth="1.2" />
                    <text x="320" y="68" textAnchor="middle" fill="#111418" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="700">Auto Workflows</text>
                    <text x="320" y="80" textAnchor="middle" fill="#2F4FD2" fontSize="8" fontFamily="JetBrains Mono">WhatsApp &bull; Cloud</text>
                  </g>
                  <g className="network-node">
                    <rect x="280" y="150" width="80" height="40" rx="8" fill="#F0F4FF" stroke="#3B66F5" strokeWidth="1.2" />
                    <text x="320" y="168" textAnchor="middle" fill="#111418" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="700">Custom Portals</text>
                    <text x="320" y="180" textAnchor="middle" fill="#3B66F5" fontSize="8" fontFamily="JetBrains Mono">Real-time Ops</text>
                  </g>
                </svg>
              </div>

              {/* Bottom Metrics Bar with dynamic Throughput */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-[#6D6B5F]">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#2F4FD2] animate-pulse" />
                  <span ref={throughputRef} className="tabular-nums font-semibold text-[#111418]">
                    Avg. Latency &lt; 85ms
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#2F4FD2] bg-[#EEF2FF] px-2 py-0.5 rounded font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F4FD2] animate-ping" />
                  STREAMING
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
