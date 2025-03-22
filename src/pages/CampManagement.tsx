import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CampCard from '@/components/CampCard';
import CampForm from '@/components/CampForm';
import { getCamps } from '@/services/campService';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const campTypes = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const CampManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCamps, setFilteredCamps] = useState<any[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isCreateCampOpen, setIsCreateCampOpen] = useState(false);

  const { data: camps = [], isLoading: isCampsLoading, refetch } = useQuery({
    queryKey: ['camps'],
    queryFn: getCamps,
  });

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
    let filtered = [...camps];
    
    // Convert camps to the format expected by the CampCard component
    filtered = filtered.map(camp => ({
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
    }));
    
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
  }, [searchQuery, selectedTypes, selectedStatuses, camps]);

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

  const handleCampSuccess = () => {
    setIsCreateCampOpen(false);
    refetch();
  };

  // Calculate stats
  const totalCamps = camps.length;
  const activeCamps = camps.filter(camp => camp.status === 'active').length;
  const scheduledCamps = camps.filter(camp => camp.status === 'upcoming').length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">Camp Management</h1>
            <Dialog open={isCreateCampOpen} onOpenChange={setIsCreateCampOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Camp
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Camp</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to create a new medical camp.
                  </DialogDescription>
                </DialogHeader>
                <CampForm onSuccess={handleCampSuccess} />
              </DialogContent>
            </Dialog>
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
                  <p className="text-2xl font-bold">{totalCamps}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-green-50 text-green-700 p-2 rounded-lg text-center">
                  <p className="font-medium">{activeCamps}</p>
                  <p>Active</p>
                </div>
                <div className="bg-blue-50 text-blue-700 p-2 rounded-lg text-center">
                  <p className="font-medium">{scheduledCamps}</p>
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
                      {campTypes.map((status) => (
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
            {isLoading || isCampsLoading ? (
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
                {camps
                  .filter((camp) => camp.status === 'upcoming' || camp.status === 'active')
                  .slice(0, 4)
                  .map((camp, index) => (
                    <div key={camp.id} className="mb-6 relative">
                      <div className="absolute -left-[25px] h-5 w-5 rounded-full bg-white border-2 border-primary"></div>
                      <div className="flex items-start">
                        <div className="mr-3 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs min-w-[60px] text-center">
                          {new Date(camp.start_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div>
                          <h4 className="font-medium">{camp.name}</h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {`${new Date(camp.start_date).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                            })} - ${new Date(camp.end_date).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                            })}`}
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
