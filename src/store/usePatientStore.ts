import { create } from "zustand";
import type { Patient } from "../types/medical";
import { supabase } from "../lib/supabase";


interface PatientState {
  patients: Patient[] ;
  selectedPatient: Patient | null;
  isLoading: boolean;
  isModalOpen: boolean;

  setIsModalOpen: (open: boolean) => void;
  fetchPatients: () => Promise<void>;

  addPatient: (patient: Omit<Patient, "id" | "created_at">) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  setSelectedPatient: (patient: Patient | null) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => Promise<void>;
}

const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  selectedPatient: null,
  isLoading: false,
  isModalOpen: false,

  setIsModalOpen: (open) => set({ isModalOpen: open }),

  fetchPatients: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      const errormsg = ` Error fetching patients:, ${error.message}`;
      console.error("Error fetching patients:", error.message);
      throw new Error(errormsg);
    } else {
      set({ patients: data || [] });
    }
    set({ isLoading: false });
  },

  addPatient: async (patientData) => {
    set({ isLoading: true });

    try{
      const {data, error} = await supabase
      .from("patients")
      .insert(patientData)
      .select()
      .single()

      if(error)  throw new Error(error.message);
      
      if(data) {
        set((state) => ({
          patients:[data, ...state.patients]
        }))
      }
    } catch(error: unknown) {
      const errormsg = error instanceof Error ? error.message : "An unknown error occurred try again";
      console.error(errormsg);
      throw new Error(errormsg);
      
    } finally{
      set({isLoading:false})
  }
},

  deletePatient: async (id: string) => {
    set({ isLoading: true });

    const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", id);

    if (error) {
      throw new Error(error.message);
    } else {
      set((state) => ({
        patients: state.patients.filter((patient) => patient.id !== id),
      }));
    }
    set({ isLoading: false });
  },

  updatePatient: async (id, updates) => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from("patients")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update failed:", error.message);
      throw new Error(error.message);
    } else if (data) {
      set((state) => ({
        patients: state.patients.map((patient) =>
          patient.id === id ? data : patient,
        ),
      }));
    }
    set({ isLoading: false });
  },

  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
}));

export default usePatientStore;


