import { memo } from "react";
import type { CartItem } from "../context/CartContext";

interface CartCardProps {
  item: CartItem;
  index: number;
  onRemove: (index: number) => void;
}

export const CartCard = memo(({ item, index, onRemove }: CartCardProps) => {
  return (
    <article className="cart-card">
      <img src={item.imageUrl} alt={item.name} className="cart-card-image" />
      <div className="cart-card-details">
        <h2>{item.name}</h2>
        <p>{item.storage} | {item.color}</p>
        <p className="cart-price">{item.price.toFixed(2)} EUR</p>
        <button className="cart-remove" onClick={() => onRemove(index)}>
          Eliminar
        </button>
      </div>
    </article>
  );
});
