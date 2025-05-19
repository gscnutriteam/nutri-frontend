declare module 'react-gauge-chart' {
  import { FC, ReactElement, CSSProperties } from 'react';

  interface GaugeChartProps {
    id: string;
    className?: string;
    style?: CSSProperties;
    marginInPercent?: number;
    cornerRadius?: number;
    nrOfLevels?: number;
    percent?: number;
    arcPadding?: number;
    arcWidth?: number;
    colors?: string[];
    textColor?: string;
    needleColor?: string;
    needleBaseColor?: string;
    hideText?: boolean;
    arcsLength?: number[];
    animate?: boolean;
    animDelay?: number;
    animateDuration?: number;
    formatTextValue?: (value: number) => string;
    textComponent?: ReactElement;
    textComponentContainerClassName?: string;
    needleScale?: number;
    customNeedleComponent?: ReactElement;
    customNeedleComponentClassName?: string;
    customNeedleStyle?: CSSProperties;
  }

  const GaugeChart: FC<GaugeChartProps>;

  export default GaugeChart;
} 