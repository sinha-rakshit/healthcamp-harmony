
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsCard from '@/components/StatsCard';
import CampCard from '@/components/CampCard';
import PatientCard from '@/components/PatientCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  User,
  FileText,
  Activity,
  MapPin,
  Plus,
  ChevronRight,
  Search,
  BarChart3,
  CheckCircle
} from 'lucide-react';

// Mock data for dashboard
const mockCamps = [
  {
    id: 'C001',
    name: 'Morning Wellness Camp',
    type: 'Morning',
    date: 'Oct 15, 2023',
    time: '8:00 AM - 12:00 PM',
    location: 'Central Community Center',
    address: '123 Main St, New York, NY 10001',
    coordinator: 'Dr. Jane Smith',
    status: 'Active' as const,
    specialties: ['General Medicine', 'Cardiology', 'Nutrition'],
    registeredPatients: 45,
    capacity: 100,
  },
  {
    id: 'C002',
    name: 'Tech Corp Health Drive',
    type: 'Corporate',
    date: 'Oct 20, 2023',
    time: '10:00 AM - 4:00 PM',
    location: 'Tech Corp HQ',
    address: '456 Business Ave, San Francisco, CA 94107',
    coordinator: 'Dr. Mark Johnson',
    status: 'Scheduled' as const,
    specialties: ['Preventive Care', 'Mental Health', 'Vision'],
    registeredPatients: 120,
    capacity: 200,
  },
  {
    id: 'C003',
    name: 'Riverside Apartments Health Check',
    type: 'Apartment',
    date: 'Oct 25, 2023',
    time: '9:00 AM - 2:00 PM',
    location: 'Riverside Community Hall',
    address: '789 River Rd, Chicago, IL 60601',
    coordinator: 'Dr. Sarah Lee',
    status: 'Scheduled' as const,
    specialties: ['Diabetes Screening', 'Blood Pressure', 'General Health'],
    registeredPatients: 35,
    capacity: 75,
  },
];

