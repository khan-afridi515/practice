import { products } from '../data/products.js';
import ProductCard from './ProductCard.jsx';

const ProductList = () => {
  return (
    <section className="product-list">
      <h2 className="section-title">Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
