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
}

const initialState: ProductState = {
  data: productData[0],
  loading: false,
  error: null,
  sortConfig: {
    key: 'weekEnding',
    direction: 'desc'
  }
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSortConfig: (state, action: PayloadAction<{ key: keyof SalesData; direction: 'asc' | 'desc' }>) => {
      state.sortConfig = action.payload;
    }
  }
});

export const { setSortConfig } = productSlice.actions;
export default productSlice.reducer;