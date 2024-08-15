export interface ProductInterface {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  currency?: string;
}

export interface CartItemsProps {
  cartItems: CartItemInterface[];
  cartData: ProductInterface[];
  currency: string;
}

export interface CartItemInterface {
  id: number;
  quantity: number;
}

export interface CartInterface {
  items: CartItemInterface[];
  coupon: string;
}
