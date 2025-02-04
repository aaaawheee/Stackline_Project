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
} from 'recharts';
import type { RootState } from '../store';
import type { SalesData } from '../types';

// Function to group sorted sales data by month
const groupDataByMonth = (sales: SalesData[]) => {
  const monthlyData = new Map();

  sales.forEach(({ weekEnding, retailSales, wholesaleSales }) => {
    const date = new Date(weekEnding);
    const month = date.toLocaleString('en-US', { month: 'short' }); // "Mar 2025"

    if (!monthlyData.has(month)) {
      monthlyData.set(month, { month, retailSales: 0, wholesaleSales: 0, count: 0 });
    }

    const entry = monthlyData.get(month);
    entry.retailSales += retailSales;
    entry.wholesaleSales += wholesaleSales;
    entry.count += 1;
  });

  return Array.from(monthlyData.values()).map((entry) => ({
    month: entry.month,
    retailSales: entry.retailSales / entry.count, // Averaging data points
    wholesaleSales: entry.wholesaleSales / entry.count,
  }));
};

const SalesChart: React.FC = () => {
  const sales = useSelector((state: RootState) => state.product.data?.sales);
  const sortConfig = useSelector((state: RootState) => state.product.sortConfig);

  if (!sales) return null;

  // Apply sorting before grouping data
  const sortedData = [...sales].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Group the sorted data by month
  const monthlySalesData = groupDataByMonth(sortedData);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Retail Sales</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlySalesData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#666' }}
              interval={0} // Ensures only one label per month
            />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} tick={{ fill: '#666' }} />
            <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`]} />

            {/* Smooth Retail Sales Line */}
            <Line type="basis" dataKey="retailSales" stroke="#40A9FF" strokeWidth={3} name="Retail Sales" dot={false}/>

            {/* Smooth Wholesale Sales Line */}
            <Line type="basis" dataKey="wholesaleSales" stroke="#95A5A6" strokeWidth={3} name="Wholesale Sales" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
