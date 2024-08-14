"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { dummyProductsData } from "@/dummyData";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/lib/store/features/cart/cartSlice";

const CartItems = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state?.cart?.items) || [];
  const cartItemIds = cartItems.map((item) => item?.id);
  const cartData = dummyProductsData.filter((item) =>
    cartItemIds.includes(item?.id)
  );
  const currency = useAppSelector((state) => state.currency.currency);

  const handleIncreaseQuantity = (itemId: number) =>
    dispatch(increaseQuantity(itemId));
  const handleDecreaseQuantity = (itemId: number) =>
    dispatch(decreaseQuantity(itemId));
  const handleRemoveFromCart = (itemId: number) =>
    dispatch(removeFromCart(itemId));

  if (cartData?.length === 0) {
    return <p className="text-center mt-16">Your cart is empty</p>;
  }

  return (
    <div className="pt-4">
      <ul>
        {cartData?.map((item) => {
          const itemInCart = cartItems.find(
            (cartItem) => cartItem?.id === item?.id
          );
          return (
            <li
              key={item?.id}
              className="mb-2 h-[110px] border rounded overflow-hidden"
            >
              <div className="flex">
                <div className="h-[110px] w-[110px] relative overflow-hidden">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>
                <div className="py-1 px-3 flex flex-col w-full justify-evenly">
                  <div className="w-full flex justify-between">
                    <p className="text-sm font-medium line-clamp-1 w-[90%]">
                      {item?.title}
                    </p>
                    <button onClick={() => handleRemoveFromCart(item?.id)}>
                      <X size={17} className="text-sm hover:text-red-500" />
                    </button>
                  </div>
                  <p className="text-green-600 text-sm">
                    {currency === "USD"
                      ? "$" + item?.price.toFixed(2)
                      : "₹" + Math.floor(item?.price * 83.93)}
                  </p>
                  <div className="text-sm flex items-center gap-3">
                    <button
                      onClick={() => handleDecreaseQuantity(item?.id)}
                      className="rounded w-6 h-6 flex items-center justify-center bg-gray-100"
                    >
                      -
                    </button>
                    <span>{itemInCart?.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item?.id)}
                      className="rounded w-6 h-6 flex items-center justify-center bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CartItems;
