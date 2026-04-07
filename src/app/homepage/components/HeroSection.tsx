'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import { ArrowRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

const heroCards = [
    {
        id: 1,
        title: 'Soins Primaires',
        subtitle: 'Médecine Générale & Familiale',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dfa89059-1767197235564.png",
        alt: 'Médecin en blouse blanche dans un couloir de clinique faiblement éclairé, environnement médical aux tons bleu profond, cadre clinique professionnel',
        delay: 'delay-400'
    },
    {
        id: 2,
        title: 'Diagnostics',
        subtitle: 'Laboratoire & Imagerie Avancés',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_12c122ea1-1772880604662.png",
        alt: 'Équipement de diagnostic médical dans une salle clinique sombre, éclairage ambiant bleu, technologie médicale sophistiquée',
        delay: 'delay-600',
        elevated: true
    },
    {
        id: 3,
        title: 'Soins Spécialisés',
        subtitle: 'Cardiologie · Ortho · Neuro',
        image: "https://images.unsplash.com/photo-1601579984303-f2aabeda2037",
        alt: 'Spécialistes médicaux en consultation dans un hôpital sombre, éclairage dramatique en clair-obscur, atmosphère clinique',
        delay: 'delay-800'
    }];


export default function HeroSection() {
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const badge = badgeRef?.current;
        if (!badge) return;
        badge.style.opacity = '1';
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
            {/* Noise texture */}
            <div className="fixed inset-0 noise-overlay pointer-events-none z-0" />
            {/* Ambient light blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute top-[-8%] right-[-4%] w-[320px] md:w-[560px] h-[320px] md:h-[560px] rounded-full animate-pulse-glow"
                    style={{
                        background: 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0.04) 60%, transparent 100%)',
                        filter: 'blur(80px)'
                    }} />

                <div
                    className="absolute bottom-[-12%] left-[-8%] w-[400px] md:w-[640px] h-[400px] md:h-[640px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(30,58,110,0.3) 0%, rgba(11,22,40,0.1) 60%, transparent 100%)',
                        filter: 'blur(100px)'
                    }} />

                <div
                    className="absolute top-[40%] left-[35%] w-[200px] h-[200px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)',
                        filter: 'blur(60px)'
                    }} />

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
                {/* Status badge */}
                <div
                    ref={badgeRef}
                    className="glass-card inline-flex items-center gap-3 px-4 py-2 rounded-full mb-10 opacity-0 animate-fade-in delay-0 cursor-default">

                    <span className="w-2 h-2 rounded-full bg-primary-400 shadow-[0_0_8px_rgba(13,148,136,0.8)]" />
                    <span className="text-xs tracking-widest uppercase text-slate-300 font-medium">
            Nouveaux patients acceptés · Dim–Sam 7h–22h
          </span>
                </div>

                {/* Headline */}
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-[1.04] tracking-tight mb-6 opacity-0 animate-fade-in delay-200">
                    Des Soins Bienveillants,
                    <br />
                    <span className="relative inline-block">
            <span
                className="relative z-10"
                style={{
                    background: 'linear-gradient(135deg, #F0FDFA 0%, #5EEAD4 40%, #0D9488 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>

              L&apos;Excellence CEBM.
            </span>
            <span
                className="absolute bottom-0 left-0 w-full h-0.5 opacity-40"
                style={{ background: 'linear-gradient(90deg, transparent, #0D9488, transparent)' }} />

          </span>
                </h1>

                {/* Subheadline */}
                <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed opacity-0 animate-fade-in delay-400 px-2">
                    Des consultations le jour même aux orientations vers des spécialistes — Centre D'expertise Biomedicale Maombi réunit des médecins
                    sous un même toit pour que votre famille n&apos;attende jamais les soins qu&apos;elle mérite.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 opacity-0 animate-fade-in delay-600">
                    <a
                        href="#contact"
                        className="btn-shine flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-xl shadow-primary-900/40 w-full sm:w-auto justify-center">

                        <CalendarDaysIcon className="w-4 h-4" />
                        Prendre Rendez-vous
                    </a>
                    <a
                        href="#services"
                        className="glass-card flex items-center gap-2 hover:bg-white/[0.06] text-slate-200 hover:text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 w-full sm:w-auto justify-center">

                        Découvrir nos Services
                        <ArrowRightIcon className="w-4 h-4" />
                    </a>
                </div>

                {/* 3-Card Staggered Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full" style={{ perspective: '1200px' }}>
                    {heroCards?.map((card, i) =>
                        <div
                            key={card?.id}
                            className={`group relative rounded-2xl overflow-hidden glass-card transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] opacity-0 animate-fade-in-up ${card?.delay} ${
                                card?.elevated ? 'md:-mt-10 z-20 h-64 md:h-96' : 'h-64 md:h-80'}`
                            }>

                            <AppImage
                                src={card?.image}
                                alt={card?.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700" />

                            {/* Gradient overlay — scrim from bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-800/30 to-transparent" />

                            {/* Card content */}
                            <div className="absolute bottom-5 left-5 right-5">
                                <div
                                    className="w-8 h-px mb-4 origin-left"
                                    style={{
                                        background: '#0D9488',
                                        transform: 'scaleX(0)',
                                        transformOrigin: 'left',
                                        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.1s'
                                    }}
                                    ref={(el) => {
                                        if (el) {
                                            const parent = el?.closest('.group');
                                            if (parent) {
                                                parent?.addEventListener('mouseenter', () => {
                                                    el.style.transform = 'scaleX(1)';
                                                });
                                                parent?.addEventListener('mouseleave', () => {
                                                    el.style.transform = 'scaleX(0)';
                                                });
                                            }
                                        }
                                    }} />

                                <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-1">
                                    {card?.title}
                                </h3>
                                <p className="text-xs text-slate-300 font-medium tracking-wide uppercase">
                                    {card?.subtitle}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Trust strip */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mt-12 opacity-0 animate-fade-in delay-1000">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <CheckBadgeIcon className="w-5 h-5 text-primary-500" />
                        <span>Médecins certifiés</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <CheckBadgeIcon className="w-5 h-5 text-primary-500" />
                        <span>Rendez-vous le jour même disponibles</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <CheckBadgeIcon className="w-5 h-5 text-primary-500" />
                        <span>La plupart des assurances acceptées</span>
                    </div>
                </div>
            </div>
        </section>);

}