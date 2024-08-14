"use client";

import React from "react";
import { useAppSelector } from "@/lib/store/hooks";
import CartItems from "@/components/CartItems";
import CartSummary from "@/components/CartSummary";
// import CartSummary from "./components/cart-summary";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items) || [];
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="w-full flex flex-col items-center">
      <div className="md:w-[1200px] w-[95%] py-4">
        <p className="text-base">
          <span className="font-semibold">
            {cartItems?.length
              ? totalQuantity + " items in your cart"
              : "Your cart is empty!"}
          </span>
        </p>
        <div className="flex gap-3 flex-col md:flex-row">
          <div className="flex-[3]">
            <CartItems />
          </div>
          <div className="flex-1">
            <CartSummary />
            summary
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
