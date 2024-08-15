"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/lib/store/features/cart/cartSlice";
import { ProductInterface } from "@/interfaces";

interface CartItemsProps {
  cartItems: any;
  cartData: ProductInterface[];
  currency: string;
}

const CartItems = ({ cartItems, cartData, currency }: CartItemsProps) => {
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (itemId: number) =>
    dispatch(increaseQuantity(itemId));
  const handleDecreaseQuantity = (itemId: number) =>
    dispatch(decreaseQuantity(itemId));
  const handleRemoveFromCart = (itemId: number) =>
    dispatch(removeFromCart(itemId));

  return (
    <div className="pt-4">
      <ul>
        {cartData?.map((item: ProductInterface) => {
          const itemInCart = cartItems.find(
            (cartItem: any) => cartItem?.id === item?.id
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