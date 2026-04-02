import React from "react";
import { Link } from "react-router-dom";
import type { Phone } from "../types/phone";

interface PhoneCardProps {
  phone: Phone;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  return (
    <Link key={phone.id + "_" + crypto.randomUUID()} to={`/phone/${phone.id}`} className="phone-card">
      <div className="phone-card-image-area">
        <img src={phone.imageUrl} alt={phone.name} />
      </div>
      <div className="phone-card-row">
        <div>
          <div className="phone-card-brand">{phone.brand}</div>
          <div className="phone-card-model">{phone.name}</div>
        </div>
        <div className="phone-card-price">{phone.basePrice.toFixed(0)} EUR</div>
      </div>
    </Link>
  );
};

export default React.memo(PhoneCard);