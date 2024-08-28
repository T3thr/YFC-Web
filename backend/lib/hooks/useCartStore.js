import { create } from 'zustand';
import { round2 } from '@/backend/lib/utils';
import { OrderItem, ShippingAddress } from '@/backend/models/Order';
import { persist } from 'zustand/middleware';

// Initial state for the cart
const initialState = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: 'PayPal',
  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
};

// Create the cart store with persistence
export const cartStore = create(
  persist(
    () => initialState,
    {
      name: 'cartStore',
    }
  )
);

// Cart service hook
export default function useCartService() {
  const {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
  } = cartStore();

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
    increase: (item) => {
      const exist = items.find((x) => x.slug === item.slug);
      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
          )
        : [...items, { ...item, qty: 1 }];
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    decrease: (item) => {
      const exist = items.find((x) => x.slug === item.slug);
      if (!exist) return;
      const updatedCartItems =
        exist.qty === 1
          ? items.filter((x) => x.slug !== item.slug)
          : items.map((x) => (item.slug ? { ...exist, qty: exist.qty - 1 } : x));
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    saveShippingAddress: (shippingAddress) => {
      cartStore.setState({
        shippingAddress,
      });
    },
    savePaymentMethod: (paymentMethod) => {
      cartStore.setState({
        paymentMethod,
      });
    },
    clear: () => {
      cartStore.setState({
        items: [],
      });
    },
    init: () => cartStore.setState(initialState),
  };
}

// Calculate prices based on items
const calcPrice = (items) => {
  const itemsPrice = round2(items.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 100);
  const taxPrice = round2(Number(0.15 * itemsPrice));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
