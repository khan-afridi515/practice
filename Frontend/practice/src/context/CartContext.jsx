import { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("setcart")) || []);
  const [totalcart, setTotalCart] = useState(0);

  useEffect(() => {
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    setTotalCart(totalQty);
  }, [cart]);


  useEffect(()=>{
    localStorage.setItem("setcart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // TODO: implement removeFromCart(productId)
  const removeFromCart = (productId) => {
    
  };

  // TODO: implement increaseQuantity(productId)
  const increaseQuantity = (productId) => {
    // TODO: increase quantity immutably
  };

  // TODO: implement decreaseQuantity(productId)
  const decreaseQuantity = (productId) => {
    // TODO: decrease quantity immutably
  };

  // TODO: implement clearCart()
  const clearCart = () => {
    // TODO: reset cart to an empty array
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    setCart,
    totalcart,
    setTotalCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
