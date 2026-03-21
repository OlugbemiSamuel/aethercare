import type { Patient } from "../types/medical";
import PatientCard from "./PatientCard";

interface PatientListProps {
    patients: Patient[];
    onSelectPatient: (id:string) => void;
  
}

const PatientList: React.FC<PatientListProps> = ({patients,onSelectPatient }) => {
    return(
        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            { patients.map((patient) => (
               <div 
               key={patient.id} 
              
               >
                <PatientCard patient={patient} priority={'medium'} onViewDetails={onSelectPatient}  />

               </div> 
            ))

            }

        </div>
    )
}

export default PatientList