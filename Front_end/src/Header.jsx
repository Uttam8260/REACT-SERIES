import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Header.css";
import logo from "./assets/logo.avif";

const Header = () => {
  const { cart } = useCart();
  const pathname = window.location.pathname;

  // Pages to show cart icon
  const showCartIconPaths = [
    "/dashboard",
    "/cart",
    "/cart-payment",
    "/product",
  ];

  const shouldShowCartIcon = showCartIconPaths.some(path => pathname.startsWith(path));

  return (
    <header className="header">
      <img src={logo} alt="Mallareddy University Logo" className="logo" />
      <h1 className="header-title">Mallareddy University</h1>

      {showCartIconPaths.some(path => pathname.includes(path)) && (
        <div className="header-cart-icon">
          <Link to="/cart">
            🛒<span className="cart-count">{cart.length}</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

