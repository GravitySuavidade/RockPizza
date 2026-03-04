import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Size, Crust, Sauce, ToppingScope, ToppingAmount } from '../data/menu';

export interface CartTopping {
  toppingId: string;
  scope: ToppingScope;
  amount: ToppingAmount;
}

export interface CartItem {
  id: string;
  type: 'pizza' | 'other';
  menuItemId: string; // For whole pizza or flavor A
  flavorBId?: string; // For half & half
  size: Size;
  crust?: Crust;
  sauce?: Sauce;
  mode: 'whole' | 'half';
  toppings: CartTopping[];
  notes?: string;
  quantity: number;
  pricingSnapshot: {
    base: number;
    splitFee: number;
    toppings: number;
    subtotal: number;
  };
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.pricingSnapshot.subtotal * item.quantity, 0);
      },
      getItemCount: () => {
        const items = get().items;
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'rock-pizza-cart',
    }
  )
);
