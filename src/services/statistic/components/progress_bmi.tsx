import { Progress } from "@/components/ui/progress"

const ProgressBMI = ({ from, target, current, isDietTurun }: { from: number, target: number, current: number, isDietTurun: boolean }) => {

    // Calculate progress value safely
    const calculateProgress = () => {
        
        // Handle division by zero or invalid values
        if (from === target || !from || !target) {
            return 0;
        }
        
        const progress = ((from - current) / (from - target)) * 100;
        
        // Clamp the value between 0 and 100
        const clampedProgress = Math.max(0, Math.min(100, progress));
        
        return clampedProgress;
    };

    const progressValue = calculateProgress();

    return (
        <>
        <div className="flex w-full mt-3 items-center gap-2">
            <p className="font-semibold">{`${from}kg`}</p>
            <Progress className="bg-unprogress border-2" value={progressValue} />
            <p className="font-semibold">{`${target}kg`}</p>
        </div>
        </>
    )
}

export default ProgressBMI;