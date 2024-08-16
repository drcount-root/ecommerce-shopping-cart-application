import React from "react";
import checkoutIcon from "@/public/assets/verify.png";
import Image from "next/image";

const page = () => {
  return (
    <div className="mt-28 flex flex-col items-center gap-10">
      <Image src={checkoutIcon} alt="checkout_icon" width={100} height={100} />
      <p className="text-green-500">Order Successful! </p>
    </div>
  );
};

export default page;
