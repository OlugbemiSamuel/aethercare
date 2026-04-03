export type Priority = "low" | "medium" | "high" | "emergency";
export type AppointmentStatus =| "scheduled" | "confirmed" | "in-consultation" | "completed"| "cancelled";

export interface Patient {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: "male" | "female" | "other";
  blood_group?: string;
  created_at: string;
  priority: Priority;
  vitals: Vitals;
  chief_complaint: string;
  admitted_at: string;
  notes: string;
  
}

export interface Vitals {
  blood_pressure: string;
  heart_rate: number;
  temp: number;
  spO2: number;
}

export interface PatientDetails extends Patient {
  vitals: Vitals;
  chief_complaint: string;
  admitted_at: string;
  notes: string;
}

export interface Appointement {
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
