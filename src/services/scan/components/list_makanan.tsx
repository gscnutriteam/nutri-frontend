import { Button } from "@/components/ui/button";
import { BadgeMakanan } from "./badge_makanan";
import { ModalConfirmMakanan } from "./modal_makanan";

export const ListMakanan = () => {
  return (
    <>
      <div className="w-full flex flex-wrap gap-2 gap-y-3 justify-center">
        <ModalConfirmMakanan title="Nasi" />
        <ModalConfirmMakanan title="Kentang" />
        <ModalConfirmMakanan title="Timun" />
        <ModalConfirmMakanan title="Nasi Goreng" />
        <ModalConfirmMakanan title="Nasi" />
        <ModalConfirmMakanan title="Kentang" />
        <ModalConfirmMakanan title="Timun" />
        <ModalConfirmMakanan title="Nasi Goreng" />
        <ModalConfirmMakanan title="Nasi" />
        <ModalConfirmMakanan title="Kentang" />
        <ModalConfirmMakanan title="Timun" />
        <ModalConfirmMakanan title="Nasi Goreng" />
      </div>
      <div className="flex w-full justify-center">
      <Button className="w-3/4 place-items-center mt-5">Continue</Button>
      </div>
    </>
  );
};
