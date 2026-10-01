import { useContext } from "react";
import { CartContext } from "../context/CartContext";


const ProductCard = ({ product }) => {

  const { addToCart } = useContext(CartContext);

  return (
    <article className="product-card">
      <div className="product-card__image" aria-hidden="true">
        {product.name.charAt(0)}
      </div>

      <div className="product-card__content">
        <h3>{product.name}</h3>
        <p className="product-card__price">${product.price}</p>
        <button type="button" className="btn btn--primary" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
