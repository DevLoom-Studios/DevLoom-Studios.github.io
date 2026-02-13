import React from 'react';
import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/index.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Devloom Studios | Technology Focused, Creatively Driven',
  description: 'Website revamps and digital transformation for B2B tech startups. Beautiful design that converts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@400;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-neutral-950 text-white selection:bg-lime-400 selection:text-black overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
