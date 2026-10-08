import { products } from '../data/products.js';
import ProductCard from './ProductCard.jsx';

const ProductList = ({ depositMoney, customers, withDrawMoney }) => {
  return (
    <section className="product-list">
      <h2 className="section-title">Products</h2>

      <button
        type="button"
        onClick={() => depositMoney("Ali", 1400)}
        className="cursor-pointer"
      >
        Increase
      </button>

      <button
        type="button"
        onClick={() => withDrawMoney("Ali", 1400)}
        className="cursor-pointer"
      >
        Decrease
      </button>
      <ul>
        {customers.map((customer) => (
          <li key={customer.accountNo}>
            {customer.name}: {customer.balance}
          </li>
        ))}
      </ul>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
