import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types';
import { useUser } from './UserContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { customer, loading } = useUser(); 
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 🔥 1. EL GESTOR DE CARTERAS (Carga el carrito correcto para cada persona)
  useEffect(() => {
    if (loading) return; // Esperamos a saber quién es el usuario

    const userId = customer?.id || 'guest';
    const storageKey = `cart_${userId}`; // Ejemplo: "cart_1" o "cart_guest"
    
    // Miramos si el invitado dejó algo en el carrito
    const guestCartString = localStorage.getItem('cart_guest');
    const guestCart = guestCartString ? JSON.parse(guestCartString) : [];

    // Si acabamos de iniciar sesión Y teníamos cosas como invitado, lo "heredamos"
    if (customer && guestCart.length > 0) {
        setCart(guestCart);
        localStorage.setItem(storageKey, JSON.stringify(guestCart));
        localStorage.removeItem('cart_guest'); // Limpiamos el de invitado
    } else {
        // Si no, simplemente cargamos el carrito que le toque a este usuario
        const savedCart = localStorage.getItem(storageKey);
        setCart(savedCart ? JSON.parse(savedCart) : []);
    }
    
    setIsInitialized(true);
  }, [customer, loading]);

  // 🔥 2. EL GUARDADO AUTOMÁTICO (Guarda los cambios en la caja fuerte del usuario actual)
  useEffect(() => {
    if (!isInitialized || loading) return;
    
    const userId = customer?.id || 'guest';
    const storageKey = `cart_${userId}`;
    
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, customer, loading, isInitialized]);

  // Funciones del carrito (Añadir, quitar, etc.)
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) {
          alert("No hay más stock disponible para este producto.");
          return prev;
        }

        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity + delta;
            if (delta > 0 && newQuantity > item.product.stock) {
              alert(`No hay suficiente stock. Máximo disponible: ${item.product.stock}`);
              return item;
            }
            return { ...item, quantity: Math.max(1, newQuantity) };
          }
          return item;
        })
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (Number(item.product.price) * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};