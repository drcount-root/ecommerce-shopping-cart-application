"use client";

import ProductCard from "@/components/ProductCard";
import { ProductInterface } from "@/interfaces";
import { dummyProductsData } from "@/dummyData";
import { setTheCurrency } from "@/lib/store/features/currencySlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import { getDummyProductsApiData } from "@/utils/getDummyApiData";
import loader from "@/public/assets/loader.gif";
import Image from "next/image";

const Home = () => {
  // const products = dummyProductsData;
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const currency = useAppSelector((state) => state.currency.currency);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fn = async () => {
      try {
        const productsFromApi = await getDummyProductsApiData();
        console.log("productsFromApi", productsFromApi);
        productsFromApi?.length > 0 && setProducts(productsFromApi);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setErr(true);
      }
    };

    fn();
  }, []);

  const handleCurrencyChange = (chosenCurrency: string) => {
    dispatch(setTheCurrency(chosenCurrency));
  };

  return (
    <>
      {isLoading ? (
        <div className="mt-32">
          <Image src={loader} alt="loader" width={50} height={50} />
        </div>
      ) : err ? (
        <p className="text-red-600 mt-32"> Something went wrong! </p>
      ) : (
        <main className="w-full flex flex-col items-center mb-10">
          <div className="md:w-[1200px] w-[95%] py-4 flex justify-between">
            <p className="text-base font-medium">
              Products found:
              {products?.length}
            </p>

            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium">Currency</label>
              <select
                className="block w-full px-3 py-0.5 text-gray-700 rounded-md shadow-sm border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>
          <div className="md:w-[1200px] mt-4 w-[95%] grid grid-cols-2 md:grid-cols-5 md:gap-8 gap-3 overflow-hidden pb-14 md:p-2">
            {products?.map((product: ProductInterface) => (
              <ProductCard {...product} key={product?.id} currency={currency} />
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
