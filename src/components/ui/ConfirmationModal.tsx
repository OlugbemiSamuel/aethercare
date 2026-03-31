import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "./Button";
import type { Patient } from "../../types/medical";
import usePatientStore from "../../store/usePatientStore";
import { toast } from "sonner";
import { useState } from "react";

interface ConfirmationModalProps {
  patient: Patient;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ patient }) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [modalerror, setModalError] = useState<string | null>("");

  const deletePatient = usePatientStore((state) => state.deletePatient);

  const handleDelete = async (id: string) => {
    setModalError(null);
    setIsDeleting(true);
    const toastId = toast.loading("Deleting patient.....");
    try {
      await deletePatient(id);

      toast.success("Patient deleted successfully", {
        id: toastId,
        description: "The record has been permanently removed.",
      });
      setOpen(false);
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Unable to delete patient try again";
      toast.error("Could not delete patient", {
        id: toastId,
        description: errorMsg,
      });
      setModalError(errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isDeleting) setOpen(isOpen);
      }}
    >
      <AlertDialog.Trigger asChild>
        <Button variant="danger" title="Delete Patient">
          <Trash size={18} />
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <AlertDialog.Content
          onEscapeKeyDown={(e) => isDeleting && e.preventDefault()}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl max-w-md w-full"
        >
          {modalerror && (
            <span className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {" "}
              {`Could not delete patient: ${modalerror}`}
            </span>
          )}

          <AlertDialog.Title className="text-xl mt-5 font-bold">
            Delete Patient Record?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-3 text-slate-600 leading-relaxed">
            Are you sure you want to delete <strong>{patient.full_name}</strong>
            ? This action is irreversible and will remove all associated medical
            history.
          </AlertDialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <Button disabled={isDeleting} variant="secondary">
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <Button
              variant="danger"
              onClick={() => handleDelete(patient.id)}
              title="Confirm Delete"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ConfirmationModal;
