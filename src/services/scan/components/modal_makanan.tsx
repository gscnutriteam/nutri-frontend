"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { BadgeMakananProps } from "../types/type";
import { FooterImage } from "@/services/statistic/components/footer_image";
import { Check, Plus } from "lucide-react";
import { useMakananForm } from "../hooks/useMakananForm";
import MakananForm from "./forms/MakananForm";

export const ModalConfirmMakanan = ({
  title,
  estimations,
  isAdded = false,
}: BadgeMakananProps) => {
  const { 
    form, 
    open, 
    setOpen, 
    foodIsAdded, 
    onSubmit, 
    handleRemove 
  } = useMakananForm({ title, estimations, isAdded });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "flex items-center justify-between py-1 px-2 rounded-full border w-fit",
            foodIsAdded
              ? "border-green-500 text-green-700 bg-white"
              : "border-teal-500 text-teal-700 bg-white"
          )}
        >
          <span className="font-medium text-sm mr-3">{title}</span>
          <div
            className={cn(
              "rounded-full flex items-center justify-center w-4 h-4",
              foodIsAdded ? "bg-green-500 text-white" : "bg-teal-100 text-teal-500"
            )}
          >
            {foodIsAdded ? (
              <Check size={12} strokeWidth={3} />
            ) : (
              <Plus size={12} strokeWidth={3} />
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-start">
          <DialogTitle>Konfirmasi makananmu</DialogTitle>
          <DialogDescription>
            Pilih makanan yang sesuai dengan yang kamu makan
          </DialogDescription>
        </DialogHeader>
        
        <MakananForm 
          form={form} 
          onSubmit={onSubmit} 
          onRemove={handleRemove}
          isAdded={foodIsAdded}
        />
        
        <DialogFooter>
          <FooterImage />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
