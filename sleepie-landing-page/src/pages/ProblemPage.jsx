import React from 'react';
import Navbar from '../components/Navbar';
import Problem from '../components/Problem';
import Footer from '../components/Footer';

export default function ProblemPage() {
  return (
    <div className="font-sans text-text-dark bg-background scroll-smooth flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <Problem />
      </main>
      <Footer />
    </div>
  );
}
