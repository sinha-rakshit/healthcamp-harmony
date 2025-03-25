
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
        
        <Features />
        
        {/* How it works section */}
        <section className="py-24 bg-white">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How Health Camp Harmony Works
              </h2>
              <p className="text-lg text-gray-600">
                Our platform streamlines every aspect of healthcare camp management, from planning to execution and analysis.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="rounded-xl p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 relative">
                <div className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-white text-primary font-bold shadow-sm">
                  1
                </div>
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Plan Your Camps</h3>
                <p className="text-gray-600 mb-4">
                  Create different types of health camps with comprehensive details, resources, and scheduling options.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Multi-type camp templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Resource management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Location mapping</span>
                  </li>
                </ul>
              </div>
              
              {/* Step 2 */}
              <div className="rounded-xl p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/10 relative">
                <div className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-white text-secondary font-bold shadow-sm">
                  2
                </div>
                <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Manage Patients</h3>
                <p className="text-gray-600 mb-4">
                  Streamline patient registration, assessments, and referrals with our intuitive digital forms.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Quick registration process</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Customizable assessment forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Integrated referral system</span>
                  </li>
                </ul>
              </div>
              
              {/* Step 3 */}
              <div className="rounded-xl p-6 bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/10 relative">
                <div className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-white text-accent font-bold shadow-sm">
                  3
                </div>
                <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">Analyze & Improve</h3>
                <p className="text-gray-600 mb-4">
                  Gain valuable insights through comprehensive analytics and reporting tools.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Real-time performance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Population health insights</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Resource optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Healthcare Camps?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of healthcare providers who are making a difference in their communities with Health Camp Harmony.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 w-full sm:w-auto">
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
