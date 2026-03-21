import {create} from 'zustand';
import type { Patient } from '../types/medical';

//what the brain can remember and do
interface PatientState {
    patients: Patient[];
    selectedPatient: Patient | null;
    isLoading: boolean;


    setPatients: (patients: Patient[]) => void;
    addPatient: (patient: Patient) => void;
    setSelectedPatient: (patient: Patient | null) => void;
};

const usePatientStore = create<PatientState>((set) =>({
    patients: [],
    selectedPatient: null,
    isLoading: false,
    setPatients: (patients) => set({patients}),
    addPatient: (patient) => set((state) => ({
        patients: [patient, ...state.patients]
    })),
    setSelectedPatient: (patient) => set({selectedPatient:patient}),
}))

export default usePatientStore





// export default usePatientStore