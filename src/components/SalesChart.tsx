import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { setSelectedMonth } from '../store/productSlice'; // Import the action
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
  const dispatch = useDispatch();
  const sales = useSelector((state: RootState) => state.product.data?.sales);
  const sortConfig = useSelector((state: RootState) => state.product.sortConfig);
  const selectedMonth = useSelector((state: RootState) => state.product.selectedMonth);

  const [showSmoothed, setShowSmoothed] = useState(true); // Track if smoothed graph should be shown
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null); // Track hovered month for hover effect

  if (!sales) return null;

  // Apply sorting before grouping data
  const sortedData = [...sales].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Group the sorted data by month
  const monthlySalesData = groupDataByMonth(sortedData);

  // Filter monthly data by selected month
  const filteredData = selectedMonth
    ? sortedData.filter((data) => {
        const month = new Date(data.weekEnding).toLocaleString('en-US', { month: 'short' });
        return month === selectedMonth;
      })
    : monthlySalesData;

  // Handle clicking a month to select
  const handleDotClick = (month: string) => {
    dispatch(setSelectedMonth(month));
    setShowSmoothed(false);  // Disable smoothing when a month is selected
  };

  // Restore the base (smoothed) graph
  const restoreBaseGraph = () => {
    dispatch(setSelectedMonth(''));  // Reset to no month selected
    setShowSmoothed(true);  // Enable smoothing for base graph
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Retail Sales</h2>
      <div className="flex justify-between mb-4">
        {/* Restore Button */}
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={restoreBaseGraph}
        >
          Restore Base Graph
        </button>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={selectedMonth ? 'weekEnding' : 'month'} // Use 'weekEnding' for specific month
              interval={0}
              tickFormatter={(tick) => tick}
              tick={({ x, y, payload }: any) => {
                const isActive = selectedMonth === payload.value || hoveredMonth === payload.value;
                return (
                  <text
                    x={x}
                    y={y + 10}
                    textAnchor="middle"
                    fill={isActive ? '#40A9FF' : '#666'}
                    fontWeight={isActive ? 'bold' : 'normal'}
                    fontSize={12}
                    onClick={() => handleDotClick(payload.value)}  // Click to select month
                    onMouseEnter={() => setHoveredMonth(payload.value)}  // Hover to highlight month
                    onMouseLeave={() => setHoveredMonth(null)}  // Remove hover effect when mouse leaves
                  >
                    {selectedMonth ? new Date(payload.value).toLocaleDateString() : payload.value} {/* Display date or month */}
                  </text>
                );
              }}
            />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} tick={{ fill: '#666' }} />
            <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`]} />

            {/* Display raw (non-smoothed) data when a specific month is selected */}
            {showSmoothed ? (
              <>
                <Line
                  type="basis"
                  dataKey="retailSales"
                  stroke="#40A9FF"
                  strokeWidth={3}
                  name="Retail Sales"
                  dot={false}
                />
                <Line
                  type="basis"
                  dataKey="wholesaleSales"
                  stroke="#95A5A6"
                  strokeWidth={3}
                  name="Wholesale Sales"
                  dot={false}
                />
              </>
            ) : (
              <>
                {/* Plot raw data without smoothing or averaging */}
                <Line
                  type="monotone"
                  dataKey="retailSales"
                  stroke="#40A9FF"
                  strokeWidth={2}
                  name="Retail Sales"
                  dot={true}
                />
                <Line
                  type="monotone"
                  dataKey="wholesaleSales"
                  stroke="#95A5A6"
                  strokeWidth={2}
                  name="Wholesale Sales"
                  dot={true}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
