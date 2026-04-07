'use client';

import React, { useEffect, useRef } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
    {
        id: 1,
        quote:
            "J\'amène toute ma famille à Centre D'expertise Biomedicale Maombi depuis trois ans. Les pédiatres sont patients et minutieux — mes enfants attendent maintenant les consultations avec impatience.",
        name: 'Lucy bakamu',
        role: 'Mère de trois enfants, Goma',
        initials: 'LB',
        color: '#0D9488',
    },
    {
        id: 2,
        quote:
            "Après mon accident cardiaque, l'équipe de cardiologie a tout coordonné de manière transparente — du transfert aux urgences jusqu'à mon test d'effort de suivi. Je ne me suis jamais senti perdu dans le système.",
        name: 'Jacques Magumba',
        role: 'Patient cardiaque, 58 ans',
        initials: 'JM',
        color: '#0F766E',
    },
    {
        id: 3,
        quote:
            "Les diagnostics le jour même m'ont épargné des semaines d'anxiété. Résultats sanguins en moins de quatre heures, et mon médecin m'a appelé personnellement pour tout expliquer.",
        name: 'Selengo Nkina',
        role: 'Ingénieure logiciel',
        initials: 'SN',
        color: '#115E59',
    },
];

export default function TestimonialsSection() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.classList.add('animate-fade-in-up');
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        cardRefs.current.forEach((ref, i) => {
            if (ref) {
                ref.style.animationDelay = `${i * 0.15}s`;
                observer.observe(ref);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="testimonials" className="py-16 md:py-20 relative overflow-hidden">
            {/* Background tint */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,30,53,0.6) 50%, transparent 100%)' }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-14">
          <span className="text-primary-500 text-xs font-semibold tracking-widest uppercase block mb-3">
            Témoignages Patients
          </span>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
                        Des personnes réelles, des résultats concrets.
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={t.id}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            className="glass-card opacity-100 p-6 md:p-7 rounded-2xl flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-all duration-500"
                        >
                            {/* Stars */}
                            <div>
                                <div className="flex gap-1 mb-5">
                                    {Array.from({ length: 5 }).map((_, si) => (
                                        <StarIcon key={si} className="w-4 h-4 text-primary-400" />
                                    ))}
                                </div>
                                <blockquote className="text-slate-300 italic leading-relaxed text-sm md:text-base font-light">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 mt-7">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                                    style={{ background: `${t.color}40`, border: `1px solid ${t.color}50` }}
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">{t.name}</p>
                                    <p className="text-slate-500 text-xs mt-0.5">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}