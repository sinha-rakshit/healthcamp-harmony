
import { useState, useEffect } from 'react';

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
            Mediversal{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Healthcare Camp
            </span>
          </h1>
          
          {/* <p
            className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-300 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Streamline your healthcare camps with our comprehensive tracking and management system. 
            Improve patient care, optimize resources, and make data-driven decisions.
          </p> */}
          
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
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
                src="/images/photo.svg"
                alt="Healthcare professionals in a medical camp"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
