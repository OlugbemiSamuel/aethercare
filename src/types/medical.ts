export type Priority = "low" | "medium" | "high" | "emergency";
export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "in-consultation"
  | "completed"
  | "cancelled";

export interface Patient extends PatientDetails  {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: "male" | "female" | "other";
  blood_group?: string;
  created_at: string;
  priority: Priority;
}

export interface Vitals {
  blood_pressure?: string;
  heart_rate?: number;
  temp?: number;
  spO2?: number;
}

export interface PatientDetails  {
  chief_complaint?: string;
  admitted_at?: string;
  notes?: string;
  vitals?: Vitals;
  medical_history?: MedicalRecord[];
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  priority: Priority;
  notes?: string;
  symptoms: string[];
}

export interface Doctor {
  id: string;
  full_name: string;
  specialization: string;
  license_number: string;
  availability_status: "available" | "busy" | "away";
}

interface TreatmentAction {
  action: string;
  billing_code: string;
  instructions?: string;
}

interface Diagnosis {
  code: string;
  description: string;
  condition: "chronic" | "acute";
}

export interface MedicalRecord {
  id: string;
  doctor_id: string;
  patient_id: string;
  diagnosis: Diagnosis;
  treatment_plan: TreatmentAction[];
  vitals?: {
    bp?: string;
    temp?: number;
    weight?: number;
  };
  created_at: string;
}


export  type NewMedicalRecord = Omit<MedicalRecord, 'id' | 'created_at'>;