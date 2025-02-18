export type Period = 'daily' | 'weekly' | 'monthly';

export interface CalorieData {
  day: string;
  calories: number;
  [key: string]: string | number;
}

export interface WeightData {
  day: string;
  weight: number;
}

export interface ChartData {
  day: string;
  [key: string]: number | string;
}

export interface ChartProps {
  title: string;
  data: ChartData[];
  period: Period;
  onPeriodChange: (value: Period) => void;
  metricKey: string;
  metricLabel: string;
  metricColor: string;
}
