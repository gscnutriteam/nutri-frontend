import { cn } from "@/lib/utils";
import { BadgeMakananProps } from "../types/type";
import { Check, Plus } from "lucide-react";

export const BadgeMakanan = ({ title, isAdded = false }: BadgeMakananProps) => {
  return (
    <>
    <div
      className={cn(
        "flex items-center justify-between py-1 px-2 rounded-full border w-fit",
        isAdded ? "border-green-500 text-green-700 bg-white" : "border-teal-500 text-teal-700 bg-white"
      )}
    >
      <span className="font-medium text-sm mr-3">{title}</span>
      <div
        className={cn(
          "rounded-full flex items-center justify-center w-4 h-4",
          isAdded ? "bg-green-500 text-white" : "bg-teal-100 text-teal-500"
        )}
      >
        {isAdded ? (
          <Check size={12} strokeWidth={3} />
        ) : (
          <Plus size={12} strokeWidth={3} />
        )}
      </div>
    </div>
    </>
    
  );
};