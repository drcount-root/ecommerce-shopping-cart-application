import React from "react";
import Link from "next/link";
import CartComponent from "./CartAndUser";

const Navbar = () => {
  return (
    <div className=" md:w-[1200px] mx-auto w-[95%] py-4 flex items-center justify-between">
      <div className="text-black font-medium text-xl cursor-pointer">
        <Link href="/">Shoppers Stop</Link>
      </div>
      <CartComponent />
    </div>
  );
};

export default Navbar;
