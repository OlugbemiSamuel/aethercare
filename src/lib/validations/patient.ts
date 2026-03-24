import { z} from 'zod';

export const patientSchema = z.object({
    full_name: z.string().min(3, '"Name must be at least 3 characters"'),
    email: z.string().email("Please enter a valid  email"),
    phone: z.string().min(11, "Phone number is too short"),
    date_of_birth: z.string().min(1,  "Date of birth is required"),
    gender: z.enum(['male', 'female', 'other']),
    blood_group: z.string().optional(),

});

export type PatientFormData = z.infer<typeof patientSchema>;