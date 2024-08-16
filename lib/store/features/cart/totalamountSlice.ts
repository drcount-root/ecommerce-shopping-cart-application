import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TotalAmountState {
  amountToPay: number;
}
const initialState: TotalAmountState = {
  amountToPay: 0,
};

export const totalAmountSlice = createSlice({
  name: "totalAmount",
  initialState,
  reducers: {
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.amountToPay = action.payload;
    },
  },
});

export const { setTotalAmount } = totalAmountSlice.actions;

export default totalAmountSlice.reducer;
