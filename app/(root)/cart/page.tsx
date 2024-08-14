import React from "react";
// import CartCount from "./components/cart-count";
// import CartLists from "./components/cart-lists";
// import CartSummary from "./components/cart-summary";


const Cart = () => (
  <main className="w-full flex flex-col items-center">
    <div className="md:w-[1200px] w-[95%] py-4">
      <p className="text-base">
        <span className="font-semibold">
          {/* <CartCount />  */}
          items
        </span>
        {" "}in your cart
      </p>
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="flex-[3]">
          {/* <CartLists /> */}
          cart lists
        </div>
        <div className="flex-1">
          {/* <CartSummary /> */}
          summary
        </div>
      </div>
    </div>
  </main>
);

export default Cart;
