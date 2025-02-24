import { Progress } from "@/components/ui/progress"

const ProgressBMI = ({ from, target, current, isDietTurun }: { from: number, target: number, current: number, isDietTurun: boolean }) => {
    return (
        <>
        <div className="flex w-full mt-3 items-center gap-2">
            <p className="font-semibold">{`${from}kg`}</p>
            <Progress className="bg-unprogress border-2" value={((from-current)/(from-target))*100} />
            <p className="font-semibold">{`${target}kg`}</p>
        </div>
        </>
    )
}

export default ProgressBMI;