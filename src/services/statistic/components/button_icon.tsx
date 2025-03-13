import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
import { type LucideIcon, PencilIcon, Trash } from "lucide-react";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "edit" | "delete";
  icon?: LucideIcon;
}

const defaultIcons: Record<ButtonIconProps["variant"], LucideIcon> = {
  edit: PencilIcon,
  delete: Trash,
};

export const ButtonIcon = ({ variant, className, icon, ...props }: ButtonIconProps) => {
  const Icon = icon || defaultIcons[variant];
  
  return (
    <button
      className={cn(
        "rounded-full p-2",
        variant === "edit" && "bg-yellow-300",
        variant === "delete" && "bg-red-700",
        className
      )}
      {...props}
    >
      <Icon 
        size={16} 
        className={variant === "edit" ? "text-black" : "text-white"} 
      />
    </button>
  );
};