const mockPatients = [
  {
    id: 'P001',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    phone: '+1 (555) 123-4567',
    lastVisit: 'Oct 10, 2023',
    address: '123 Oak St, New York, NY 10001',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    campVisits: 3,
    registrationDate: 'Jan 15, 2023',
    hasAlert: true,
  },
  {
    id: 'P002',
    name: 'Emily Johnson',
    age: 34,
    gender: 'Female',
    phone: '+1 (555) 987-6543',
    lastVisit: 'Oct 12, 2023',
    address: '456 Maple Ave, San Francisco, CA 94107',
    medicalHistory: ['Asthma', 'Allergies'],
    campVisits: 2,
    registrationDate: 'Feb 20, 2023',
  },
  {
    id: 'P003',
    name: 'Michael Chen',
    age: 56,
    gender: 'Male',
    phone: '+1 (555) 456-7890',
    lastVisit: 'Oct 8, 2023',
    address: '789 Pine Rd, Boston, MA 02108',
    medicalHistory: ['High Cholesterol', 'Arthritis'],
    campVisits: 4,
    registrationDate: 'Dec 5, 2022',
  },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, []);

  // Demo data for the charts and stats
  const totalPatients = 1248;
  const totalCamps = 12;
  const activeCamps = 3;
  const completedCamps = 9;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">Dashboard</h1>
            <div className="flex space-x-3">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Camp
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Patients"
              value={totalPatients}
              icon={<User className="h-5 w-5 text-primary" />}
              change={{ value: 12, isPositive: true }}
              description="Last 30 days"
            />
            <StatsCard
              title="Total Camps"
              value={totalCamps}
              icon={<Calendar className="h-5 w-5 text-primary" />}
              change={{ value: 8, isPositive: true }}
              description="Last 30 days"
            />
            <StatsCard
              title="Active Camps"
              value={activeCamps}
              icon={<Activity className="h-5 w-5 text-primary" />}
              description="Currently running"
            />
            <StatsCard
              title="Completed Camps"
              value={completedCamps}
              icon={<CheckCircle className="h-5 w-5 text-primary" />}
              description="Successfully executed"
            />
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Camps */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Recent Camps</h2>
                    <Link to="/camp-management">
                      <Button variant="ghost" size="sm" className="font-medium text-primary">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-48 bg-gray-100 rounded-lg animate-pulse"
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {mockCamps.map((camp) => (
                        <CampCard key={camp.id} camp={camp} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Health Insights */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Health Insights</h2>
                    <Button variant="ghost" size="sm" className="font-medium text-primary">
                      Full Report
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-4 text-sm text-gray-600">
                            Top Detected Conditions
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Hypertension</span>
                                <span className="font-medium">38%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: '38%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Diabetes</span>
                                <span className="font-medium">24%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: '24%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Obesity</span>
                                <span className="font-medium">19%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary rounded-full h-2" style={{ width: '19%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-4 text-sm text-gray-600">
                            Camp Effectiveness
                          </h3>
                          <div className="h-32 flex items-center justify-center">
                            <div className="relative w-32 h-32">
                              <svg viewBox="0 0 36 36" className="w-full h-full">
                                <path
                                  d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#eee"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="hsl(175, 84%, 32%)"
                                  strokeWidth="2"
                                  strokeDasharray="85, 100"
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">85%</span>
                                <span className="text-xs text-gray-500">Success Rate</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-4 text-sm text-gray-600">
                          Camp Distribution
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-primary/5 rounded-lg">
                            <div className="text-2xl font-bold text-primary">5</div>
                            <div className="text-xs text-gray-600">Morning</div>
                          </div>
                          <div className="text-center p-3 bg-secondary/5 rounded-lg">
                            <div className="text-2xl font-bold text-secondary">3</div>
                            <div className="text-xs text-gray-600">Corporate</div>
                          </div>
                          <div className="text-center p-3 bg-accent/5 rounded-lg">
                            <div className="text-2xl font-bold text-accent">2</div>
                            <div className="text-xs text-gray-600">Apartment</div>
                          </div>
                          <div className="text-center p-3 bg-gray-100 rounded-lg">
                            <div className="text-2xl font-bold text-gray-700">2</div>
                            <div className="text-xs text-gray-600">Other</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold">Quick Actions</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                      <User className="h-6 w-6 mb-2" />
                      <span>New Patient</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                      <Calendar className="h-6 w-6 mb-2" />
                      <span>Schedule Camp</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                      <FileText className="h-6 w-6 mb-2" />
                      <span>Assessment</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      <span>Reports</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Recent Patients */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Recent Patients</h2>
                    <Link to="/patient-registration">
                      <Button variant="ghost" size="sm" className="font-medium text-primary">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-24 bg-gray-100 rounded-lg animate-pulse"
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mockPatients.map((patient) => (
                        <PatientCard key={patient.id} patient={patient} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold">Upcoming Events</h2>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-16 bg-gray-100 rounded-lg animate-pulse"
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start border-l-4 border-primary pl-4 py-1">
                        <div className="mr-4 bg-primary/10 text-primary px-3 py-2 rounded-md text-center">
                          <div className="text-sm font-bold">15</div>
                          <div className="text-xs">OCT</div>
                        </div>
                        <div>
                          <h3 className="font-medium">Morning Wellness Camp</h3>
                          <p className="text-sm text-gray-600">8:00 AM - 12:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-start border-l-4 border-secondary pl-4 py-1">
                        <div className="mr-4 bg-secondary/10 text-secondary px-3 py-2 rounded-md text-center">
                          <div className="text-sm font-bold">20</div>
                          <div className="text-xs">OCT</div>
                        </div>
                        <div>
                          <h3 className="font-medium">Tech Corp Health Drive</h3>
                          <p className="text-sm text-gray-600">10:00 AM - 4:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-start border-l-4 border-accent pl-4 py-1">
                        <div className="mr-4 bg-accent/10 text-accent px-3 py-2 rounded-md text-center">
                          <div className="text-sm font-bold">25</div>
                          <div className="text-xs">OCT</div>
                        </div>
                        <div>
                          <h3 className="font-medium">Riverside Apartments Health Check</h3>
                          <p className="text-sm text-gray-600">9:00 AM - 2:00 PM</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
