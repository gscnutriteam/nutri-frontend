import { cn } from "@/lib/utils";

const BadgeBMI = ({ bmi, className }: { bmi: number, className?: string }) => {
  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return ["Kurus", "bg-yellow-500"];
    if (bmi < 22.99) return ["Normal", "bg-success"];
    if (bmi < 24.99) return ["Gemuk", "bg-yellow-500"];
    return ["Obesitas", "bg-red-500"];
  };

  const [status, statusColor] = getBMIStatus(bmi);

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

export { BadgeBMI };
