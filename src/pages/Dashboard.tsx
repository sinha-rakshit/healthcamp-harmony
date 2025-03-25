import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsCard from '@/components/StatsCard';
import CampCard from '@/components/CampCard';
import PatientCard from '@/components/PatientCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { getPatients } from '@/services/patientService';
import { getCamps } from '@/services/campService';
import CampForm from '@/components/CampForm';
import { PatientRegistrationForm } from '@/components/PatientRegistrationForm';
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
  CheckCircle,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateCampOpen, setIsCreateCampOpen] = useState(false);
  const [isCreatePatientOpen, setIsCreatePatientOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  });

  const { data: camps = [] } = useQuery({
    queryKey: ['camps'],
    queryFn: getCamps,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleQuickAction = (action: string) => {
    console.log(`Quick action clicked: ${action}`);
    switch (action) {
      case 'newPatient':
        setIsCreatePatientOpen(true);
        break;
      case 'schedulecamp':
        setIsCreateCampOpen(true);
        break;
      case 'assessment':
        console.log('Assessment action clicked');
        break;
      case 'reports':
        console.log('Reports action clicked');
        break;
      default:
        break;
    }
  };

  const totalPatients = patients.length;
  const totalCamps = camps.length;
  const activeCamps = camps.filter(camp => camp.status === 'active').length;
  const completedCamps = camps.filter(camp => camp.status === 'completed').length;

  const recentCamps = [...camps].sort((a, b) => 
    new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  ).slice(0, 3);

  const recentPatients = [...patients].sort((a, b) => 
    new Date(b.registration_date || 0).getTime() - new Date(a.registration_date || 0).getTime()
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">Dashboard</h1>
            <div className="flex space-x-3">
              <Dialog open={isCreateCampOpen} onOpenChange={setIsCreateCampOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Camp
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Camp</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to create a new medical camp.
                    </DialogDescription>
                  </DialogHeader>
                  <CampForm onSuccess={() => setIsCreateCampOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Patients"
              value={totalPatients}
              icon={<User className="h-5 w-5 text-primary" />}
              description="Registered patients"
            />
            <StatsCard
              title="Total Camps"
              value={totalCamps}
              icon={<Calendar className="h-5 w-5 text-primary" />}
              description="All time"
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
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
                  ) : recentCamps.length > 0 ? (
                    <div className="space-y-6">
                      {recentCamps.map((camp) => (
                        <CampCard 
                          key={camp.id} 
                          camp={{
                            id: camp.id || '',
                            name: camp.name,
                            type: camp.status,
                            date: new Date(camp.start_date).toLocaleDateString('en-US', { 
                              month: 'short', day: 'numeric', year: 'numeric' 
                            }),
                            time: `${new Date(camp.start_date).toLocaleTimeString('en-US', { 
                              hour: 'numeric', minute: 'numeric', hour12: true 
                            })} - ${new Date(camp.end_date).toLocaleTimeString('en-US', { 
                              hour: 'numeric', minute: 'numeric', hour12: true 
                            })}`,
                            location: camp.location,
                            address: camp.location,
                            coordinator: camp.organizer || 'Unknown',
                            status: camp.status as any,
                            specialties: [],
                            registeredPatients: 0,
                            capacity: camp.capacity
                          }} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No camps found. Create your first camp!</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Camp Insights</h2>
                  </div>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
                  ) : (
                    <div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-4 text-sm text-gray-600">
                          Camp Distribution
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {[
                            { type: "Morning", count: camps.filter((camp) => camp.camp_type === "Morning").length, color: "primary" },
                            { type: "Corporate", count: camps.filter((camp) => camp.camp_type === "Corporate").length, color: "secondary" },
                            { type: "Apartment", count: camps.filter((camp) => camp.camp_type === "Apartment").length, color: "accent" },
                            { type: "Other", count: camps.filter((camp) => camp.camp_type === "Others").length, color: "gray-700" },
                          ].map((camp, index) => (
                            <div key={index} className={`text-center p-3 bg-${camp.color}/5 rounded-lg`}>
                              <div className={`text-2xl font-bold text-${camp.color}`}>
                                {camp.count}
                              </div>
                              <div className="text-xs text-gray-600">{camp.type}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold">Quick Actions</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-24 flex flex-col items-center justify-center"
                      onClick={() => handleQuickAction('newPatient')}
                    >
                      <User className="h-6 w-6 mb-2" />
                      <span>New Patient</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-24 flex flex-col items-center justify-center"
                      onClick={() => handleQuickAction('schedulecamp')}
                    >
                      <Calendar className="h-6 w-6 mb-2" />
                      <span>Schedule Camp</span>
                    </Button>
                  </div>
                </div>
              </div>

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
                  ) : recentPatients.length > 0 ? (
                    <div className="space-y-4">
                      {recentPatients.map((patient) => (
                        <PatientCard 
                          key={patient.id} 
                          patient={{
                            id: patient.id || '',
                            name: patient.name,
                            age: patient.age,
                            gender: patient.gender,
                            phone: patient.phone || 'N/A',
                            lastVisit: 'N/A',
                            address: patient.address || 'N/A',
                            medicalHistory: patient.medical_history || [],
                            campVisits: 0,
                            registrationDate: patient.registration_date,
                            hasAlert: patient.has_alert
                          }} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No patients found. Register your first patient!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={isCreatePatientOpen} onOpenChange={setIsCreatePatientOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Register New Patient</DialogTitle>
            <DialogDescription>
              Fill out the form below to register a new patient.
            </DialogDescription>
          </DialogHeader>
          <PatientRegistrationForm onSuccess={() => setIsCreatePatientOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
