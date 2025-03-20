"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ButtonIcon } from "./button_icon";
import { Trash } from "lucide-react";
import { FooterImage } from "./footer_image";
import deleteCalorie from "../api/deleteCalorie";
import { toast } from "sonner";

interface ModalDeleteCalorieProps {
  id: string;
  onDelete: () => void;
}

export const ModalDeleteCalorie = ({ id, onDelete }: ModalDeleteCalorieProps) => {
  const handleDelete = async () => {
    try {
      await deleteCalorie(id);
      toast.success("Data berhasil dihapus");
      onDelete();
    } catch (error) {
      console.error("Failed to delete calorie:", error);
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ButtonIcon variant="delete" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah Anda yakin ingin menghapus data ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Data yang telah dihapus tidak dapat dikembalikan
          </AlertDialogDescription>
          <AlertDialogAction className="bg-danger" onClick={handleDelete}>
            <Trash size={16} className="text-white" />
            Hapus
          </AlertDialogAction>
          <AlertDialogCancel>Batalkan</AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <FooterImage />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
