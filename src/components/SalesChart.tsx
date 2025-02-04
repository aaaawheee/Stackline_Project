import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from 'recharts';
import type { RootState } from '../store';
import type { SalesData } from '../types';

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={4}
      fill="white"
      stroke={props.stroke}
      strokeWidth={2}
    />
  );
};

const SalesChart: React.FC = () => {
  const sales = useSelector((state: RootState) => state.product.data?.sales);
  const sortConfig = useSelector((state: RootState) => state.product.sortConfig);

  if (!sales) return null;

  // Sort data according to current sort configuration
  const sortedData = [...sales].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const formatTooltip = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Retail Sales</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sortedData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="weekEnding"
              tickFormatter={(date) => {
                const d = new Date(date);
                return d.toLocaleString('en-US', { month: 'short', day: '2-digit' });
              }}
              tick={{ fill: '#666' }}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: '#666' }}
              axisLine={false}
            />
            <Tooltip
              formatter={(value: number) => [formatTooltip(value)]}
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            />
            <Line
              type="monotone"
              dataKey="retailSales"
              stroke="#40A9FF"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 6, fill: "#40A9FF" }}
              name="Retail Sales"
            />
            <Line
              type="monotone"
              dataKey="wholesaleSales"
              stroke="#95A5A6"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 6, fill: "#95A5A6" }}
              name="Wholesale Sales"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;