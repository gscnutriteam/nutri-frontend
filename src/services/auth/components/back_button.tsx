'use client';
import { useRouter } from "next/navigation";

export const BackButton = ({ className = "mt-5", variant = "black" }: {className?: string, variant?: "black" | "white"}) => {
  const router = useRouter();
  return (
    <div className={`${className} cursor-pointer`} onClick={()=> router.back()}>
          <img
            src={variant == "black" ? "/assets/icon/arrow_left.svg": "/assets/icon/arrow_left_white.svg"}
            alt=""
            className="w-6 h-6"
          />
    </div>
  )
}
