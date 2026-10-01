import { useContext, useEffect } from "react";
import { CartContext, useCart } from "../context/CartContext";


const Cart = () => {

  const { cart, setCart, setTotalCart} = useContext(CartContext);

  

  const increase = (id) => {
    setCart(cart.map((element) =>
      element.id === id ? { ...element, qty: element.qty + 1 } : element
    ))
  }


  const decrease = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((element) => {
          if (element.id !== id) return element;

          if (element.qty <= 1) {
            return null;
          }

          return { ...element, qty: element.qty - 1 };
        })
        .filter(Boolean)
    );
  };

  const finish=(id)=>{
    const finishItem = cart.filter((prod)=> prod.id !== id);
    setCart(finishItem);
  }

  const totalcost = cart.reduce((sum, cur)=>(cur.price*cur.qty) + sum ,0)
  const isEmpty = cart.length === 0;


  const clearCart = () =>{
    setCart([]);
  }

  // useEffect(()=>{
  //   setTotalCart(totalqty)
  // }, [totalqty])

  return (
    <aside className="cart-panel">
      <h2 className="section-title">Your Cart</h2>

      {isEmpty ? (
        <div className="cart-empty">Your cart is empty.</div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__details">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>

                <div className="cart-item__controls">
                  <button type="button" className="qty-btn" aria-label="Decrease quantity" onClick={() => decrease(item.id)}>
                    -
                  </button>
                  <span className="qty-value">{item.qty}</span>
                  <button type="button" className="qty-btn" aria-label="Increase quantity" onClick={() => increase(item.id)}>
                    +
                  </button>
                </div>

                <button type="button" className="btn btn--danger btn--small" onClick={() => finish(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary__row">
              <span>Total</span>
              <strong>${totalcost}</strong>
            </div>

            <button type="button" className="btn btn--secondary btn--full" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default Cart;
