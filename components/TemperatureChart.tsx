"use client";

import React, { useMemo, useCallback } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  LabelList,
  LabelProps,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import WeatherIcon from "./WeatherIcon";

export interface Point {
  time: string; // "08:00" or "Now"
  temp: number; // temperature °C
  code: number; // weathercode for icon
  current?: boolean; // highlight this point if true
}

interface TemperatureChartProps {
  data: Point[];
}

// Chart configuration constants
const CHART_CONFIG = {
  MARGIN: { top: 40, right: 24, bottom: 10, left: 24 },
  TEMP_LABEL_OFFSET: 28,
  ICON_LABEL_OFFSET: 64,
  ICON_SIZE: 20,
  TEMP_PADDING: 2,
  STROKE_WIDTH: 1.2,
  MIN_WIDTH: 600,
} as const;

export default function TemperatureChart({ data }: TemperatureChartProps) {
  // Memoized label components for performance
  const TempLabel = useCallback((props: LabelProps): React.ReactNode => {
    const { x = 0, y = 0, value } = props;

    return (
      <g>
        <text
          x={x}
          y={Number(y) - CHART_CONFIG.TEMP_LABEL_OFFSET}
          textAnchor="middle"
          className="fill-white font-light text-base select-none"
          aria-label={`Temperature ${value} degrees`}
        >
          {`${value}°`}
        </text>
      </g>
    );
  }, []);

  const IconLabel = useCallback((props: LabelProps): React.ReactNode => {
    const { x = 0, y = 0, value } = props;
    
    return (
      <g>
        <foreignObject 
          x={Number(x) - CHART_CONFIG.ICON_SIZE / 2} 
          y={Number(y) - CHART_CONFIG.ICON_LABEL_OFFSET} 
          width={CHART_CONFIG.ICON_SIZE} 
          height={CHART_CONFIG.ICON_SIZE}
        >
          <div className="flex items-center justify-center size-[20px]">
            <WeatherIcon 
              code={Number(value)} 
              size={CHART_CONFIG.ICON_SIZE} 
              strokeWidth={2} 
            />
          </div>
        </foreignObject>
      </g>
    );
  }, []);

  // Memoized domain calculation for performance
  const domain = useMemo(() => {
    if (data.length === 0) return [0, 30];
    
    const temps = data.map((p) => p.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    
    return [min - CHART_CONFIG.TEMP_PADDING, max + CHART_CONFIG.TEMP_PADDING];
  }, [data]);

  // Memoized chart data to prevent unnecessary re-renders
  const chartData = useMemo(() => data, [data]);

  return (
    <Card className="bg-transparent shadow-none border-none">
      <CardContent className="p-0">
        <div 
          className="w-full overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-weather-gold/50 scrollbar-track-transparent"
          role="img"
          aria-label="Hourly temperature forecast chart"
        >
          <div 
            className="min-w-max h-56" 
            style={{ 
              minWidth: `${CHART_CONFIG.MIN_WIDTH}px`
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={CHART_CONFIG.MARGIN}
                role="img"
                aria-label="Temperature line chart"
              >
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  stroke="rgb(38, 70, 83)"
                  interval="equidistantPreserveStart"
                  aria-label="Time axis"
                />
                <YAxis 
                  hide 
                  domain={domain}
                  aria-label="Temperature axis"
                />
                <Line
                  type="natural"
                  dataKey="temp"
                  stroke="rgb(38, 70, 83)"
                  strokeWidth={CHART_CONFIG.STROKE_WIDTH}
                  dot={false}
                  aria-label="Temperature line"
                >
                  <LabelList 
                    dataKey="temp" 
                    position="top" 
                    content={TempLabel} 
                  />
                  <LabelList 
                    dataKey="code" 
                    position="top" 
                    content={IconLabel} 
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}