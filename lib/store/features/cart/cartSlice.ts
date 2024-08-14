import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  coupon: string;
}

const initialState: CartState = {
  items: [],
  coupon: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id: itemId, quantity: 1 });
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } 
        else {
          state.items = state.items.filter((item) => item.id !== itemId);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },

    applyCouponCode: (state, action: PayloadAction<string>) => {
      const couponCode = action.payload;
      state.coupon = couponCode;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  applyCouponCode,
} = cartSlice.actions;

export default cartSlice.reducer;
