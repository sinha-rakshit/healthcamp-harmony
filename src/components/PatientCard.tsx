import { User, Calendar, Phone, ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deletePatient } from "@/services/patientService";
import { useToast } from "@/hooks/use-toast";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    phone: string;
    lastVisit: string;
    address: string;
    medicalHistory: string[];
    campVisits: number;
    registrationDate: string;
    hasAlert?: boolean;
  };
  onDelete?: (id: string) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onDelete }) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle delete functionality
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${patient.name}'s record?`
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deletePatient(patient.id);
      toast({
        title: `Patient-${patient.id} deleted successfully`,
      });
      if (onDelete) {
        onDelete(patient.id);
      }
    } catch (error) {
      toast({
        title: `Failed to delete patient. Please try again`,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">
                {patient.name}
                {patient.hasAlert && (
                  <span className="inline-block ml-2 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500">ID: {patient.id}</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  {patient.gender}
                </Badge>
                <Badge variant="outline" className="ml-2 text-xs">
                  {patient.age} years
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            <span>{patient.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>Last Visit: {patient.lastVisit}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 text-sm">
            <div>
              <div className="text-gray-600 font-medium">Address:</div>
              <p className="mt-1">{patient.address}</p>
            </div>
            <div>
              <div className="text-gray-600 font-medium">Registration Date:</div>
              <p className="mt-1">{patient.registrationDate}</p>
            </div>
            <div>
              <div className="text-gray-600 font-medium">Medical History:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {patient.medicalHistory.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="text-gray-600 font-medium">Camp Visits:</div>
              <p className="mt-1">{patient.campVisits} visits</p>
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
            {isExpanded ? "Show less" : "Show more"}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${
                isExpanded ? "transform rotate-180" : ""
              }`}
            />
          </Button>
          <div className="flex space-x-2">
            <Button
              size="sm"
              className="bg-[#00866C] text-white hover:bg-[#00725C]"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
