import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProductData, SalesData } from '../types';
import productData from '../data/stackline_frontend_assessment_data_2021.json';

interface ProductState {
  data: ProductData | null;
  loading: boolean;
  error: string | null;
  sortConfig: {
    key: keyof SalesData;
    direction: 'asc' | 'desc';
  };
  selectedMonth: string | null;  // New state property for selected month
}

const initialState: ProductState = {
  data: productData[0],
  loading: false,
  error: null,
  sortConfig: {
    key: 'weekEnding',
    direction: 'desc'
  },
  selectedMonth: null,  // Initialize as null (no month selected initially)
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSortConfig: (state, action: PayloadAction<{ key: keyof SalesData; direction: 'asc' | 'desc' }>) => {
      state.sortConfig = action.payload;
    },
    setSelectedMonth: (state, action: PayloadAction<string | null>) => {
      state.selectedMonth = action.payload;  // Set the selected month
    }
  }
});

export const { setSortConfig, setSelectedMonth } = productSlice.actions;
export default productSlice.reducer;
