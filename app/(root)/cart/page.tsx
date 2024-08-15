"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import CartItems from "@/components/CartItems";
import CartSummary from "@/components/CartSummary";
import { getDummyProductsApiData } from "@/utils/getDummyApiData";
import Image from "next/image";
import loader from "@/public/assets/loader.gif";
import { ProductInterface } from "@/interfaces";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  const cartItems = useMemo(() => cart?.items || [], [cart?.items]);

  const cartItemIds = useMemo(
    () => cartItems.map((item) => item?.id),
    [cartItems]
  );

  const totalQuantity = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const currency = useAppSelector((state) => state.currency.currency);

  const [cartData, setCartData] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const productsFromApi = await getDummyProductsApiData();
        if (isMounted && productsFromApi?.length > 0) {
          setCartData(productsFromApi);
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setErr(true);
      }
    };

    if (cartItemIds.length > 0) {
      fetchData();
    } else {
      setIsLoading(false); // No items in cart, no need to fetch
    }

    return () => {
      isMounted = false;
    };
  }, [cartItemIds]);

  const filteredCartData = useMemo(
    () =>
      cartData.filter((item: ProductInterface) =>
        cartItemIds.includes(item?.id)
      ),
    [cartData, cartItemIds]
  );

  return (
    <>
      {isLoading ? (
        <div className="mt-32">
          <Image src={loader} alt="loader" width={50} height={50} />
        </div>
      ) : err ? (
        <p className="text-red-600 mt-32"> Something went wrong! </p>
      ) : !cartItems.length ? (
        <p className="text-center mt-32 text-red-600">Your cart is empty</p>
      ) : (
        <main className="w-full flex flex-col items-center mt-10 md:mt-5">
          <div className="md:w-[1200px] w-[95%] py-4">
            <p className="text-base">
              <span className="font-semibold">
                {totalQuantity} items in your cart
              </span>
            </p>
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex-[3]">
                <CartItems
                  cartData={filteredCartData}
                  cartItems={cartItems}
                  currency={currency}
                />
              </div>
              <div className="flex-1">
                <CartSummary
                  cart={cart}
                  cartData={filteredCartData}
                  cartItems={cartItems}
                  totalQuantity={totalQuantity}
                  currency={currency}
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Cart;
