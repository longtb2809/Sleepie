import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Product from '../components/Product';
import About from '../components/About';

import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

function LandingPage() {
  return (
    <div className="font-sans text-text-dark bg-background scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Product />
        <About />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

export default LandingPage;
