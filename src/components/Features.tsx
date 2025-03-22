
import { useState, useEffect, useRef } from 'react';
import { Calendar, User, FileText, CheckCircle, MapPin, Activity, Settings } from 'lucide-react';

const features = [
  {
    title: 'Camp Management',
    description: 'Create and manage different types of health camps with comprehensive tracking of resources and attendance.',
    icon: Calendar,
  },
  {
    title: 'Patient Registration',
    description: 'Streamline the intake process with digital forms, unique patient IDs, and quick access to medical history.',
    icon: User,
  },
  {
    title: 'Health Assessments',
    description: 'Customizable assessment forms for different camp types with automated risk calculation and flagging.',
    icon: FileText,
  },
  {
    title: 'Referrals & Follow-ups',
    description: 'Generate specialist referrals, schedule follow-up appointments, and track patient journeys across multiple camps.',
    icon: CheckCircle,
  },
  {
    title: 'Location Mapping',
    description: 'Map integration for geographic health data analysis and optimized camp placement strategy.',
    icon: MapPin,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Comprehensive reporting with insights on camp performance, population health trends, and resource utilization.',
    icon: Activity,
  },
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((current) => (current + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (featureSectionRef.current) {
      observer.observe(featureSectionRef.current);
    }

    return () => {
      if (featureSectionRef.current) {
        observer.unobserve(featureSectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={featureSectionRef}
      className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-50 z-0"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Powerful Features for Effective Camp Management
          </h2>
          <p className="text-lg text-gray-600">
            Our comprehensive platform provides all the tools you need to run successful healthcare camps and track meaningful outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Feature list */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${
                  activeFeature === index
                    ? 'bg-white shadow-lg rounded-xl p-6 scale-105 border border-primary/10'
                    : 'p-6 hover:bg-white hover:shadow-md rounded-xl cursor-pointer'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start">
                  <div
                    className={`rounded-full p-3 mr-4 ${
                      activeFeature === index
                        ? 'bg-primary/10 text-primary'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature showcase */}
          <div
            className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-70"></div>
            
            <div className="relative bg-white p-1 rounded-xl overflow-hidden">
              {/* Feature showcase header */}
              <div className="bg-gray-100 rounded-t-lg p-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 text-sm font-medium text-gray-600">
                  {features[activeFeature].title} Module
                </div>
              </div>
              
              {/* Feature illustration */}
              <div className="p-8 bg-white">
                {activeFeature === 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-3" />
                        <span className="font-medium">Morning Camp</span>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-3" />
                        <span className="font-medium">Corporate Camp</span>
                      </div>
                      <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">Scheduled</span>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-3" />
                        <span className="font-medium">School Health Camp</span>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Planning</span>
                    </div>
                  </div>
                )}
                
                {activeFeature === 1 && (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Patient Details</span>
                        <span className="text-primary text-sm">ID: #12345</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Name</p>
                          <p className="text-sm">John Smith</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Age</p>
                          <p className="text-sm">45</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Gender</p>
                          <p className="text-sm">Male</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm">+1 234-567-8901</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary text-white rounded py-2 text-sm">
                        Register
                      </button>
                      <button className="flex-1 border border-gray-300 rounded py-2 text-sm">
                        Scan QR
                      </button>
                    </div>
                  </div>
                )}
                
                {activeFeature === 2 && (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Health Assessment</span>
                        <span className="text-sm text-gray-500">Basic Screening</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Blood Pressure</span>
                          <span className="text-sm font-medium text-red-500">140/90 mmHg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Heart Rate</span>
                          <span className="text-sm font-medium">72 bpm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Blood Glucose</span>
                          <span className="text-sm font-medium text-amber-500">110 mg/dL</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">BMI</span>
                          <span className="text-sm font-medium">24.2</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-start">
                      <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-700">Attention Required</p>
                        <p className="text-xs text-red-600">High blood pressure detected. Refer to specialist.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeFeature === 3 && (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-3">
                        <span className="font-medium">Referral Information</span>
                        <span className="text-primary text-sm">Urgent</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500">Patient</p>
                          <p className="text-sm">Sarah Johnson (ID: #54321)</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Referring To</p>
                          <p className="text-sm">Dr. Michael Chen, Cardiology</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Reason</p>
                          <p className="text-sm">Irregular heartbeat and elevated BP</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary text-white rounded py-2 text-sm">
                        Generate Referral
                      </button>
                      <button className="flex-1 border border-gray-300 rounded py-2 text-sm">
                        Schedule Follow-up
                      </button>
                    </div>
                  </div>
                )}

                {activeFeature === 4 && (
                  <div className="space-y-4">
                    <div className="rounded-lg border overflow-hidden">
                      <div className="bg-blue-50 p-2 text-center text-sm font-medium text-blue-700">
                        Camp Location Map
                      </div>
                      <div className="h-44 bg-gray-200 relative">
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s+00bcd4(-74.006,40.7128)/auto/300x200?access_token=pk.demo')] bg-cover bg-center"></div>
                        <div className="absolute bottom-2 right-2 glass px-2 py-1 text-xs">
                          View Options
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border rounded p-3">
                        <p className="text-xs text-gray-500">Active Camps</p>
                        <p className="text-lg font-medium">5</p>
                      </div>
                      <div className="border rounded p-3">
                        <p className="text-xs text-gray-500">Coverage Area</p>
                        <p className="text-lg font-medium">125 km²</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature === 5 && (
                  <div className="space-y-4">
                    <div className="p-2 border rounded-lg">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600">Patients</p>
                          <p className="text-2xl font-medium text-green-600">1,248</p>
                          <p className="text-xs text-green-600">↑ 12% from last month</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600">Referrals</p>
                          <p className="text-2xl font-medium text-blue-600">342</p>
                          <p className="text-xs text-blue-600">↑ 8% from last month</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-sm font-medium mb-2">Conditions Detected</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="ml-2 text-xs">65%</span>
                        </div>
                        <p className="text-xs text-gray-500">Hypertension</p>
                        
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-secondary h-2.5 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                          <span className="ml-2 text-xs">40%</span>
                        </div>
                        <p className="text-xs text-gray-500">Diabetes</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
