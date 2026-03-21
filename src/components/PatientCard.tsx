import type { Patient, Priority } from "../types/medical";
import { Button } from "./ui/Button";
import { User, Activity, Calendar } from "lucide-react";

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
    medium: "bg-amber-100 text-amber-700",
    high: "bg-orange-100 text-orange-700",
    emergency: "bg-red-100 text-red-700 animate-pulse ",
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
              {patient.full_name}
            </h3>
            <p className="text-sm text-slate-500  dark:text-slate-100">{patient.email}</p>
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

      <Button
        variant="secondary"
        className="w-full"
        onClick={() => onViewDetails(patient.id)}
      >
        View Medical Records
      </Button>
    </div>
  );
};

export default PatientCard;
