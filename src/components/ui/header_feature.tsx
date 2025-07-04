import { cn } from "@/lib/utils";
import { BackButton } from "@/services/auth/components/back_button";
import { cva, type VariantProps } from "class-variance-authority";

const headerFeatureVariants = cva("relative flex w-full", {
  variants: {
    variant: {
      white: "text-white",
      black: "text-black",
      primary: "text-primary",
    },
  },
  defaultVariants: {
    variant: "white",
  },
});

interface HeaderFeatureProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerFeatureVariants> {
  title: string;
  rightSlot?: React.ReactNode;
}

export function HeaderFeature({
  className,
  variant = "white",
  title,
  rightSlot,
  ...props
}: HeaderFeatureProps) {
  return (
    <div
      className={cn(headerFeatureVariants({ variant, className }))}
      {...props}
    >
      <BackButton
        variant={variant ?? "white"}
        className="absolute top-0 flex items-center left-4 h-full"
      />
      <p
        className={cn(
          "text-center w-full text-xl py-2 font-semibold",
          variant === "black"
            ? "text-black"
            : variant === "primary"
            ? "text-primaryText"
            : "text-white"
        )}
      >
        {title}
      </p>
      {rightSlot && (
        <div className="absolute top-0 right-4 h-full flex items-center">{rightSlot}</div>
      )}
    </div>
  );
}
