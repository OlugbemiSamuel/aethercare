// import * as Dialog from "@radix-ui/react-dialog";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { X } from "lucide-react";
// import {
//   patientSchema,
//   type PatientFormData,
// } from "../lib/validations/patient";
// import usePatientStore from "../store/usePatientStore";
// import { Button } from "./ui/Button";

// const AddPatientModal = () => {
//   const addPatient = usePatientStore((state) => state.addPatient);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<PatientFormData>({
//     resolver: zodResolver(patientSchema),
//   });

//   const onSubmit = (data: PatientFormData) => {
//     const newPatient = {
//       ...data,
//       id: crypto.randomUUID(),
//       created_at: new Date().toISOString(),
//     };

//     addPatient(newPatient);
//     reset();
//     console.log("Patient Added!");
//   };

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         <Button>Add New Patient</Button>
//       </Dialog.Trigger>

//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />
//         <Dialog.Content
//           className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
//                                         bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
//         >
//           <Dialog.Title className="text-xl font-bold mb-4 text-slate-900">
//             Add New Patient
//           </Dialog.Title>

//           <form
//             action=""
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-4"
//           >
//             <label htmlFor="fullname-id">
//               Full Name:
//               <input id="fullname-id" type="text" {...register("full_name")} />
//             {errors.full_name && <span>{errors.full_name?.message}</span>}

//             </label>
//             <label htmlFor="email-id">
//               Email:
//               <input id="email-id" type="email" {...register("email")} />
//               {errors.email && <span>{errors.email?.message}</span>}
//             </label>
//             <label htmlFor="phone-id">
//                 Phone:
//                 <input id="phone-id" {...register('phone')} />
//                 {errors.phone && <span>{errors.phone?.message}</span>}
//             </label>

//             <label htmlFor="dob-id">
//                 Date of Birth:
//                 <input type="date" id="dob-id" {...register('date_of_birth')} />
//                 {errors.date_of_birth && <span>{errors.date_of_birth?.message}</span> }

//             </label>

//             <label htmlFor="gender-id">
//                 Gender:
//                 <select id="gender-id" {...register("gender")}>
//                     <option value="select">Select</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>

//                 </select>
//             </label>

//             <Button variant="danger" type="submit">Save</Button>

//           </form>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// };

// export default AddPatientModal;

import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import {
  patientSchema,
  type PatientFormData,
} from "../lib/validations/patient";
import usePatientStore from "../store/usePatientStore";
import { Button } from "./ui/Button";
import  { useState } from "react";

const AddPatientModal = () => {
  const addPatient = usePatientStore((state) => state.addPatient);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = (data: PatientFormData) => {
    const newPatient = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };

    addPatient(newPatient);
    reset();
    setOpen(false);
    console.log("Patient Added!");
  };

  // Reusable Tailwind classes for inputs to keep it clean
  const inputStyles =
    "w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-white";
  const labelStyles =
    "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";
  const errorStyles = "text-xs text-red-500 mt-1 block";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} >
      <Dialog.Trigger asChild>
        <Button>Add New Patient</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-950 p-8 rounded-xl shadow-2xl w-full max-w-md z-50 border dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-bold text-slate-900 dark:text-white">
              Add New Patient
            </Dialog.Title>
            <Dialog.Close className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={20} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullname-id" className={labelStyles}>
                Full Name
              </label>
              <input
                id="fullname-id"
                type="text"
                placeholder="Olugbemi Moses"
                {...register("full_name")}
                className={inputStyles}
              />
              {errors.full_name && (
                <span className={errorStyles}>{errors.full_name?.message}</span>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email-id" className={labelStyles}>
                Email Address
              </label>
              <input
                id="email-id"
                type="email"
                placeholder="moses@gmail.com"
                {...register("email")}
                className={inputStyles}
              />
              {errors.email && (
                <span className={errorStyles}>{errors.email?.message}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label htmlFor="phone-id" className={labelStyles}>
                  Phone
                </label>
                <input
                  id="phone-id"
                  placeholder="0801234..."
                  {...register("phone")}
                  className={inputStyles}
                />
                {errors.phone && (
                  <span className={errorStyles}>{errors.phone?.message}</span>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob-id" className={labelStyles}>
                  DOB
                </label>
                <input
                  type="date"
                  id="dob-id"
                  {...register("date_of_birth")}
                  className={inputStyles}
                />
                {errors.date_of_birth && (
                  <span className={errorStyles}>
                    {errors.date_of_birth?.message}
                  </span>
                )}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender-id" className={labelStyles}>
                Gender
              </label>
              <select
                id="gender-id"
                {...register("gender")}
                className={inputStyles}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className={errorStyles}>{errors.gender?.message}</span>
              )}
            </div>

            <div className="pt-4 flex gap-3">
              <Dialog.Close asChild>
                <Button variant="secondary" className="w-full">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button variant="primary" type="submit" className="w-full">
                Save Patient
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddPatientModal;
