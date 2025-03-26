"use client";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, Label, Legend, XAxis, YAxis } from "recharts";
import { useWeightHeightData } from "../hooks/useWeightHeightData";
import { Skeleton } from "@/components/ui/skeleton";
import type { Period } from "@/services/home/types/chart";

export const BMIChart = ({className}: {className?: string})=> {
  const [weightPeriod, setWeightPeriod] = useState<Period>('daily');
  const { chartData, isLoading, weightHeightData } = useWeightHeightData();

  // Get appropriate chart data based on selected period, ensuring deduplication
  const displayData = useMemo(() => {
    if (isLoading || !chartData) return [];
    
    // Use chart data from hook, which is already deduplicated
    switch (weightPeriod) {
      case "daily":
        return chartData.daily;
      case "weekly":
        return chartData.weekly;
      case "monthly":
        return chartData.monthly;
      default:
        return chartData.daily;
    }
  }, [weightPeriod, chartData, isLoading]);

  const getWeightTitle = () => {
    switch (weightPeriod) {
      case "daily":
        return "Harian";
      case "weekly":
        return "Mingguan";
      case "monthly":
        return "Bulanan";
    }
  };

  // Define metrics to display on the chart
  const metricKey = "weight";
  const metricLabel = "Berat";
  const metricColor = "#53C2C6";

  const chartConfig = {
    [metricKey]: {
      label: metricLabel,
      color: metricColor,
    }
  } satisfies ChartConfig;

  return (
    <div className={cn("flex flex-col w-full justify-end items-end", className)}>
      <Select value={weightPeriod} onValueChange={setWeightPeriod as (value: 'daily' | 'weekly' | 'monthly') => void}>
        <SelectTrigger className="w-[120px]" variant="neutral">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Harian</SelectItem>
          <SelectItem value="weekly">Mingguan</SelectItem>
          <SelectItem value="monthly">Bulanan</SelectItem>
        </SelectContent>
      </Select>
      
      {isLoading ? (
        <Skeleton className="h-64 w-full mt-2" />
      ) : (
        <ChartContainer className="w-full h-fit" config={chartConfig}>
          <AreaChart
            data={displayData}
            className="h-64 w-full"
          >
            <CartesianGrid className="w-full" vertical={false} />
            <YAxis
              dataKey={metricKey}
              tickLine={false}
              axisLine={false}
              tickMargin={40}
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
                  stopColor={metricColor}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={metricColor}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey={metricKey}
              type="natural"
              fill={`url(#fill${metricKey})`}
              fillOpacity={0.4}
              stroke={metricColor}
              stackId="1"
            />
          </AreaChart>
        </ChartContainer>
      )}
    </div>
  );
}