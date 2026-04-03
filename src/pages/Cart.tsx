import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { CartCard } from "../components/CartCard";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart: removeFromCartContext } = useCart();

  const removeFromCart = useCallback(
    (index: number) => {
      removeFromCartContext(index);
    },
    [removeFromCartContext],
  );

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>CART ({cart.length})</h1>
      </header>

      {cart.length === 0 ? (
        <p className="empty-cart">El carrito está vacío</p>
      ) : (
        <>
          <section className="cart-list">
            {cart.map((item, index) => (
              <CartCard key={index} item={item} index={index} onRemove={removeFromCart} />
            ))}
          </section>

          <footer className="cart-footer">
            <Link to="/" className="btn-light">Continuar comprando</Link>
            <div className="cart-summary">
              <span>TOTAL</span>
              <strong>{total.toFixed(2)} EUR</strong>
            </div>
            <button className="btn-primary">PAY</button>
          </footer>
        </>
      )}
    </div>
  );
}
