import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(price);

function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  const itemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <section className="cart-page" aria-labelledby="cart-title">
      <div className="cart-page__heading">
        <div>
          <p className="cart-page__eyebrow">YOUR SELECTION</p>
          <h1 id="cart-title">Your cart</h1>
          <p className="cart-page__subtitle">
            {itemCount === 1 ? '1 item' : `${itemCount} items`} ready for you.
          </p>
        </div>
        <Link to="/" className="cart-page__continue">
          <span aria-hidden="true">←</span> Continue shopping
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty-state">
          <div className="cart-empty-state__icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
              <path d="M13 22h38l-3 31H16l-3-31Z" />
              <path d="M23 25v-6a9 9 0 0 1 18 0v6" />
            </svg>
          </div>
          <h2>Your cart is taking a little break</h2>
          <p>Find something you love and it will show up here.</p>
          <Link to="/" className="btn btn--primary cart-empty-state__button">
            Explore products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            <div className="cart-items__header">
              <h2>Shopping bag</h2>
              <button type="button" className="cart-clear" onClick={clearCart}>
                Clear cart
              </button>
            </div>

            <div className="cart-items__list">
              {cart.map((item) => (
                <article className="cart-line" key={item.id}>
                  <div
                    className={`cart-line__art cart-line__art--${item.id % 4}`}
                    aria-hidden="true"
                  >
                    <span>{item.name.charAt(0)}</span>
                  </div>

                  <div className="cart-line__details">
                    <h3>{item.name}</h3>
                    <p className="cart-line__unit-price">{formatPrice(item.price)} each</p>
                    <button
                      type="button"
                      className="cart-line__remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart-line__quantity" aria-label={`Quantity for ${item.name}`}>
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.qty || 1}</span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-line__total">
                    {formatPrice(item.price * (item.qty || 1))}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <aside className="cart-summary" aria-labelledby="summary-title">
            <h2 id="summary-title">Order summary</h2>
            <div className="cart-summary__line">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-summary__line">
              <span>Shipping</span>
              <span className="cart-summary__free">Free</span>
            </div>
            <p className="cart-summary__note">Taxes calculated at checkout.</p>
            <div className="cart-summary__total">
              <span>Total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <Link to="/" className="cart-summary__button">
              Keep shopping
            </Link>
            <p className="cart-summary__secure">
              <span aria-hidden="true">✓</span> Free shipping on every order
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}

export default CartPage;
