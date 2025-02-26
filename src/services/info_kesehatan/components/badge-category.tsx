export const BadgeCategory = ({ category }: {category: string}) => {
    return (
        <div className="bg-primaryLight text-black text-xs px-2 py-1 rounded-full">
            {category}
        </div>
    )
}