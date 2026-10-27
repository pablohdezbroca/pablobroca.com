/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CosmicMission } from './components/CosmicMission';
import { Footer } from './components/Footer';
import { WhatsAppBeacon } from './components/WhatsAppBeacon';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#07070e] text-[#f1f5f9] selection:bg-[#7a2e37]/40 selection:text-white overflow-x-hidden">
      {/* 1. Deep Space Cosmic Background with Ringed Planet, Constellation & Starfield */}
      <CosmicBackground />

      {/* 2. Precision Technological Cursor for Desktop */}
      <CustomCursor />

      {/* 3. Navigation Bar */}
      <Navbar />

      {/* 4. One Page Main Streamlined Content */}
      <main className="relative z-10">
        {/* Section 1: Hero con Astronauta Protagónico y Contacto por WhatsApp */}
        <Hero />

        {/* Section 2: El Universo de Sistemas de Pablo Broca & KALTEK.TECH */}
        <CosmicMission />
      </main>

      {/* 5. Minimalist Footer */}
      <Footer />

      {/* 6. Direct WhatsApp Floating Beacon */}
      <WhatsAppBeacon />
    </div>
  );
}
