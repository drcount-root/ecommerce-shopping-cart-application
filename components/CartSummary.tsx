"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/store/hooks";
import { applyCouponCode } from "@/lib/store/features/cart/cartSlice";
import { ProductInterface } from "@/interfaces";

interface CartSummaryProps {
  cart: any;
  cartData: ProductInterface[];
  cartItems: any;
  totalQuantity: number;
  currency: string;
}

const CartSummary = ({
  cart,
  cartData,
  cartItems,
  totalQuantity,
  currency,
}: CartSummaryProps) => {
  const [coupon, setCoupon] = useState<string>("");
  const [couponMessage, setCouponMessage] = useState<string>("");

  const appliedCoupon = cart?.coupon;
  const dispatch = useAppDispatch();

  const cartTotal = cartData.reduce((acc: number, item: ProductInterface) => {
    const itemInCart = cartItems.find(
      (cartItem: any) => cartItem.id === item.id
    );
    const quantity = itemInCart ? itemInCart.quantity : 0;
    return acc + item.price * quantity;
  }, 0);

  const discount = appliedCoupon === "SAVE15" ? 0.15 : 0;
  const discountedTotal = cartTotal * (1 - discount);

  const handleAddCoupon = () => {
    if (coupon === "SAVE15") {
      dispatch(applyCouponCode(coupon));
      setCouponMessage("");
      toast.success("Coupon applied successfully", { autoClose: 2000 });
      localStorage.setItem("appliedCoupon", coupon);
    } else {
      setCoupon("");
      setCouponMessage("Invalid code");
      dispatch(applyCouponCode(""));
      localStorage.removeItem("appliedCoupon");
    }
  };

  useEffect(() => {
    const savedCoupon = localStorage.getItem("appliedCoupon");
    if (savedCoupon) {
      dispatch(applyCouponCode(savedCoupon));
    }
  }, [dispatch]);

  return (
    <>
      {cartItems.length > 0 && (
        <>
          <div className="w-full text-sm flex items-center justify-center border rounded overflow-hidden mt-4">
            {appliedCoupon ? (
              <div className="w-full bg-green-600/80 flex items-center justify-between px-3 py-2">
                <p className="text-white w-full text-center">
                  Coupon <span className="font-semibold">{appliedCoupon}</span>{" "}
                  applied successfully
                </p>
                <button
                  onClick={() => {
                    dispatch(applyCouponCode(""));
                    localStorage.removeItem("appliedCoupon");
                  }}
                >
                  <X size={17} className="text-white" />
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full px-2 py-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    type="text"
                    placeholder="Apply coupon code"
                    className="px-3 py-1 w-full border rounded"
                  />
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-2 px-2 pb-2">
                  <button
                    onClick={handleAddCoupon}
                    className="bg-gray-900 text-white rounded w-full py-2"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
            <p className="text-red-600 text-xs my-1 text-center">{couponMessage}</p>
          <div className="w-full mt-4 text-sm">
            <div className="flex justify-between items-center">
              <p>Subtotal</p>
              <p>
                {currency === "USD"
                  ? "$" + cartTotal.toFixed(2)
                  : "₹" + Math.floor(cartTotal * 83.93)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
              <p>Discount</p>
              <span>(15%)</span>
              </div>
              <p>
                -
                {currency === "USD"
                  ? "$" + (cartTotal * discount).toFixed(2)
                  : "₹" + Math.floor(cartTotal * discount * 83.93)}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center font-semibold">
              <p>Total</p>
              <p>
                {currency === "USD"
                  ? "$" + discountedTotal.toFixed(2)
                  : "₹" + Math.floor(discountedTotal * 83.93)}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartSummary;
