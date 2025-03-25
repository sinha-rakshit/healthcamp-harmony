import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, BarChart3, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
};

export default Index;
