import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import AppointmentCTA from './components/AppointmentCTA';

export default function HomepagePage() {
    return (
        <main className="bg-navy-800 overflow-x-hidden">
            <Header />
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <TestimonialsSection />
            <AppointmentCTA />
            <Footer />
        </main>
    );
}