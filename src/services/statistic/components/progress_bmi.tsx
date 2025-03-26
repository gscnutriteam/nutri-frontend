import { Progress } from "@/components/ui/progress"
import { useEffect } from "react";

const ProgressBMI = ({ from, target, current, isDietTurun }: { from: number, target: number, current: number, isDietTurun: boolean }) => {
    useEffect(() => {
        console.log('🔄 ProgressBMI rendered with:', { from, target, current, isDietTurun });
    }, [from, target, current, isDietTurun]);

    // Calculate progress value safely
    const calculateProgress = () => {
        console.log('📊 Calculating progress with:', { from, target, current });
        
        // Handle division by zero or invalid values
        if (from === target || !from || !target) {
            console.log('⚠️ Invalid values for progress calculation:', { from, target, current });
            return 0;
        }
        
        const progress = ((from - current) / (from - target)) * 100;
        console.log('📊 Calculated progress:', progress);
        
        // Clamp the value between 0 and 100
        const clampedProgress = Math.max(0, Math.min(100, progress));
        console.log('📊 Clamped progress:', clampedProgress);
        
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