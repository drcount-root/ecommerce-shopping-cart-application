export const getDummyProductsApiData = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log("all products", data);
  return data;
};
