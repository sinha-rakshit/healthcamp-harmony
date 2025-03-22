
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-24 md:pt-20 md:pb-32">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10 z-0"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 transition-all duration-1000 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Simplifying Healthcare{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Camp Management
            </span>
          </h1>
          
          <p
            className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-300 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Streamline your healthcare camps with our comprehensive tracking and management system. 
            Improve patient care, optimize resources, and make data-driven decisions.
          </p>
          
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to="/dashboard">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/camp-management">
              <Button variant="outline" size="lg">
                Explore Camps
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Hero image/illustration */}
        <div
          className={`mt-16 relative max-w-5xl mx-auto transition-all duration-1000 delay-700 ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-50"></div>
            <div className="glass rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Healthcare professionals in a medical camp"
                className="w-full h-auto object-cover"
              />
              
              {/* Stats overlay */}
              <div className="absolute bottom-0 inset-x-0 glass py-4 px-6 flex flex-wrap justify-around gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-sm text-gray-600">Camps Organized</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">25,000+</p>
                  <p className="text-sm text-gray-600">Patients Served</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-sm text-gray-600">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
