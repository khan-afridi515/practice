import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("saveStatus")));

  const {totalcart} = useContext(CartContext);

  const obj1 = {
    name : "Aziz",
    class : 8,
    RNo : 10
  }

  localStorage.setItem("saveStatus", JSON.stringify(isLoggedIn));

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('profile', obj1);
  };

  const handleLogout = () => {
   setIsLoggedIn(false);
   localStorage.removeItem('profile');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand" style={{ textDecoration: 'none', color: 'inherit' }}>
        E-Commerce
      </Link>

      <div className="navbar__actions">
        <Link to="/" className="navbar__link">Products</Link>
        <Link to="/cart" className="navbar__link navbar__cart-link">
          Cart <span className="navbar__cart-count">{totalcart}</span>
        </Link>
        {isLoggedIn ? (
          <>
            <span className="navbar__welcome">Welcome, {obj1.name}</span>
            <button type="button" className="btn btn--secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <span className="navbar__guest">Guest</span>
            <button type="button" className="btn btn--primary" onClick={handleLogin}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
//