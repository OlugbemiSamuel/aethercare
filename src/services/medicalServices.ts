import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/useAuthStore";
import type { MedicalRecord, NewMedicalRecord } from "../types/medical";


export const getPatientMedicalRecords = async (patientId: string): Promise<MedicalRecord[]> => {
    const {data, error} = await supabase
    .from('medical_records')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at', {ascending:false})

    if(error) throw error;
    return data as MedicalRecord[];
};




export const addPatientMedicalRecord = async (newRecord:NewMedicalRecord ): Promise<MedicalRecord> => {
    const doctorId = useAuthStore.getState().user?.id;
   const  recordToSave = {
        ...newRecord,
        doctor_id: doctorId
    };

    const {data, error} = await supabase
    .from('medical_records')
    .insert(recordToSave)
    .select()
    .single();

    if(error) throw error;

    return data as MedicalRecord;

}