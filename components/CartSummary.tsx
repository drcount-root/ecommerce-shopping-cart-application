"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { dummyProductsData } from "@/dummyData";
import { toast } from "react-toastify";
import { applyCouponCode } from "@/lib/store/features/cart/cartSlice";

const CartSummary = () => {
  const [coupon, setCoupon] = useState<string>("");
  //   const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponMessage, setCouponMessage] = useState<string>("");

  const cart = useAppSelector((state) => state.cart);
  const cartItems = cart?.items || [];
  const cartItemIds = cartItems.map((item) => item?.id);
  const appliedCoupon = cart?.coupon;
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.currency.currency);

  const cartData = dummyProductsData.filter((item) =>
    cartItemIds.includes(item?.id)
  );

  const cartTotal = cartData.reduce((acc, item) => {
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    const quantity = itemInCart ? itemInCart.quantity : 0;
    return acc + item.price * quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const discount = appliedCoupon === "SAVE15" ? 0.15 : 0;
  const discountedTotal = cartTotal * (1 - discount);

  const handleAddCoupon = () => {
    if (coupon === "SAVE15") {
      //   setAppliedCoupon(coupon);
      dispatch(applyCouponCode(coupon));
      setCouponMessage("");
      toast.success("Coupon applied successfully", { autoClose: 2000 });
      localStorage.setItem("appliedCoupon", coupon);
    } else {
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
  }, []);

  return (
    <>
      {cartItems.length > 0 && (
        <>
          <div className="w-full text-sm flex items-center justify-center border rounded overflow-hidden mt-4">
            {appliedCoupon ? (
              <div className="w-full bg-green-600/80 flex items-center justify-between px-3 py-2">
                <p className="text-white w-[90%]">
                  Coupon applied: {appliedCoupon}
                </p>
                <X
                  size={18}
                  className="text-white cursor-pointer"
                  onClick={() => {
                    dispatch(applyCouponCode(""));
                    localStorage.removeItem("appliedCoupon");
                  }}
                />
              </div>
            ) : (
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full p-2 outline-none"
                />
                <button
                  onClick={handleAddCoupon}
                  className="bg-black text-white px-3 py-2 rounded ml-2"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {couponMessage && (
            <div className="text-red-500 text-start text-sm mt-2">
              {couponMessage}
            </div>
          )}
        </>
      )}

      <div className="w-full border mt-3 p-3 bg-gray-50 space-y-2 rounded">
        <h3 className="text-md font-medium border-b">Cart Summary</h3>
        <div className="text-sm space-y-2">
          <div>
            <p>
              Price ({totalQuantity} items):{" "}
              {currency === "USD"
                ? "$" + cartTotal.toFixed(2)
                : "₹" + Math.floor(cartTotal * 83.93)}
            </p>
            <p>Discount: {discount * 100}%</p>
          </div>
          <div className="pt-2">
            <strong className="text-md">
              Grand Total:{" "}
              {currency === "USD"
                ? "$" + discountedTotal.toFixed(2)
                : "₹" + Math.floor(discountedTotal * 83.93)}
            </strong>
            <button className="bg-black text-white px-4 py-2 w-full mt-2 rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
