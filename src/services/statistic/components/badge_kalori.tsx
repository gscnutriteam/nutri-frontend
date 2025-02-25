import { cn } from "@/lib/utils";

const BadgeKalori = ({ kalori, className }: { kalori: number, className?: string }) => {
  const getKaloriStatus = (kalori: number) => {
    if (kalori < 2000) return ["Lapar", "bg-yellow-500"];
    if (kalori < 2700) return ["Normal", "bg-success"];
    return ["Kenyang", "bg-yellow-500"];
  };

  const [status, statusColor] = getKaloriStatus(kalori);

  return (
    <div className={cn(" border-2 border-black rounded-xl px-3 py-0 scale-[0.8]", statusColor, className)}>
      <span
        className={`text-white font-semibold`}
      >
        {status}
      </span>
    </div>
  );
};

export { BadgeKalori };
