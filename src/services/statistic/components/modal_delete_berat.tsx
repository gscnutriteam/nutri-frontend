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

export const ModalDeleteBerat = ({ id }: { id: number }) => {
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
          <AlertDialogAction className="bg-danger">
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
