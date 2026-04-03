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
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AddPatientModal = () => {
  const addPatient = usePatientStore((state) => state.addPatient);
  const updatePatients = usePatientStore((state) => state.updatePatient);
  const selectedPatient = usePatientStore((state) => state.selectedPatient);
  const setSelectedPatient = usePatientStore(
    (state) => state.setSelectedPatient,
  );
  const isModalOpen = usePatientStore((state) => state.isModalOpen);
  const setIsModalOpen = usePatientStore((state) => state.setIsModalOpen);
  const isLoading = usePatientStore((state) => state.isLoading);

  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  useEffect(() => {
    if (selectedPatient) {
      reset(selectedPatient);
    }
  }, [selectedPatient, reset]);

  const clearForm = () => {
    setSelectedPatient(null);
    reset({
      full_name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      gender: undefined,
      blood_group: "",
    });
    setFormError(null);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);

    if (!isOpen) {
      clearForm();
    }
  };

  const onSubmit = async (data: PatientFormData) => {
    setFormError(null);
    try {
  
      if (selectedPatient) {
        await updatePatients(selectedPatient.id, data);
      } else {
        await addPatient(data);
      }
      toast.success(
        selectedPatient
          ? "Patient updated successfully"
          : "Patient added successfully",
      );
      handleOpenChange(false);
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setFormError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const getButtonText = () => {
    if (isLoading) {
      return selectedPatient ? "Updating Patient Info" : "Registering Patient";
    }

    return selectedPatient ? "Save Changes" : "Register Patient";
  };

  // Reusable Tailwind classes for inputs to keep it clean
  const inputStyles =
    "w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-white";
  const labelStyles =
    "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";
  const errorStyles = "text-xs text-red-500 mt-1 block";

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleOpenChange}>
      <Button
        onClick={() => {
          clearForm();

          setIsModalOpen(true);
        }}
        className="px-2 py-0"
      >
        Add New Patient
      </Button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white  dark:bg-slate-950 p-8 rounded-xl shadow-2xl w-full  max-w-md z-50 border dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-bold text-slate-900 dark:text-white">
              {selectedPatient ? "Edit Patient Record" : "Add New Patient"}
            </Dialog.Title>
            <Dialog.Close className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={20} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                {formError}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="fullname-id" className={labelStyles}>
                Full Name
              </label>
              <input
                required
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
                required
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
                  required
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
                  required
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
                required
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
            {/* {Priority} */}
            <div>
              <label htmlFor="priority" className={labelStyles}>
                Priority
              </label>
              <select
                className={inputStyles}
                {...register("priority")}
                id="prioriy"
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="emergency">Emergency</option>
              </select>
              {errors.priority && (
                <span className={errorStyles}>{errors.priority?.message}</span>
              )}
            </div>

            {/* {Blood Group} */}
            <div>
              <label className={labelStyles} htmlFor="bloodgroup-id">
                Blood Group
              </label>
              <select
                {...register("blood_group")}
                className={inputStyles}
                id="bloodgroup_id"
              >
                <option value="select">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB">AB</option>
                <option value="AB">AB</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <Dialog.Close asChild>
                <Button variant="secondary" className="w-full">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                disabled={isLoading}
                variant="primary"
                type="submit"
                className="w-full"
              >
                {getButtonText()}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddPatientModal;
