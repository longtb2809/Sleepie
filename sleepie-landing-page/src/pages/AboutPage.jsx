import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="font-sans text-text-dark bg-background scroll-smooth flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <About />
      </main>
      <Footer />
    </div>
  );
}
