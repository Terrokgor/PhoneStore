import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

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
              <article key={index} className="cart-card">
                <img src={item.imageUrl} alt={item.name} className="cart-card-image" />
                <div className="cart-card-details">
                  <h2>{item.name}</h2>
                  <p>{item.storage} | {item.color}</p>
                  <p className="cart-price">{item.price.toFixed(2)} EUR</p>
                  <button className="cart-remove" onClick={() => removeFromCart(index)}>
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </section>

          <footer className="cart-footer">
            <Link to="/" className="btn-light">CONTINUE SHOPPING</Link>
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
