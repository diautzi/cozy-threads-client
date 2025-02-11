import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ cart }) => {
  let totalItems = cart
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <nav className="navbar">
      {/* Left - Company Name */}
      <Link to="/" className="navbar-logo">
        Cozy Threads
      </Link>

      {/* Right - Shopping Cart */}
      <Link to="/cart" className="navbar-cart">
        <FaShoppingCart className="cart-icon" />
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </Link>
    </nav>
  );
};

export default Navbar;
