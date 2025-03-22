
import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, CheckCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { deleteCamp } from "@/services/campService";

interface CampCardProps {
  camp: {
    id: string;
    name: string;
    type: string;
    date: string;
    time: string;
    location: string;
    address: string;
    coordinator: string;
    status: 'Active' | 'Scheduled' | 'Completed' | 'Cancelled';
    specialties: string[];
    registeredPatients: number;
    capacity: number;
  };
}

const CampCard: React.FC<CampCardProps> = ({ camp }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Scheduled: 'bg-blue-100 text-blue-800',
    Completed: 'bg-gray-100 text-gray-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <span className="mr-1.5 h-2 w-2 rounded-full bg-green-600"></span>;
      case 'Scheduled':
        return <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-600"></span>;
      case 'Completed':
        return <CheckCircle className="mr-1.5 h-3 w-3" />;
      case 'Cancelled':
        return <span className="mr-1.5 h-2 w-2 rounded-full bg-red-600"></span>;
      default:
        return null;
    }
  };

  const progressPercentage = (camp.registeredPatients / camp.capacity) * 100;

  const handleDelete = async (id: string) => {
    try {
      await deleteCamp(id);
      alert("Camp deleted successfully!");
      
    } catch (error) {
      alert("Error deleting camp: " + error.message);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold mb-1">{camp.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Badge variant="outline" className="mr-2">
                {camp.type}
              </Badge>
              <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[camp.status]}`}>
                <div className="flex items-center">
                  {getStatusIcon(camp.status)}
                  {camp.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-3">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{camp.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span>{camp.time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{camp.location}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Registration</span>
            <span className="font-medium">{camp.registeredPatients}/{camp.capacity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 text-sm">
            <div>
              <span className="text-gray-600 font-medium">Address:</span>
              <p className="mt-1">{camp.address}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Coordinator:</span>
              <p className="mt-1">{camp.coordinator}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Specialties:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {camp.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="px-0 text-gray-500"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${
                isExpanded ? 'transform rotate-180' : ''
              }`}
            />
          </Button>
          <div className="flex space-x-2">
          <Button size="sm" className="bg-[#00866C] text-white hover:bg-[#00725C]" onClick={() => handleDelete(camp.id)}>
            Delete Camp
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
