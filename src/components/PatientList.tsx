import { useMemo, useState } from "react";
import type { Patient } from "../types/medical";
import PatientCard from "./PatientCard";
import EmptyState from "./EmptyState";
import StatCard from "./ui/StatCard";
import useDebounce from "../hooks/useDebounce";

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
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilterStatus("all");
  };

  const inputStyles =
    "max-w-lg w-full px-3 py-2 bg-white dark:bg-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ";

  const { displayPatients, stats } = useMemo(() => {
    const query = debouncedSearch.toLowerCase().trim();

    return patients.reduce(
      (acc, patient) => {
        acc.stats.total++;

        if (patient.priority === "emergency" || patient.priority === "high")
          acc.stats.emergency++;
        if (patient.priority === "medium" || patient.priority === "low")
          acc.stats.stable++;

        const name = patient.full_name?.toLowerCase() ?? "";
        const email = patient.email?.toLowerCase() ?? "";

        const matchesSearch =
          !query || name.includes(query) || email.includes(query);

        let matchesStatus = false;

        if (filterStatus === "all") matchesStatus = true;
        else if (filterStatus === "emergency") {
          matchesStatus =
            patient.priority === "emergency" || patient.priority === "high";
        } else if (filterStatus === "stable") {
          matchesStatus =
            patient.priority === "medium" || patient.priority === "low";
        }

        if (matchesSearch && matchesStatus) {
          acc.displayPatients.push(patient);
        }

        return acc;
      },

      {
        displayPatients: [] as Patient[],
        stats: { emergency: 0, stable: 0, total: 0 },
      },
    );
  }, [debouncedSearch, patients, filterStatus]);

  const sortedPatients = useMemo(() => {
    return [...displayPatients].sort((a, b) => {
      const weightA = PriorityWeights[a.priority] ?? 0;
      const weightB = PriorityWeights[b.priority] ?? 0;
      return weightB - weightA;
    });
  }, [displayPatients]);

  const lastUpdated = useMemo(() => {
    const count = patients.length;
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [patients]);

  return (
    <div className="space-y-6 ">
      <p className="text-3xl">Last Updated:{lastUpdated}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          onSetStatus={() => setFilterStatus("all")}
          color={"blue"}
          label={"Total Patients"}
          value={stats.total}
          isActive={filterStatus === "all"}
        />
        <StatCard
          onSetStatus={() => setFilterStatus("emergency")}
          color={"red"}
          label={"Critical (Emergency)"}
          value={stats.emergency}
          isActive={filterStatus === "emergency"}
        />
        <StatCard
          onSetStatus={() => setFilterStatus("stable")}
          color={"amber"}
          label={"Stable Cases"}
          value={stats.stable}
          isActive={filterStatus === "stable"}
        />
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

      {sortedPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {sortedPatients.map((patient) => (
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
        <EmptyState
          onAction={handleClearSearch}
          actionText="Clear Search"
          title="No Patient Found"
          description={`We couldn't find any results for "${searchQuery}". Try adjusting your filters or search terms.`}
        />
      )}
    </div>
  );
};

export default PatientList;
