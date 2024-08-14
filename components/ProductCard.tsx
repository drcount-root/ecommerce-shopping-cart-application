"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { ProductInterface } from "@/interfaces";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({
  id,
  title,
  image,
  price,
  description,
  category,
  rating: { rate, count },
  currency,
}: ProductInterface) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems =
    useAppSelector((state) => state.cart.items.map((item) => item.id)) || [];

  const handleAddToCart = () => {
    if (cartItems.includes(id)) {
      router.push("/cart");
    } else {
      dispatch(addToCart(id));
      toast.success("Product added to cart", { autoClose: 2000 });
    }
  };

  const isInCart = cartItems.includes(id);

  return (
    <div className="w-full hover:shadow-lg transition-all rounded cursor-pointer overflow-hidden min-h-[350px] max-w-[350px] md:min-h-[380px] md:max-w-[380px] relative group">
      <div className="relative w-full h-[260px] md:h-[280px] md:max-h-[300px]">
        <Image
          src={image}
          alt={title}
          className="object-cover w-full h-full"
          width={100}
          height={100}
          //   fill
        />
      </div>
      <div className="px-2 pt-3 text-sm absolute bottom-0 left-0 right-0 transition-transform transform group-hover:translate-y-[-15px] bg-white">
        <p className="line-clamp-1">{title}</p>
        <div className="w-[80px] h-[10px] relative italic font-medium text-xs text-blue-500">
          Assured
        </div>
        <div className="flex md:items-center flex-col md:flex-row gap-2 md:gap-0 justify-between py-3">
          <p className="text-green-600 text-sm">
            {currency === "USD" ? "$" + price : "₹" + Math.floor(price * 83.93)}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-1 rounded md:w-fit w-full"
          >
            {isInCart ? "Go to cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
