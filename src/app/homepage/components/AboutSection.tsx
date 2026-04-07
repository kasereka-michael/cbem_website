'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import building from '@/public/images/building.jpeg';
import { ShieldCheckIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const stats = [
    { value: '10k+', label: 'Patients Suivis', icon: UserGroupIcon },
    { value: '15 ans', label: 'En Activité', icon: ClockIcon },
    { value: '40+', label: 'Spécialistes', icon: ShieldCheckIcon }];


const pillars = [
    {
        title: 'Médecine Fondée sur les Preuves',
        body: 'Chaque diagnostic et plan de traitement suit les recommandations cliniques actuelles — sans approximation, sans examens inutiles.'
    },
    {
        title: 'Soins Coordonnés',
        body: 'Votre médecin traitant coordonne avec les spécialistes, les laboratoires et les pharmacies pour que vous n\'ayez jamais à répéter votre histoire.'
    }];


export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === imageRef.current) {
                            imageRef.current?.classList.add('animate-fade-in-up');
                        }
                        if (entry.target === contentRef.current) {
                            contentRef.current?.classList.add('animate-fade-in-up');
                            contentRef.current?.style.setProperty('animation-delay', '0.2s');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        if (imageRef?.current) observer?.observe(imageRef?.current);
        if (contentRef?.current) observer?.observe(contentRef?.current);

        return () => observer?.disconnect();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
            {/* Subtle bg layer */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(13,148,136,0.03) 50%, transparent 100%)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                    {/* Image side */}
                    <div ref={imageRef} className="w-full lg:w-1/2 relative opacity-100 group">
                        {/* Glow halo */}
                        <div
                            className="absolute -inset-6 rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }} />


                        {/* Rotated image */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-all duration-700 ease-out">
                            <AppImage
                                src="https://img.rocket.new/generatedImages/rocket_gen_img_1dfa89059-1767197235564.png"
                                alt="Équipe médicale de médecins dans un intérieur de clinique lumineux, atmosphère professionnelle chaleureuse, environnement de soins collaboratif"
                                width={640}
                                height={480}
                                className="w-full object-cover"
                                priority={false} />

                            {/* Light scrim for dark text badge */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                        </div>

                        {/* Floating badge */}
                        <div
                            className="absolute -bottom-4 -right-2 md:bottom-8 md:-right-6 glass-card p-4 rounded-2xl shadow-xl border border-white/10 max-w-[200px] animate-float"
                            style={{ animationDelay: '0.5s' }}>

                            <div className="flex items-start gap-3">
                                <div className="bg-primary-500/20 p-2 rounded-xl shrink-0">
                                    <ShieldCheckIcon className="w-5 h-5 text-primary-400" />
                                </div>
                                <div>
                                    <p className="font-display font-semibold text-white text-sm">Identification nationale</p>
                                    <p className="text-slate-400 text-xs mt-0.5 leading-snug">01-Q8601-N80824T RCCM : CD/KNG/RCCM/25-A-06846</p>
                                </div>
                            </div>
                        </div>

                        {/* Staggered second image */}
                        <div className="hidden md:block absolute -top-6 -right-4 w-36 h-36 rounded-2xl overflow-hidden border-2 border-navy-700 shadow-xl rotate-3">
                            <AppImage
                                src='/assets/images/building.jpeg'
                                alt="Gros plan d'équipement médical dans un cadre clinique lumineux, propre et professionnel"
                                width={144}
                                height={144}
                                className="w-full h-full object-cover" />

                        </div>
                    </div>

                    {/* Content side */}
                    <div ref={contentRef} className="w-full lg:w-1/2 opacity-100 flex flex-col justify-between gap-8">
                        <div>
              <span className="text-primary-500 text-xs font-semibold tracking-widest uppercase block mb-4">
                Notre Philosophie
              </span>
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
                                Une médecine qui place
                                <br />
                                <em className="text-primary-400 not-italic">le patient au centre.</em>
                            </h2>
                            <div
                                className="w-16 h-px mb-6"
                                style={{ background: 'linear-gradient(90deg, #0D9488, transparent)' }} />

                            <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed mb-8">
                                Depuis 2024, Centre D'expertise Biomedicale Maombi est passé d&apos;un cabinet de deux médecins à un campus médical complet —
                                sans jamais perdre de vue l&apos;essentiel : écouter les patients,
                                agir rapidement et traiter chaque personne avec dignité.
                            </p>
                        </div>

                        {/* Pillars */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {pillars?.map((p) =>
                                <div key={p?.title} className="glass-card p-4 rounded-xl">
                                    <h4 className="font-display font-semibold text-white text-sm mb-2">{p?.title}</h4>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed">{p?.body}</p>
                                </div>
                            )}
                        </div>

                        {/* Stats */}
                        {/*<div className="flex flex-wrap gap-8 pt-2">*/}
                        {/*    {stats?.map((stat) =>*/}
                        {/*        <div key={stat?.label} className="flex flex-col">*/}
                        {/*            <span className="font-display text-3xl font-semibold text-white">{stat?.value}</span>*/}
                        {/*            <span className="text-slate-500 text-xs uppercase tracking-wider mt-1">{stat?.label}</span>*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </section>);

}