import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useCart } from "../hooks/useCart";
import { getPhoneById, getPhones } from "../services/phoneApi";
import { SimilarCarousel } from "../components/SimilarCarousel";
import type { Phone, PhoneDetail } from "../types/phone";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const { callApi } = useApi();
  const { addToCart } = useCart();

  const [phone, setPhone] = useState<PhoneDetail | null>(null);
  const [similarPhones, setSimilarPhones] = useState<Phone[]>([]);
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(
    phone?.colorOptions[0]?.name || "",
  );
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [colorNamePreview, setColorNamePreview] = useState<string>("");
  useEffect(() => {
    if (!id) return;

    const fetchPhone = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await callApi<PhoneDetail>(getPhoneById(id));
        setPhone(res);
        setMainImageUrl(res.imageUrl);

        if (res.colorOptions.length > 0) {
          setMainImageUrl(res.colorOptions[0].imageUrl || res.imageUrl);
        }

        try {
          const allPhones = await callApi<Phone[]>(getPhones());
          setSimilarPhones(
            allPhones
              .filter((p) => p.brand === res.brand && p.id !== res.id)
              .slice(0, 8),
          );
        } catch {
          // ignore similar fetch failures
          setSimilarPhones([]);
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPhone();
  }, [id, callApi]);

  const selectedStorageOption = phone?.storageOptions.find(
    (s) => s.capacity === selectedStorage,
  );
  const totalPrice =
    phone && selectedStorageOption
      ? phone.basePrice + selectedStorageOption.price
      : 0;

  const handleAddToCart = () => {
    if (!phone || !selectedColor || !selectedStorage) return;

    addToCart({
      id: phone.id,
      name: phone.name,
      price: totalPrice,
      color: selectedColor,
      storage: selectedStorage,
      imageUrl: mainImageUrl || phone.imageUrl,
    });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!phone) return <p>Teléfono no encontrado</p>;

  return (
    <div className="detail-container">
      <Link to="/" className="back-btn">
        {"< Volver"}
      </Link>

      <div className="detail-grid">
        <div className="phone-image-wrapper">
          <img
            src={mainImageUrl || phone.imageUrl}
            alt={phone.name}
            className="phone-image"
          />
        </div>

        <div className="phone-info">
          <h1 className="phone-name">{phone.name}</h1>
          {
            <p className="phone-price">
              {totalPrice > 0 && totalPrice.toFixed(2) + "EUR"}{" "}
            </p>
          }
          <p>{phone.brand}</p>
          <p>{phone.description}</p>
          <div className="field">
            <h3 className="phone-storage-title">
              Almacenamiento. ¿Cuánto espacio necesitas?
            </h3>
            <div className="storage-options">
              {phone.storageOptions.map((storage) => (
                <button
                  key={storage.capacity}
                  onClick={() => setSelectedStorage(storage.capacity)}
                  className={
                    selectedStorage === storage.capacity ? "selected" : ""
                  }
                >
                  {storage.capacity}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <h3 className="phone-color-title">Color. Escoge tu favorito</h3>
            <div className="color-options">
              {phone.colorOptions.map((color) => (
                <button
                  key={color.name}
                  aria-label={color.name}
                  onClick={() => {
                    setSelectedColor(color.name);
                    setMainImageUrl(color.imageUrl || phone.imageUrl);
                  }}
                  onMouseEnter={() => {
                    setColorNamePreview(color.name);
                  }}
                  onMouseLeave={() => {
                    setColorNamePreview("");
                  }}
                  className={selectedColor === color.name ? "selected" : ""}
                  style={{ backgroundColor: color.hexCode }}
                />
              ))}
            </div>
            <div className="selected-color">
              {colorNamePreview ? colorNamePreview : selectedColor}{" "}
            </div>
          </div>
          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedStorage}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      <div className="spec-table-wrapper">
        <h2>Especificaciones</h2>
        <table className="spec-table">
          <tbody>
            <tr>
              <th>Marca</th>
              <td>{phone.brand}</td>
            </tr>
            <tr>
              <th>Modelo</th>
              <td>{phone.name}</td>
            </tr>
            <tr>
              <th>Descripción</th>
              <td>{phone.description}</td>
            </tr>
            <tr>
              <th>Precio base</th>
              <td>{phone.basePrice.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Almacenamiento</th>
              <td>{phone.storageOptions.map((s) => s.capacity).join(", ")}</td>
            </tr>
            <tr>
              <th>Colores</th>
              <td>{phone.colorOptions.map((c) => c.name).join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {similarPhones.length > 0 && (
        <div className="similar-products">
          <h2>Productos similares</h2>
          <SimilarCarousel phones={similarPhones} />
        </div>
      )}
    </div>
  );
}
