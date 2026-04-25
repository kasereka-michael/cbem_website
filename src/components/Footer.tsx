import React from 'react';
import { useTranslations } from 'next-intl';
import AppLogo from '@/components/ui/AppLogo';
import { HeartIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaInstagram, FaXTwitter ,FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';

export default function Footer() {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Header');

    const socialLinks = [
        { icon: <FaFacebookF />, href: 'https://facebook.com/yourpage' },
        { icon: <FaInstagram />, href: 'https://instagram.com/yourpage' },
        { icon: <FaXTwitter />, href: 'https://x.com/yourpage' },
        { icon: <FaLinkedinIn />, href: 'https://linkedin.com/company/yourpage' },
        { icon: <FaWhatsapp />, href: 'https://wa.me/243991359198?src=qr' },
    ];
    return (
        <footer className="border-t border-white/5 py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                {/* Left: Logo + tagline */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <div className="flex items-center gap-2.5">
                        <AppLogo size={32} />
                        <span className="font-display text-base font-semibold text-white tracking-tight">
              CEBM
            </span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5">
                        {t('tagline1')}
                        <HeartIcon className="w-3.5 h-3.5 text-primary-500" />
                        {t('tagline2')}
                    </p>
                    <p className="text-slate-600 text-sm">{t('copyright', {year: new Date()?.getFullYear()})}</p>
                </div>

                {/* Right: Links */}
                <div>
                <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-8 gap-y-3">
                    <a href="#services" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">{tNav('services')}</a>
                    <a href="#about" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">{tNav('about')}</a>
                    <a href="#testimonials" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">{tNav('testimonials')}</a>
                    <a href="#contact" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">{tNav('contact')}</a>
                    <a href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">{t('privacy')}</a>
                    <a href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">{t('terms')}</a>
                </div>
                    <div className="flex justify-center">
                        <div className="flex gap-4 mt-6">
                            {socialLinks.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-primary-400 hover:text-white hover:bg-primary-500/20 transition-all duration-300"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}