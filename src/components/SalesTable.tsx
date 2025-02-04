import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import type { SalesData } from '../types';
import { setSortConfig } from '../store/productSlice';

const SalesTable: React.FC = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state: RootState) => state.product.data?.sales);
  const sortConfig = useSelector((state: RootState) => state.product.sortConfig);

  if (!sales) return null;

  const sortedData = [...sales].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: keyof SalesData) => {
    dispatch(setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              {['weekEnding', 'retailSales', 'wholesaleSales', 'unitsSold', 'retailerMargin'].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header as keyof SalesData)}
                  >
                    {header.replace(/([A-Z])/g, ' $1').trim()}
                    {sortConfig.key === header && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row) => (
              <tr key={row.weekEnding}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(row.weekEnding).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${row.retailSales.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${row.wholesaleSales.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.unitsSold.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${row.retailerMargin.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;