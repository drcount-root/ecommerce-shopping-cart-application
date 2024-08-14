"use client";

import ProductCard from "@/components/ProductCard";
import { ProductInterface } from "@/interfaces";
import { dummyProductsData } from "@/dummyData";
import { setTheCurrency } from "@/lib/store/features/currencySlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const Home = () => {
  const products = dummyProductsData;
  const currency = useAppSelector((state) => state.currency.currency);
  const dispatch = useAppDispatch();

  const handleCurrencyChange = (chosenCurrency: string) => {
    dispatch(setTheCurrency(chosenCurrency));
  };

  return (
    <main className="w-full flex flex-col items-center mb-10">
      <div className="md:w-[1200px] w-[95%] py-4 flex justify-between">
        <p className="text-base font-medium">
          Products found:
          {products?.length}
        </p>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium">Currency</label>
          <select
            className="block w-full px-3 py-2 text-gray-700 rounded-md shadow-sm border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </div>
      <div className="md:w-[1200px] w-[95%] grid grid-cols-2 md:grid-cols-5 md:gap-8 gap-3 overflow-hidden pb-14 md:p-2">
        {products?.map((product: ProductInterface) => (
          <ProductCard {...product} key={product?.id} currency={currency} />
        ))}
      </div>
    </main>
  );
};

export default Home;
