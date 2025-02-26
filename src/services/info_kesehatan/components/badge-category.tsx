import { cn } from "@/lib/utils"

export const BadgeCategory = ({ category, className }: {category: string, className?: string}) => {
    return (
        <div className={cn("bg-primaryLight text-black text-xs px-2 py-1 rounded-full", className)}>
            {category}
        </div>
    )
}