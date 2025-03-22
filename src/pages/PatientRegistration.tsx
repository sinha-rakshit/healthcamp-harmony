
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PatientCard from '@/components/PatientCard';
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
  BarChart3,
  Clock,
  ChevronRight,
  CheckCircle,
  X,
  AlertCircle,
} from 'lucide-react';

// Mock data for patients
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
  {
    id: 'P004',
    name: 'Sarah Williams',
    age: 29,
    gender: 'Female',
    phone: '+1 (555) 234-5678',
    lastVisit: 'Oct 5, 2023',
    address: '321 Elm St, Chicago, IL 60601',
    medicalHistory: ['Migraines'],
    campVisits: 1,
    registrationDate: 'Mar 15, 2023',
  },
  {
    id: 'P005',
    name: 'Robert Garcia',
    age: 62,
    gender: 'Male',
    phone: '+1 (555) 876-5432',
    lastVisit: 'Sep 28, 2023',
    address: '654 Birch Dr, Houston, TX 77001',
    medicalHistory: ['Hypertension', 'COPD', 'Heart Disease'],
    campVisits: 6,
    registrationDate: 'Nov 10, 2022',
    hasAlert: true,
  },
  {
    id: 'P006',
    name: 'Jennifer Lee',
    age: 41,
    gender: 'Female',
    phone: '+1 (555) 345-6789',
    lastVisit: 'Oct 1, 2023',
    address: '987 Cedar Ln, Seattle, WA 98101',
    medicalHistory: ['Hypothyroidism'],
    campVisits: 2,
    registrationDate: 'Feb 5, 2023',
  },
  {
    id: 'P007',
    name: 'David Wilson',
    age: 38,
    gender: 'Male',
    phone: '+1 (555) 567-8901',
    lastVisit: 'Sep 20, 2023',
    address: '246 Spruce Ct, Miami, FL 33101',
    medicalHistory: ['Anxiety', 'Depression'],
    campVisits: 3,
    registrationDate: 'Jan 20, 2023',
  },
  {
    id: 'P008',
    name: 'Lisa Rodriguez',
    age: 50,
    gender: 'Female',
    phone: '+1 (555) 678-9012',
    lastVisit: 'Oct 3, 2023',
    address: '753 Redwood Ave, Los Angeles, CA 90001',
    medicalHistory: ['Breast Cancer Survivor', 'Osteoporosis'],
    campVisits: 5,
    registrationDate: 'Dec 15, 2022',
  },
  {
    id: 'P009',
    name: 'James Taylor',
    age: 27,
    gender: 'Male',
    phone: '+1 (555) 789-0123',
    lastVisit: 'Sep 15, 2023',
    address: '159 Willow Pl, Denver, CO 80201',
    medicalHistory: ['Seasonal Allergies'],
    campVisits: 1,
    registrationDate: 'Apr 10, 2023',
  },
];

const PatientRegistration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, []);

  // Filter patients based on search query, selected filters, and active tab
  useEffect(() => {
    let filtered = [...mockPatients];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query) ||
          patient.id.toLowerCase().includes(query) ||
          patient.phone.toLowerCase().includes(query)
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
      filtered = filtered.filter((patient) => patient.hasAlert);
    } else if (activeTab === 'recent') {
      // Assuming recent means visited in the last month (October in our mock data)
      filtered = filtered.filter((patient) => 
        patient.lastVisit.includes('Oct')
      );
    }
    
    setFilteredPatients(filtered);
  }, [searchQuery, selectedGenders, activeTab]);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">Patient Management</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Register New Patient
            </Button>
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
                  <p className="text-2xl font-bold">1,248</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-blue-50 text-blue-700 p-2 rounded-lg text-center">
                  <p className="font-medium">732</p>
                  <p>Male</p>
                </div>
                <div className="bg-pink-50 text-pink-700 p-2 rounded-lg text-center">
                  <p className="font-medium">516</p>
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
                  <p className="text-2xl font-bold">127</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Increase of 12% from last month</p>
                <div className="h-2 bg-gray-100 rounded-full mt-2">
                  <div className="h-2 bg-secondary rounded-full" style={{ width: '12%' }}></div>
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
                  <p className="text-2xl font-bold">856</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Average of 3.2 assessments per return patient</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-gray-100 p-3 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Require Follow-up</p>
                  <p className="text-2xl font-bold">46</p>
                </div>
              </div>
              <div className="text-sm mt-2">
                <Button variant="outline" size="sm" className="w-full text-red-500 border-red-200 hover:bg-red-50">
                  View Urgent Cases
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
              <Tabs defaultValue="all" onValueChange={handleTabChange}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <TabsList>
                    <TabsTrigger value="all">All Patients</TabsTrigger>
                    <TabsTrigger value="recent">Recent Visits</TabsTrigger>
                    <TabsTrigger value="alerts">
                      Alerts
                      <Badge className="ml-2 bg-red-500 h-5 w-5 p-0 flex items-center justify-center">
                        {mockPatients.filter((p) => p.hasAlert).length}
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
              </Tabs>
            </div>
            
            {/* Filters Panel */}
            {showFilters && (
              <div className="p-6 border-b border-gray-100 bg-gray-50">
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
          </div>

          {/* Patient List */}
          <TabsContent value="all" className="m-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 h-40 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : filteredPatients.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
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
