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
import { Loader2, Trash } from "lucide-react";
import { FooterImage } from "./footer_image";
import { deleteWeightHeight } from "../api/deleteWeightHeight";
import { toast } from "sonner";
import { useState } from "react";

interface ModalDeleteBeratProps {
  id: string | number;
  onSuccess?: () => void;
}

export const ModalDeleteBerat = ({ id, onSuccess }: ModalDeleteBeratProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteWeightHeight(String(id));
      toast.success("Data berhasil dihapus");
      setOpen(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Gagal menghapus data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
          <AlertDialogAction 
            className="bg-danger" 
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 size={16} className="text-white animate-spin mr-2" />
            ) : (
              <Trash size={16} className="text-white mr-2" />
            )}
            Hapus
          </AlertDialogAction>
          <AlertDialogCancel disabled={isLoading}>Batalkan</AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <FooterImage />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
