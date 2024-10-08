"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";

const CartAndUser = () => {
  const cartDetails = useAppSelector((state) => state.cart.items) || [];
  const totalItemsInCart = cartDetails.reduce(
    (total, item) => total + item.quantity,
    0
  );
  console.log("cartDetails", totalItemsInCart);
  return (
    <div className="flex items-center gap-4 text-sm">
      <Link href="/cart">
        <div className="flex items-center gap-1 relative cursor-pointer">
          {cartDetails.length > 0 && (
            <div className=" absolute -top-2 right-7 rounded-full bg-black text-white w-4 h-4 flex items-center justify-center">
              {totalItemsInCart}
            </div>
          )}
          <ShoppingBag size={19} />
          <p>Cart</p>
        </div>
      </Link>
      <Link href="/sign-in" className="flex items-center gap-1 cursor-pointer">
        <User size={20} />
        <p>User</p>
      </Link>
    </div>
  );
};

export default CartAndUser;
