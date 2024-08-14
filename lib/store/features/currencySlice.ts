import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  currency: string;
}
const initialState: CurrencyState = {
  currency: "USD",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setTheCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

export const { setTheCurrency } = currencySlice.actions;

export default currencySlice.reducer;
