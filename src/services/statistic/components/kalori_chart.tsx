"use client";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils";
import type { Period } from "@/services/home/types/chart";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { useCalorieStats } from "../hooks/useCalorieStats";

interface KaloriChartProps {
    className?: string;
    period?: Period;
    onPeriodChange?: (period: Period) => void;
}

export const KaloriChart = ({ className, period: externalPeriod, onPeriodChange }: KaloriChartProps) => {
    // Use internal state if no external period is provided
    const [internalPeriod, setInternalPeriod] = useState<Period>('daily');
    
    // Determine which period state to use
    const kaloriPeriod = externalPeriod || internalPeriod;
    
    // Handle period change
    const handlePeriodChange = (value: Period) => {
        if (onPeriodChange) {
            onPeriodChange(value);
        } else {
            setInternalPeriod(value);
        }
    };
    
    const { chartData, isLoading } = useCalorieStats(kaloriPeriod);

    const metricKey="calories"
    const metricLabel="Kalori"
    const metricColor="#53C2C6"

    const chartConfig = {
        [metricKey]: {
            label: metricLabel,
            color: metricColor,
        },
    } satisfies ChartConfig;

    return (<>
        <div className={cn("flex flex-col w-full justify-end items-end", className)}>
            <Select 
                value={kaloriPeriod} 
                onValueChange={handlePeriodChange as (value: 'daily' | 'weekly' | 'monthly') => void}
            >
                <SelectTrigger className="w-[120px] scale-[0.8]" variant="neutral">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="daily">Harian</SelectItem>
                    <SelectItem value="weekly">Mingguan</SelectItem>
                    <SelectItem value="monthly">Bulanan</SelectItem>
                </SelectContent>
            </Select>
            <ChartContainer className="w-full h-fit" config={chartConfig}>
                <AreaChart
                    data={chartData}
                    className="h-64 w-full"
                >
                    <CartesianGrid className="w-full" vertical={false} />
                    <YAxis
                        dataKey={metricKey}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={20}
                        className="w-full"
                    />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={0}
                        className="w-full"
                    />
                    <Legend />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <defs>
                        <linearGradient
                            id={`fill${metricKey}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor={`var(--color-${metricKey.toLowerCase()})`}
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor={`var(--color-${metricKey.toLowerCase()})`}
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                    </defs>
                    <Area
                        dataKey={metricKey}
                        type="natural"
                        fill={`url(#fill${metricKey})`}
                        fillOpacity={0.4}
                        stroke={`var(--color-${metricKey.toLowerCase()})`}
                        stackId="a"
                        className="w-full"
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    </>)
}