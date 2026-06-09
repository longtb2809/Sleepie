import React from 'react';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Footer from '../components/Footer';

export default function ProductsPage() {
  return (
    <div className="font-sans text-text-dark bg-background scroll-smooth flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <Product />
      </main>
      <Footer />
    </div>
  );
}
