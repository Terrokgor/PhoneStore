import { Link } from "react-router-dom";

import { useCart } from "../hooks/useCart";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <img src="/src/assets/logo.svg" alt="PhoneStore logo" className="logo-image" />
      </Link>

      <Link to="/cart" style={styles.cart}>
        <img src="/src/assets/bag-icon.svg" alt="Cart" className="cart-icon" />
        {cart.length}
      </Link>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    textDecoration: "none",
    fontWeight: "bold",
  },
  cart: {
    textDecoration: "none",
  },
};
