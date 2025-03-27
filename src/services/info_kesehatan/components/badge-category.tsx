import { cn } from "@/lib/utils"
import { TagIcon } from "lucide-react"

export const BadgeCategory = ({ category, className }: {category: string, className?: string}) => {
    return (
        <div className={cn(
            "bg-primaryLight text-black text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium",
            "hover:bg-primary hover:text-white transition-colors duration-300 whitespace-nowrap max-w-[140px] overflow-hidden",
            className
        )}>
            <TagIcon size={12} className="inline-block flex-shrink-0" />
            <span className="truncate">{category}</span>
        </div>
    )
}