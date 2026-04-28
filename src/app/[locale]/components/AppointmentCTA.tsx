'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
    CalendarDaysIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import emailjs from '@emailjs/browser';

export default function AppointmentCTA() {
    const t = useTranslations('AppointmentCTA');

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: '',
        phone: '',
        service: '',
        date: ''
    });

    const contactInfo = [
        { icon: PhoneIcon, label: t('callUs'), value: '+243 834 826 955, +243 991 359 198' },
        { icon: EnvelopeIcon, label: t('emailAddress'), value: 'assistance@cebm-drc.com' },
        { icon: MapPinIcon, label: t('findUs'), value: 'Av. Bukama Nord, Q. Kyeshero, C. Goma, Nord-Kivu, RDC.' },
        { icon: ClockIcon, label: t('hours'), value: 'Dim-Ven : 8h – 20h, Sam 17h-20h' }
    ];

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

    const optionKeys = (path: string) => {
        const messages = t.raw(`services.${path}.options`) as Record<string, string>;
        return Object.keys(messages || {});
    };

    const getServiceData = (value: string) => {
        if (!value) {
            return {
                category: 'Non spécifié',
                option: ''
            };
        }

        if (value === 'recherche') {
            return {
                category: t('services.recherche'),
                option: ''
            };
        }

        const parts = value.split('_');

        const categoryKey = parts[0];
        const optionKey = parts.slice(1).join('_'); // safer for multi-word keys

        const category = t(`services.${categoryKey}.label`);

        let option = '';

        try {
            option = optionKey
                ? t(`services.${categoryKey}.options.${optionKey}`)
                : '';
        } catch (e) {
            option = '';
        }

        return {
            category,
            option
        };
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const serviceData = getServiceData(form.service);

        const templateParams = {
            title: `Demande de Rendez-vous`,

            from_name: form.name || 'Non renseigné',
            from_phone: form.phone || 'Non renseigné',

            service_category: serviceData.category || 'Non spécifié',

            // 👇 IMPORTANT: force empty string instead of undefined/null
            service_option: serviceData.option ? serviceData.option : '',

            preferred_date: form.date
                ? new Date(form.date).toLocaleString()
                : 'Non spécifiée',

            to_email: 'assistance@cebm-drc.com'
        };

        try {
            await emailjs.send(
                'service_oe6avar',
                'template_w9awnem',
                templateParams,
                'qI7fx4N2jJZTPNn3L'
            );

            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, #0A1220 0%, #0B1E30 50%, #081828 100%)'
            }} />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
                 style={{
                     background: 'radial-gradient(ellipse, rgba(13,148,136,0.12) 0%, transparent 70%)',
                     filter: 'blur(60px)'
                 }}
            />

            <div className="absolute inset-0 border-t border-b border-white/5" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                <div ref={contentRef}>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                        {/* LEFT SIDE */}
                        <div className="w-full lg:w-5/12 flex flex-col gap-10">

                            <div>
                                <span className="text-primary-500 text-xs font-semibold uppercase tracking-widest mb-4 block">
                                    {t('contactUs')}
                                </span>

                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
                                    {t('headline')}
                                    <br />
                                    <span className="text-primary-400">{t('subheadline')}</span>
                                </h2>

                                <p className="text-slate-400 mt-4 text-sm md:text-base">
                                    {t('description')}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {contactInfo.map((item) => (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-primary-400" />
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs uppercase">{item.label}</p>
                                            <p className="text-white text-sm">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* RIGHT FORM */}
                        <div className="w-full lg:w-7/12">

                            <div className="glass-card rounded-3xl p-6 md:p-8">

                                {submitted ? (
                                    <div className="text-center py-12 flex flex-col items-center gap-4">
                                        <CheckCircleIcon className="w-14 h-14 text-primary-500" />
                                        <h3 className="text-2xl font-semibold text-white">
                                            {t('submittedTitle')}
                                        </h3>
                                        <p className="text-slate-400 text-sm">
                                            {t('submittedDesc')}
                                        </p>

                                        <button
                                            onClick={() => {
                                                setSubmitted(false);
                                                setForm({ name: '', phone: '', service: '', date: '' });
                                            }}
                                            className="text-primary-400 text-sm font-semibold"
                                        >
                                            {t('anotherAppointment')}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-xl font-semibold text-white mb-6">
                                            {t('requestAppointment')}
                                        </h3>

                                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                                            {/* NAME + PHONE SAME ROW */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                <input
                                                    type="text"
                                                    required
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                    placeholder={t('fullName')}
                                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                                                />

                                                <input
                                                    type="tel"
                                                    required
                                                    value={form.phone}
                                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                    placeholder={t('phone')}
                                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                                                />

                                            </div>

                                            {/* SERVICE */}
                                            <select
                                                required
                                                value={form.service}
                                                onChange={(e) => setForm({ ...form, service: e.target.value })}
                                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                                            >
                                                <option value="">{t('selectService')}</option>
                                                <option value="consultation">Consultation</option>
                                                <option value="metrologie">Métrologie</option>
                                                <option value="consultance">Consultance</option>
                                                <option value="recherche">Recherche</option>
                                            </select>

                                            {/* DATE */}
                                            <input
                                                type="datetime-local"
                                                required
                                                value={form.date}
                                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                                            />

                                            {error && (
                                                <p className="text-red-400 text-sm">{error}</p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="bg-primary-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                                            >
                                                <CalendarDaysIcon className="w-4 h-4" />
                                                {loading ? 'Envoi...' : t('confirmButton')}
                                            </button>

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