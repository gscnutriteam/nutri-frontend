import type React from 'react';
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ChartProps {
  title: string;
  data: Array<{
    day: string;
    [key: string]: number | string;
  }>;
  period: 'daily' | 'weekly' | 'monthly';
  onPeriodChange: (value: 'daily' | 'weekly' | 'monthly') => void;
  metricKey: string;
  metricLabel: string;
  metricColor: string;
  hideTitle?: boolean;
  isDetail?: boolean;
}

const Chart: React.FC<ChartProps> = ({
  title,
  data,
  period,
  onPeriodChange,
  metricKey,
  metricLabel,
  metricColor,
  hideTitle = false,
  isDetail = false,
}) => {
  const chartConfig = {
    [metricKey]: {
      label: metricLabel,
      color: metricColor,
    },
  } satisfies ChartConfig;

  return (
    <Card variant={'neutral'} className="w-full max-w-3xl relative z-50 mt-8">
      <div className="absolute bg-main rounded-t-lg z-50 rounded-br-lg border-2 font-medium text-lg border-black py-2 px-7 -top-6 -left-[1.9px]">
        {!hideTitle && title}
      </div>
      <CardHeader className="flex w-full justify-end items-end">
        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-[120px]" variant="neutral">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Harian</SelectItem>
            <SelectItem value="weekly">Mingguan</SelectItem>
            <SelectItem value="monthly">Bulanan</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 16,
              right: 16,
            }}
            className="h-64"
          >
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey={metricKey}
              tickLine={false}
              axisLine={false}
              tickMargin={0}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
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
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {isDetail && (
        <CardFooter className="flex w-full justify-between">
          <Button variant="neutral" className="text-sm">
            Tambah Data
          </Button>
          <Button
            variant="default"
            className="text-sm "
          >
            Selengkapnya
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Chart;
