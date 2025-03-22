
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Health Camp
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/dashboard') ? 'text-primary' : 'text-gray-600'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/camp-management"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/camp-management') ? 'text-primary' : 'text-gray-600'
              }`}
            >
              Camps
            </Link>
            <Link
              to="/patient-registration"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/patient-registration') ? 'text-primary' : 'text-gray-600'
              }`}
            >
              Patients
            </Link>
            <Button className="ml-4" size="sm">
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/')
                ? 'text-primary bg-primary/10'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/dashboard')
                ? 'text-primary bg-primary/10'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/camp-management"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/camp-management')
                ? 'text-primary bg-primary/10'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Camps
          </Link>
          <Link
            to="/patient-registration"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/patient-registration')
                ? 'text-primary bg-primary/10'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Patients
          </Link>
          <div className="pt-2">
            <Button className="w-full">Login</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
