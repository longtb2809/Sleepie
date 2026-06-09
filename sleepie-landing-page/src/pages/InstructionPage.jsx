import React from 'react';
import Navbar from '../components/Navbar';
import Instruction from '../components/Instruction';
import Footer from '../components/Footer';

export default function InstructionPage() {
  return (
    <div className="font-sans text-text-dark bg-background scroll-smooth flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <Instruction />
      </main>
      <Footer />
    </div>
  );
}
