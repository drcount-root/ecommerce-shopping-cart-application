"use client";

import { clearCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const router = useRouter();
  const totalAmountToPay = useAppSelector(
    (state) => state.totalAmount.amountToPay
  );
  const dispatch = useAppDispatch();

  return (
    <div className="mt-32 flex flex-col gap-10 items-center">
      <p>Simulate the payment</p>
      <p>Total Amount To Pay : {totalAmountToPay}</p>
      <button
        className="bg-gray-900 text-white rounded w-full py-2 mt-3 text-sm"
        onClick={() => {
          dispatch(clearCart());
          router.push("/checkout");
        }}
      >
        Pay now
      </button>
    </div>
  );
};

export default PaymentPage;
