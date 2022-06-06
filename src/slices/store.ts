import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Store {
  PriceToOrder: number;
  id: number;
  orderTime: string;
  orderTip: string;
  storeImg: string;
  storeName: string;
}

interface InitialState {
  stores: Store[];
}
const initialState: InitialState = {
  stores: [],
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    getStoresByCategory(state, action: PayloadAction<Store>) {
      state.stores.push(action.payload);
    },
  },
});

export default storeSlice;
