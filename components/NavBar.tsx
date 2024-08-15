import React from "react";
import Link from "next/link";
import CartComponent from "./CartAndUser";

const Navbar = () => {
  return (
    <div className=" md:w-[1200px] mx-auto w-[95%] py-4 flex items-center justify-between relative">
      <div className="text-black font-medium text-xl cursor-pointer">
        <Link href="/">Shoppers Stop</Link>
      </div>
      <p className="md:block hidden absolute right-36 text-xs bg-black text-white p-1 rounded-md px-2">
        Use code SAVE15 to get extra 15% discount
      </p>
      <CartComponent />
    </div>
  );
};

export default Navbar;
