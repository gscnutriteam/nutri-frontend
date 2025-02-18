'use client';
import { useRouter } from "next/navigation";

export const BackButton = ({ className = "cursor-pointer" }: {className?: string}) => {
  const router = useRouter();
  return (
    <div className={className} onClick={()=> router.back()}>
          <img
            src="/assets/icon/arrow_left.svg"
            alt=""
            className="w-6 h-6 mt-5"
          />
    </div>
  )
}
