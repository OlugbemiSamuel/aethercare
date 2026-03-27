import { toast } from "sonner";
import usePatientStore from "../store/usePatientStore";
import type { Patient, Priority } from "../types/medical";
import { Button } from "./ui/Button";
import { User, Activity, Calendar,  Edit } from "lucide-react";
import ConfirmationModal from "./ui/ConfirmationModal";

interface PatientCardProps {
  patient: Patient;
  priority: Priority;
  onViewDetails: (id: string) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  priority,
  onViewDetails,
}) => {
  const priorityColors = {
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-200 text-amber-700",
    high: "bg-red-200 text-red-700",
    emergency: "bg-red-500 text-white animate-pulse ",
  };

  const deletePatient = usePatientStore((state) => state.deletePatient);
  const selectedPatient = usePatientStore((state) => state.setSelectedPatient);
  const setIsModalOpen = usePatientStore((state) => state.setIsModalOpen);

  const handleUpdate = () => {
    selectedPatient(patient);
    setIsModalOpen(true);
  };

  return (
    <div className=" relative group  bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center  gap-">
          <div className="p-2 bg-blue-50 rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
              {patient.full_name}
            </h3>
            <p className="text-sm text-slate-500  dark:text-slate-100">
              {patient.email}
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${priorityColors[priority]}`}
        >
          {priority}
        </span>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center text-sm text-slate-600  dark:text-slate-100 gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            Born: {new Date(patient.date_of_birth).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center text-sm text-slate-600  dark:text-slate-100 gap-2">
          <Activity className="w-4 h-4" />
          <span>Blood Group: {patient.blood_group || "Not recorded"}</span>
        </div>
      </div>
      <div className="flex  justify-between">
        <Button
          variant="secondary"
          className=" max-w-sm"
          onClick={() => onViewDetails(patient.id)}
        >
          View Medical Records
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() => handleUpdate()}
            className=" p-2 text-slate-400   hover:text-blue50 hover:bg-blue-50 rounded-lg  transition-all duration-200"
            title="Edit Patient"
          >
            <Edit size={18} />
          </Button>
          <ConfirmationModal patient={patient}  />
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
