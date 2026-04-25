import React from 'react';
import type { Metadata, Viewport } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '@/styles/tailwind.css';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export async function generateMetadata({
    params
}: {
    params: Promise<{locale: string}>
}) {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'Layout'});

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4029'),
        title: t('title'),
        description: t('description'),
        icons: {
            icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
        },
    };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
                                       children,
                                       params
                                   }: Readonly<{ children: React.ReactNode; params: Promise<{locale: string}> }>) {
    const {locale} = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
      notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fhealthcent3080back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
        </html>
    );
}