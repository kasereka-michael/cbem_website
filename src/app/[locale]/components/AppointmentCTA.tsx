'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { CalendarDaysIcon, PhoneIcon, MapPinIcon, ClockIcon ,EnvelopeIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function AppointmentCTA() {
    const t = useTranslations('AppointmentCTA');
    const [submitted, setSubmitted] = useState(false);
    
    const contactInfo = [
        { icon: PhoneIcon, label: t('callUs'), value: '+243 834 826 955, +234 991 359 198' },
        { icon: EnvelopeIcon, label: t('emailAddress'), value: 'assistance@cebm-drc.com' },
        { icon: MapPinIcon, label: t('findUs'), value: 'Av. Bukama Nord, Q. Kyeshero, C. Goma, Nord-Kivu, RDC.' },
        { icon: ClockIcon, label: t('hours'), value: 'Dim-Ven : 8h – 20h, Sam 17h-20h' },
    ];
    const [form, setForm] = useState({ name: '', phone: '', service: '', date: '' });
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && contentRef.current) {
                        contentRef.current.classList.add('animate-fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        if (contentRef.current) observer.observe(contentRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // UI-only mock submit
        setSubmitted(true);
    };

    return (
        <section id="contact" ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
            {/* Dark band background */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #0A1220 0%, #0B1E30 50%, #081828 100%)' }}
            />
            {/* Teal glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(13,148,136,0.12) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            <div className="absolute inset-0 border-t border-b border-white/5" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div ref={contentRef} className="opacity-100">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                        {/* Left: Headline + contact info */}
                        <div className="w-full lg:w-5/12 flex flex-col justify-between gap-10">
                            <div>
                <span className="text-primary-500 text-xs font-semibold tracking-widest uppercase block mb-4">
                  {t('contactUs')}
                </span>
                                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-5">
                                    {t('headline')}
                                    <br />
                                    <span className="text-primary-400">{t('subheadline')}</span>
                                </h2>
                                <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base">
                                    {t('description')}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {contactInfo.map((item) => (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center shrink-0">
                                            <item.icon className="w-5 h-5 text-primary-400" />
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs uppercase tracking-wide">{item.label}</p>
                                            <p className="text-white text-sm font-medium mt-0.5">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="w-full lg:w-7/12">
                            <div className="glass-card rounded-3xl p-6 md:p-8">
                                {submitted ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                                        <CheckCircleIcon className="w-14 h-14 text-primary-500" />
                                        <h3 className="font-display text-2xl font-semibold text-white">{t('submittedTitle')}</h3>
                                        <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                                            {t('submittedDesc')}
                                        </p>
                                        <button
                                            onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', service: '', date: '' }); }}
                                            className="mt-4 text-primary-400 text-sm font-semibold hover:text-primary-300 transition-colors"
                                        >
                                            {t('anotherAppointment')}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="font-display text-xl font-semibold text-white mb-6">{t('requestAppointment')}</h3>
                                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-slate-400 text-xs font-medium uppercase tracking-wide">{t('fullName')}</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={form.name}
                                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                        placeholder="Serge katunga Luc"
                                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-primary-500/60 focus:bg-white/[0.07] transition-all duration-200"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-slate-400 text-xs font-medium uppercase tracking-wide">{t('phone')}</label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={form.phone}
                                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                        placeholder="+243 829 267 467"
                                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-primary-500/60 focus:bg-white/[0.07] transition-all duration-200"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-slate-400 text-xs font-medium uppercase tracking-wide">{t('service')}</label>
                                                <select
                                                    required
                                                    value={form.service}
                                                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/60 focus:bg-white/[0.07] transition-all duration-200 appearance-none"
                                                >
                                                    <option value="" disabled className="bg-navy-800">{t('selectService')}</option>
                                                    <option value="consultation" className="bg-navy-800">{t('services.consultation')}</option>
                                                    <option value="metrologie" className="bg-navy-800">{t('services.metrologie')}</option>
                                                    <option value="consultance" className="bg-navy-800">{t('services.consultance')}</option>
                                                    <option value="recherche" className="bg-navy-800">{t('services.recherche')}</option>
                                                </select>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-slate-400 text-xs font-medium uppercase tracking-wide">{t('date')}</label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={form.date}
                                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500/60 focus:bg-white/[0.07] transition-all duration-200 [color-scheme:dark]"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn-shine mt-2 bg-primary-600 hover:bg-primary-500 text-white py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary-900/30 flex items-center justify-center gap-2"
                                            >
                                                <CalendarDaysIcon className="w-4 h-4" />
                                                {t('confirmButton')}
                                            </button>
                                            <p className="text-slate-600 text-xs text-center">
                                                {t('noPayment')}
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}