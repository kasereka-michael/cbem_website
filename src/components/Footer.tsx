import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function Footer() {
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
                        Prendre soin de votre santé
                        <HeartIcon className="w-3.5 h-3.5 text-primary-500" />
                        à chaque étape.
                    </p>
                    <p className="text-slate-600 text-sm">© {new Date()?.getFullYear()} Centre D'expertise Biomedicale Maombi. Tous droits réservés.</p>
                </div>

                {/* Right: Links */}
                <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-8 gap-y-3">
                    <a href="#services" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">Services</a>
                    <a href="#about" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">À propos</a>
                    <a href="#testimonials" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">Témoignages</a>
                    <a href="#contact" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">Contact</a>
                    <a href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">Confidentialité</a>
                    <a href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200">Conditions</a>
                </div>
            </div>
        </footer>
    );
}