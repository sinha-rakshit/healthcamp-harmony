
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Healthcare Camp
              </span>
            </div>
            {/* <p className="mt-4 text-sm text-gray-600 max-w-md">
              Streamlining healthcare camp management with innovative digital solutions 
              to better serve communities and improve public health outcomes.
            </p> */}
            <div className="flex mt-6 space-x-6">
              <a href="https://www.linkedin.com/company/mediversalgroup/" className="text-gray-500 hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
            <Link
                  to="https://www.mediversal.in/multi-super-speciality-hospital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Company
                </Link>
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="https://www.mediversal.in/multi-super-speciality-hospital/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.mediversal.in/multi-super-speciality-hospital/careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Mediversal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
