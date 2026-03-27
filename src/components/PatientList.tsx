import { useMemo, useState } from "react";
import type { Patient } from "../types/medical";
import PatientCard from "./PatientCard";
import EmptyState from "./EmptyState";
import StatCard from "./ui/StatCard";

interface PatientListProps {
  patients: Patient[];

  onSelectPatient: (id: string) => void;
}
const PriorityWeights: Record<string, number> = {
  emergency: 4,
  high: 3,
  medium: 2,
  low: 1,
};

const PatientList: React.FC<PatientListProps> = ({
  patients,
  onSelectPatient,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleClearSearch = () => {
    setSearchQuery("");
  };


  const inputStyles =
    "max-w-lg w-full px-3 py-2 bg-white dark:bg-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ";

  const filteredPatients = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const filteredList = !query
      ? [...patients]
      : patients.filter((patient) => {
          const name = patient.full_name?.toLowerCase() ?? "";
          const email = patient.email?.toLowerCase() ?? "";
          return email.includes(query) || name.includes(query);
        });

    return filteredList.sort((a, b) => {
      const weightA = PriorityWeights[a.priority as string] ?? 0;
      const weightB = PriorityWeights[b.priority as string] ?? 0;
      return weightB - weightA;
    });
  }, [patients, searchQuery]);

  const displayPatients = filteredPatients ?? [];

  const stats = useMemo(() => {
    return patients.reduce(
      (acc, patient) => {
        acc.total++;
        if (patient.priority === "emergency") acc.emergency++;
        if (patient.priority === "high" || patient.priority === "medium")
          acc.stable++;
        return acc;
      },
      { total: 0, emergency: 0, stable: 0 },
    );
  }, [patients]);

  return (
    <div className="space-y-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard color={"blue"} label={"Total Patients"} value={stats.total} />
        <StatCard color={"red"} label={"Critical (Emergency)"} value={stats.emergency} />
        <StatCard color={"amber"} label={"Stable Cases"} value={stats.stable} />
      </div>

      <div className="flex  flex-col gap-2">
        
        <label
          htmlFor="search"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Search Patients
        </label>
        <input
          id="search"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={inputStyles}
          type="text"
        />
      </div>

      {displayPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {displayPatients.map((patient) => (
            <div key={patient.id}>
              <PatientCard
                patient={patient}
                priority={patient.priority}
                onViewDetails={onSelectPatient}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState onClear={handleClearSearch} />
      )}
    </div>
  );
};

export default PatientList;
