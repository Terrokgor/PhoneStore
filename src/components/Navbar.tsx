import { Link } from "react-router-dom";

import { useCart } from "../hooks/useCart";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        📱 PhoneStore
      </Link>

      <Link to="/cart" style={styles.cart}>
        🛒 {cart.length}
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
