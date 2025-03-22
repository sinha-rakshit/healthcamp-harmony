import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PatientCard from '@/components/PatientCard';
import { PatientRegistrationForm } from '@/components/PatientRegistrationForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Filter,
  User,
  FileText,
  Calendar,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { getPatients, Patient } from '@/services/patientService';

const PatientRegistration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const data = await getPatients();
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Filter patients based on search query, selected filters, and active tab
  useEffect(() => {
    let filtered = [...patients];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query) ||
          patient.patient_id.toLowerCase().includes(query) ||
          (patient.phone && patient.phone.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected genders
    if (selectedGenders.length > 0) {
      filtered = filtered.filter((patient) =>
        selectedGenders.includes(patient.gender)
      );
    }
    
    // Filter by active tab
    if (activeTab === 'alerts') {
      filtered = filtered.filter((patient) => patient.has_alert);
    }
    
    setFilteredPatients(filtered);
  }, [searchQuery, selectedGenders, activeTab, patients]);

  const toggleGenderFilter = (gender: string) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter((g) => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  const clearFilters = () => {
    setSelectedGenders([]);
    setSearchQuery('');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleRegistrationSuccess = () => {
    setIsDialogOpen(false);
    fetchPatients();
  };

  // Calculate statistics
  const totalPatients = patients.length;
  const malePatients = patients.filter(p => p.gender === 'Male').length;
  const femalePatients = patients.filter(p => p.gender === 'Female').length;
  const alertPatients = patients.filter(p => p.has_alert).length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">Patient Management</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Register New Patient
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Register New Patient</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to register a new patient to the system.
                  </DialogDescription>
                </DialogHeader>
                <PatientRegistrationForm onSuccess={handleRegistrationSuccess} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Patient Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-primary/10 p-3 rounded-lg">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Patients</p>
                  <p className="text-2xl font-bold">{totalPatients}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-blue-50 text-blue-700 p-2 rounded-lg text-center">
                  <p className="font-medium">{malePatients}</p>
                  <p>Male</p>
                </div>
                <div className="bg-pink-50 text-pink-700 p-2 rounded-lg text-center">
                  <p className="font-medium">{femalePatients}</p>
                  <p>Female</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-secondary/10 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">New Registrations</p>
                  <p className="text-2xl font-bold">
                    {patients.length > 0 ? patients.length : 0}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>All patients in the system</p>
                <div className="h-2 bg-gray-100 rounded-full mt-2">
                  <div className="h-2 bg-secondary rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-accent/10 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assessments</p>
                  <p className="text-2xl font-bold">-</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Connect assessments to view stats</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-gray-100 p-3 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Require Follow-up</p>
                  <p className="text-2xl font-bold">{alertPatients}</p>
                </div>
              </div>
              <div className="text-sm mt-2">
                <Button variant="outline" size="sm" className="w-full text-red-500 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    setActiveTab('alerts');
                  }}>
                  View Urgent Cases
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
              <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <TabsList>
                    <TabsTrigger value="all">All Patients</TabsTrigger>
                    <TabsTrigger value="alerts">
                      Alerts
                      <Badge className="ml-2 bg-red-500 h-5 w-5 p-0 flex items-center justify-center">
                        {alertPatients}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search patients..."
                        className="pl-10 min-w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="whitespace-nowrap"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                      {selectedGenders.length > 0 && (
                        <Badge className="ml-2 bg-primary h-5 w-5 p-0 flex items-center justify-center">
                          {selectedGenders.length}
                        </Badge>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Filters Panel */}
                {showFilters && (
                  <div className="p-6 border-b border-gray-100 bg-gray-50 mt-4">
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Gender</h3>
                        <div className="flex gap-2">
                          <Badge
                            variant={selectedGenders.includes('Male') ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => toggleGenderFilter('Male')}
                          >
                            Male
                          </Badge>
                          <Badge
                            variant={selectedGenders.includes('Female') ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => toggleGenderFilter('Female')}
                          >
                            Female
                          </Badge>
                          <Badge
                            variant={selectedGenders.includes('Other') ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => toggleGenderFilter('Other')}
                          >
                            Other
                          </Badge>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <Button variant="ghost" onClick={clearFilters} size="sm">
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Patient List */}
                <TabsContent value="all">
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gray-100 h-40 rounded-xl animate-pulse"
                        ></div>
                      ))}
                    </div>
                  ) : filteredPatients.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                      {filteredPatients.map((patient) => (
                        <PatientCard key={patient.id} patient={{
                          id: patient.patient_id,
                          name: patient.name,
                          age: patient.age,
                          gender: patient.gender,
                          phone: patient.phone || '',
                          lastVisit: 'Not visited yet',
                          address: patient.address || '',
                          medicalHistory: patient.medical_history || [],
                          campVisits: 0,
                          registrationDate: patient.registration_date || new Date().toLocaleDateString(),
                          hasAlert: patient.has_alert
                        }} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-white rounded-xl">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium">No patients found</h3>
                      <p className="text-gray-500 mt-2 mb-6">
                        Try adjusting your search or filter criteria
                      </p>
                      <Button onClick={clearFilters}>Clear Filters</Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="alerts">
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gray-100 h-40 rounded-xl animate-pulse"
                        ></div>
                      ))}
                    </div>
                  ) : filteredPatients.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                      {filteredPatients.map((patient) => (
                        <PatientCard key={patient.id} patient={{
                          id: patient.patient_id,
                          name: patient.name,
                          age: patient.age,
                          gender: patient.gender,
                          phone: patient.phone || '',
                          lastVisit: 'Not visited yet',
                          address: patient.address || '',
                          medicalHistory: patient.medical_history || [],
                          campVisits: 0,
                          registrationDate: patient.registration_date || new Date().toLocaleDateString(),
                          hasAlert: patient.has_alert
                        }} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-white rounded-xl">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium">No alert patients found</h3>
                      <p className="text-gray-500 mt-2 mb-6">
                        There are currently no patients marked as urgent
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Patient Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>0-18 years</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 rounded-full h-2" style={{ width: '12%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>19-35 years</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 rounded-full h-2" style={{ width: '28%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>36-50 years</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 rounded-full h-2" style={{ width: '32%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>51-65 years</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 rounded-full h-2" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>65+ years</span>
                    <span className="font-medium">8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 rounded-full h-2" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">Common Conditions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="flex items-center">
                    <span className="h-3 w-3 bg-primary rounded-full mr-2"></span>
                    <span className="text-sm">Hypertension</span>
                  </span>
                  <span className="font-medium text-sm">32%</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="flex items-center">
                    <span className="h-3 w-3 bg-secondary rounded-full mr-2"></span>
                    <span className="text-sm">Diabetes</span>
                  </span>
                  <span className="font-medium text-sm">24%</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="flex items-center">
                    <span className="h-3 w-3 bg-accent rounded-full mr-2"></span>
                    <span className="text-sm">Respiratory Issues</span>
                  </span>
                  <span className="font-medium text-sm">18%</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="flex items-center">
                    <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm">Obesity</span>
                  </span>
                  <span className="font-medium text-sm">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="h-3 w-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-sm">Cardiovascular</span>
                  </span>
                  <span className="font-medium text-sm">11%</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">Registration Trends</h3>
              <div className="h-48 relative mb-4">
                {/* Simple chart representation */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end h-40">
                  <div className="flex-1 mx-1">
                    <div className="bg-primary h-[30%] rounded-t-sm"></div>
                    <div className="text-xs text-center mt-1">Jun</div>
                  </div>
                  <div className="flex-1 mx-1">
                    <div className="bg-primary h-[40%] rounded-t-sm"></div>
                    <div className="text-xs text-center mt-1">Jul</div>
                  </div>
                  <div className="flex-1 mx-1">
                    <div className="bg-primary h-[35%] rounded-t-sm"></div>
                    <div className="text-xs text-center mt-1">Aug</div>
                  </div>
                  <div className="flex-1 mx-1">
                    <div className="bg-primary h-[60%] rounded-t-sm"></div>
                    <div className="text-xs text-center mt-1">Sep</div>
                  </div>
                  <div className="flex-1 mx-1">
                    <div className="bg-primary h-[85%] rounded-t-sm"></div>
                    <div className="text-xs text-center mt-1">Oct</div>
                  </div>
                  <div className="flex-1 mx-1">
                    <div className="bg-primary/30 h-[50%] rounded-t-sm"></div>
                    <div className="text-xs text-center mt-1">Nov</div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-500">
                <p>127 new registrations in the last 30 days</p>
                <p className="text-green-600 font-medium mt-1">
                  <span className="inline-block mr-1">↑</span> 12% increase from previous month
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PatientRegistration;
