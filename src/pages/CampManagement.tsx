
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CampCard from '@/components/CampCard';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  FileText,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Mock data for camps
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
  {
    id: 'C004',
    name: 'Lincoln High School Health Day',
    type: 'School',
    date: 'Nov 2, 2023',
    time: '8:30 AM - 3:30 PM',
    location: 'Lincoln High School Gymnasium',
    address: '321 Education Blvd, Boston, MA 02101',
    coordinator: 'Dr. Robert Chen',
    status: 'Scheduled' as const,
    specialties: ['Pediatrics', 'Vision', 'Dental', 'Nutrition Education'],
    registeredPatients: 210,
    capacity: 350,
  },
  {
    id: 'C005',
    name: 'Rural Outreach Program',
    type: 'Rural',
    date: 'Nov 10, 2023',
    time: '9:00 AM - 5:00 PM',
    location: 'Greenfield Community Center',
    address: '567 Farm Rd, Greenfield, WI 53220',
    coordinator: 'Dr. Emily Rodriguez',
    status: 'Scheduled' as const,
    specialties: ['General Medicine', 'Women\'s Health', 'Pediatrics', 'Geriatrics'],
    registeredPatients: 68,
    capacity: 150,
  },
  {
    id: 'C006',
    name: 'Heart Health Screening',
    type: 'Specialized',
    date: 'Nov 15, 2023',
    time: '10:00 AM - 3:00 PM',
    location: 'Cardiac Care Center',
    address: '890 Health Ave, Dallas, TX 75201',
    coordinator: 'Dr. Michael Wong',
    status: 'Scheduled' as const,
    specialties: ['Cardiology', 'Cardiovascular Screening', 'Lifestyle Counseling'],
    registeredPatients: 55,
    capacity: 100,
  },
  {
    id: 'C007',
    name: 'Mobile Vaccine Clinic',
    type: 'Mobile',
    date: 'Oct 5, 2023',
    time: '8:00 AM - 6:00 PM',
    location: 'Various Locations',
    address: 'Multiple stops throughout Miami-Dade County',
    coordinator: 'Dr. Lisa Johnson',
    status: 'Completed' as const,
    specialties: ['Vaccinations', 'Immunizations', 'Preventive Care'],
    registeredPatients: 320,
    capacity: 400,
  },
  {
    id: 'C008',
    name: 'Women\'s Health Workshop',
    type: 'Specialized',
    date: 'Sep 28, 2023',
    time: '9:00 AM - 3:00 PM',
    location: 'Women\'s Health Center',
    address: '432 Wellness Blvd, Portland, OR 97201',
    coordinator: 'Dr. Rebecca Martinez',
    status: 'Completed' as const,
    specialties: ['Gynecology', 'Breast Health', 'Prenatal Care', 'Nutrition'],
    registeredPatients: 175,
    capacity: 200,
  },
];

const campTypes = [
  { value: 'morning', label: 'Morning' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'school', label: 'School' },
  { value: 'rural', label: 'Rural' },
  { value: 'specialized', label: 'Specialized' },
  { value: 'mobile', label: 'Mobile' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const CampManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCamps, setFilteredCamps] = useState(mockCamps);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, []);

  // Filter camps based on search query and selected filters
  useEffect(() => {
    let filtered = [...mockCamps];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (camp) =>
          camp.name.toLowerCase().includes(query) ||
          camp.location.toLowerCase().includes(query) ||
          camp.type.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected camp types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((camp) =>
        selectedTypes.some((type) => camp.type.toLowerCase() === type)
      );
    }
    
    // Filter by selected statuses
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((camp) =>
        selectedStatuses.some((status) => camp.status.toLowerCase() === status)
      );
    }
    
    setFilteredCamps(filtered);
  }, [searchQuery, selectedTypes, selectedStatuses]);

  const toggleTypeFilter = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const toggleStatusFilter = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">Camp Management</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Camp
            </Button>
          </div>

          {/* Camp Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-primary/10 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Camps</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-green-50 text-green-700 p-2 rounded-lg text-center">
                  <p className="font-medium">3</p>
                  <p>Active</p>
                </div>
                <div className="bg-blue-50 text-blue-700 p-2 rounded-lg text-center">
                  <p className="font-medium">5</p>
                  <p>Scheduled</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-secondary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Coverage Area</p>
                  <p className="text-2xl font-bold">7 Locations</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Spanning across 5 different regions, covering both urban and rural areas.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-accent/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Participants</p>
                  <p className="text-2xl font-bold">1,028</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Average of 85 participants per camp with 92% attendance rate.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4 bg-gray-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Scheduled This Month</p>
                  <p className="text-2xl font-bold">4 Camps</p>
                </div>
              </div>
              <div className="text-sm mt-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Schedule
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search for camps..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:w-auto w-full justify-between"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {(selectedTypes.length > 0 || selectedStatuses.length > 0) && (
                    <Badge className="ml-2 bg-primary h-5 w-5 p-0 flex items-center justify-center">
                      {selectedTypes.length + selectedStatuses.length}
                    </Badge>
                  )}
                </Button>
                <Button variant="ghost" onClick={clearFilters} className="md:w-auto w-full">
                  Clear
                </Button>
              </div>
            </div>
            
            {/* Filters Panel */}
            {showFilters && (
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Camp Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {campTypes.map((type) => (
                        <Badge
                          key={type.value}
                          variant={selectedTypes.includes(type.value) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleTypeFilter(type.value)}
                        >
                          {type.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-3">Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map((status) => (
                        <Badge
                          key={status.value}
                          variant={selectedStatuses.includes(status.value) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleStatusFilter(status.value)}
                        >
                          {status.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Camps Grid */}
          <div className="mb-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 h-64 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : filteredCamps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCamps.map((camp) => (
                  <CampCard key={camp.id} camp={camp} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">No camps found</h3>
                <p className="text-gray-500 mt-2 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">Upcoming Camp Timeline</h3>
              <div className="relative pl-8 border-l-2 border-gray-200">
                {mockCamps
                  .filter((camp) => camp.status === 'Scheduled' || camp.status === 'Active')
                  .slice(0, 4)
                  .map((camp, index) => (
                    <div key={camp.id} className="mb-6 relative">
                      <div className="absolute -left-[25px] h-5 w-5 rounded-full bg-white border-2 border-primary"></div>
                      <div className="flex items-start">
                        <div className="mr-3 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs min-w-[60px] text-center">
                          {camp.date.split(', ')[0]}
                        </div>
                        <div>
                          <h4 className="font-medium">{camp.name}</h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {camp.time}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {camp.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Tips</h3>
              <div className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <h4 className="font-medium text-primary mb-2">Camp Planning</h4>
                  <p className="text-sm text-gray-600">
                    Create a camp at least 3 weeks in advance to ensure proper resource
                    allocation and participant registration.
                  </p>
                </div>
                <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/10">
                  <h4 className="font-medium text-secondary mb-2">Staff Management</h4>
                  <p className="text-sm text-gray-600">
                    Assign specific roles to your staff members for more efficient camp
                    operations and better participant experience.
                  </p>
                </div>
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                  <h4 className="font-medium text-accent mb-2">Post-Camp Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Review camp analytics within 48 hours to identify areas of improvement
                    for future camps.
                  </p>
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

export default CampManagement;
