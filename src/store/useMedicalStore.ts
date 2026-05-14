import { create } from "zustand";
import type {
  MedicalRecord,
  NewMedicalRecord,
} from "../types/medical";
import {
  addPatientMedicalRecord,
  getPatientMedicalRecords,
} from "../services/medicalServices";
import { toast } from "sonner";

interface MedicalStore {
  records: MedicalRecord[];
  isFetchingRecords: boolean;
  isCreatingRecords: boolean;
  fetchRecords: (patientId: string) => Promise<void>;
  addRecord: (newRecord: NewMedicalRecord) => Promise<void>;
}

export const useMedicalStore = create<MedicalStore>((set) => ({
  records: [],
  isCreatingRecords: false,
  isFetchingRecords: false,

  fetchRecords: async (patientId) => {
    set({ isCreatingRecords: true });

    try {
      const data = await getPatientMedicalRecords(patientId);
      set({ records: data });
    } catch (error) {
      const errMsg =
        error instanceof Error
          ? error.message
          : "failed to fetch medical records try again.";
      toast.error(errMsg);
      throw error;
    } finally {
      set({ isFetchingRecords: false });
    }
  },

  addRecord: async (newRecord) => {
    set({ isCreatingRecords: true });
    try {
      const data = await addPatientMedicalRecord(newRecord);
      set((state) => ({
        records: [data, ...state.records],
      }));
      toast.success("Medical record saved successfully!");
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to save record";
      toast.error(errMsg);
      throw error;
    } finally {
      set({ isCreatingRecords: false });
    }
  },
}));
