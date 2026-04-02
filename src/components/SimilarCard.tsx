import { memo } from "react";
import { Link } from "react-router-dom";
import type { Phone } from "../types/phone";

interface SimilarCardProps {
  phone: Phone;
}

export const SimilarCard = memo(({ phone }: SimilarCardProps) => {
  return (
    <Link to={`/phone/${phone.id}`} className="similar-card">
      <div className="similar-card-image-area">
        <img src={phone.imageUrl} alt={phone.name} />
      </div>
      <div className="similar-card-row">
        <div>
          <div className="similar-card-brand">{phone.brand}</div>
          <div className="similar-card-model">{phone.name}</div>
        </div>
        <div className="similar-card-price">{phone.basePrice.toFixed(0)} EUR</div>
      </div>
    </Link>
  );
});
