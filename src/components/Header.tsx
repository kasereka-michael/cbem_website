'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'À propos', href: '#about' },
    { label: 'Témoignages', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body?.classList?.add('mobile-menu-open');
        } else {
            document.body?.classList?.remove('mobile-menu-open');
        }
        return () => document.body?.classList?.remove('mobile-menu-open');
    }, [mobileOpen]);

    const handleLinkClick = () => setMobileOpen(false);

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                    scrolled ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2.5 shrink-0 group">
                        <AppLogo
                            size={38}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        />
                        <span className="font-display text-lg font-semibold text-white tracking-tight group-hover:text-primary-light transition-colors duration-300 hidden sm:block">
              CEBM
            </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        {navLinks?.map((link) => (
                            <a
                                key={link?.label}
                                href={link?.href}
                                className="underline-reveal hover:text-white transition-colors duration-300"
                            >
                                {link?.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <a
                        href="#contact"
                        className="hidden md:flex items-center gap-2 btn-shine bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary-900/30 shrink-0"
                    >
                        Prendre Rendez-vous
                    </a>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-slate-300 hover:text-white p-2 transition-colors"
                        aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    >
                        {mobileOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </nav>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-navy-900/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8"
                    onClick={handleLinkClick}
                >
                    <nav className="flex flex-col gap-2">
                        {navLinks?.map((link) => (
                            <a
                                key={link?.label}
                                href={link?.href}
                                onClick={handleLinkClick}
                                className="text-2xl font-display font-medium text-slate-200 hover:text-primary-light transition-colors duration-200 py-3 border-b border-white/5"
                            >
                                {link?.label}
                            </a>
                        ))}
                    </nav>
                    <a
                        href="#contact"
                        onClick={handleLinkClick}
                        className="mt-8 btn-shine bg-primary-600 text-white px-6 py-4 rounded-2xl text-base font-semibold text-center transition-all duration-300"
                    >
                        Prendre Rendez-vous
                    </a>
                </div>
            )}
        </>
    );
}