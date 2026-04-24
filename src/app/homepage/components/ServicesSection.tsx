'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ServiceCard {
    id: number;
    title: string;
    description: string;
    icon: string;
    colSpan: string;
    rowSpan?: string;
    image?: string;
    imageAlt?: string;
    accent?: string;
    dark?: boolean;
}

const services: ServiceCard[] = [
    {
        id: 1,
        title: 'Consultation médicale et services diagnostiques',
        description: 'Consultations médicales complètes et services diagnostiques avancés incluant imagerie, analyses de laboratoire et pathologie. Résultats disponibles en quelques heures pour la plupart des examens.',
        icon: 'BeakerIcon',
        colSpan: 'md:col-span-2',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_122893eee-1768046466635.png",
        imageAlt: 'Équipe médicale dans un couloir d\'hôpital sombre avec un éclairage ambiant bleu dramatique et des ombres profondes',
        dark: true
    },
    {
        id: 2,
        title: 'Métrologie et maintenance biomédicale',
        description: 'Étalonnage, vérification et maintenance des équipements biomédicaux selon les normes internationales pour garantir la précision et la fiabilité des dispositifs médicaux.',
        icon: 'BoltIcon',
        colSpan: 'md:col-span-1',
        accent: '#0D9488'
    },
    {
        id: 3,
        title: 'Consultance et formation en domaine biomédical',
        description: 'Accompagnement expert et programmes de formation spécialisés en ingénierie biomédicale pour les professionnels de santé et les établissements médicaux.',
        icon: 'UserGroupIcon',
        colSpan: 'md:col-span-1',
        accent: '#0F766E'
    },
    {
        id: 4,
        title: 'Recherche et développement biomédical',
        description: 'Projets de recherche innovants et développement de solutions biomédicales de pointe pour améliorer les pratiques cliniques et les technologies de santé.',
        icon: 'SparklesIcon',
        colSpan: 'md:col-span-2',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_18406a950-1772702842018.png",
        imageAlt: "Chercheur biomédical travaillant dans un laboratoire moderne, atmosphère clinique teal sombre, cadre de recherche professionnel",
        dark: true
    }];


export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const cards = sectionRef.current?.querySelectorAll('.service-card');
        if (!cards) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.classList.add('animate-fade-in-up');
                        el.style.opacity = '1';
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        );

        cards.forEach((card, i) => {
            (card as HTMLElement).style.animationDelay = `${i * 0.08}s`;
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
            {/* Ambient */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 70%)',
                    filter: 'blur(80px)'
                }} />


            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="mb-12 md:mb-14">
          <span className="text-primary-500 text-xs font-semibold tracking-widest uppercase block mb-3">
            Nos Activités
          </span>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-lg">
                            Renforcer la Santé<br />
                            <span className="text-primary-400">Par le Savoir.</span>
                        </h2>
                        <p className="text-slate-400 font-light max-w-sm leading-relaxed text-sm md:text-base">
                            Quatre domaines d&apos;activité biomédicale réunis sous un même toit, avec une coordination optimale entre les services.
                        </p>
                    </div>
                </div>

                {/* Bento Grid — 3 columns */}
                {/* Row audit:
              Row 1: [Consultation col-span-2] + [Métrologie col-span-1] = 3/3 ✓
              Row 2: [Consultance col-span-1] + [Recherche col-span-2] = 3/3 ✓
           */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
                    {services.map((service) =>
                        <div
                            key={service.id}
                            className={`service-card ${service.colSpan} opacity-100 group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-default`}
                            style={{ minHeight: service.colSpan.includes('2') ? '240px' : '200px' }}>

                            {service.dark && service.image ? (
                                /* Image card */
                                <>
                                    <AppImage
                                        src={service.image}
                                        alt={service.imageAlt || service.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 66vw"
                                        className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />

                                    {/* Scrim: dark overlay from bottom for white text */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <Icon name={service.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-primary-400" />
                      </span>
                                            <span className="text-xs text-primary-400 font-semibold tracking-widest uppercase">Activité Principale</span>
                                        </div>
                                        <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-2">{service.title}</h3>
                                        <p className="text-slate-300 text-sm font-light leading-relaxed">{service.description}</p>
                                    </div>
                                </>) : (

                                /* Plain glass card */
                                <div
                                    className="glass-card h-full p-5 md:p-6 flex flex-col justify-between"
                                    style={{ borderColor: `${service.accent}25` }}>

                                    <div>
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                                            style={{ background: `${service.accent}20` }}>

                                            <Icon name={service.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-primary-400" />
                                        </div>
                                        <h3 className="font-display text-lg font-semibold text-white mb-2">{service.title}</h3>
                                        <p className="text-slate-400 text-sm font-light leading-relaxed">{service.description}</p>
                                    </div>
                                    <div className="mt-4 flex items-center gap-1.5 text-primary-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span>En savoir plus</span>
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>)
                            }
                        </div>
                    )}
                </div>
            </div>
        </section>);

}