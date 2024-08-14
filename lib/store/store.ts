import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import currencyReducer from "./features/currencySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      currency: currencyReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore["dispatch"];

export type RootState = ReturnType<AppStore["getState"]>;
