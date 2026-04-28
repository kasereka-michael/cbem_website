'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function ServicesSection() {
    const t = useTranslations('ServicesSection');
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedService, setSelectedService] = React.useState<ServiceCard | null>(null);

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
        details?: string[];
    }

    const services: ServiceCard[] = [
        {
            id: 1,
            title: t('items.consultation.title'),
            description: t('items.consultation.description'),
            details: t.raw('items.consultation.details'),
            icon: 'BeakerIcon',
            colSpan: 'md:col-span-2',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_122893eee-1768046466635.png",
            imageAlt: 'Équipe médicale dans un couloir d\'hôpital sombre avec un éclairage ambiant bleu dramatique et des ombres profondes',
            dark: true
        },
        {
            id: 2,
            title: t('items.metrologie.title'),
            description: t('items.metrologie.description'),
            icon: 'BoltIcon',
            colSpan: 'md:col-span-1',
            accent: '#0D9488'
        },
        {
            id: 3,
            title: t('items.consultance.title'),
            description: t('items.consultance.description'),
            details: t.raw('items.consultance.details'),
            icon: 'UserGroupIcon',
            colSpan: 'md:col-span-1',
            accent: '#0F766E'
        },
        {
            id: 4,
            title: t('items.recherche.title'),
            description: t('items.recherche.description'),
            icon: 'SparklesIcon',
            colSpan: 'md:col-span-2',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_18406a950-1772702842018.png",
            imageAlt: "Chercheur biomédical travaillant dans un laboratoire moderne, atmosphère clinique teal sombre, cadre de recherche professionnel",
            dark: true
        }];

    useEffect(() => {
        if (selectedService) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedService]);

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
            {t('badge')}
          </span>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-lg">
                            {t('headline')}<br />
                            <span className="text-primary-400">{t('subheadline')}</span>
                        </h2>
                        <p className="text-slate-400 font-light max-w-sm leading-relaxed text-sm md:text-base">
                            {t('description')}
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
                            onClick={() => service.details && setSelectedService(service)}
                            className={`service-card ${service.colSpan} opacity-100 group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${service.details ? 'cursor-pointer' : 'cursor-default'}`}
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
                                            <span className="text-xs text-primary-400 font-semibold tracking-widest uppercase">{t('mainActivity')}</span>
                                        </div>
                                        <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-2">{service.title}</h3>
                                        <p className="text-slate-300 text-sm font-light leading-relaxed mb-4">{service.description}</p>

                                        {service.details && (
                                            <div className="flex items-center gap-1.5 text-primary-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span>{t('learnMore')}</span>
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        )}
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
                                    {service.details && (
                                        <div className="mt-4 flex items-center gap-1.5 text-primary-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span>{t('learnMore')}</span>
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>)
                            }
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setSelectedService(null)}
                    />

                    {/* Content */}
                    <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-300">
                        <div className="p-6 md:p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-500/20 flex items-center justify-center">
                                        <Icon name={selectedService.icon as any} size={24} className="text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl md:text-2xl font-semibold text-white">{selectedService.title}</h3>
                                        <span className="text-xs text-primary-400 font-semibold tracking-widest uppercase">{t('mainActivity')}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedService(null)}
                                    className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
                                {selectedService.description}
                            </p>

                            {selectedService.details && (
                                <ul className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {selectedService.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-3 group">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:scale-125 transition-transform shrink-0" />
                                            <span className="text-slate-300 text-sm md:text-base leading-relaxed">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="bg-white/[0.02] border-t border-white/5 p-6 flex justify-end">
                            <button
                                onClick={() => setSelectedService(null)}
                                className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-all"
                            >
                                {t('close')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>);

}