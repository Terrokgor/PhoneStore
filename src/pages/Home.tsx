import { useEffect, useState } from "react";
import { getPhones } from "../services/phoneApi";
import type { Phone } from "../types/phone";
import { useApi } from "../hooks/useApi";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {
  const callApi = useApi();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [phoneList, setPhoneList] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    callApi<Phone[]>(getPhones({ search: debouncedSearch }))
      .then((res) => {
        setPhoneList(res);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por nombre o marca..."
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />

      {loading && <p>Cargando...</p>}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

      <p>{phoneList.length} resultados encontrados</p>

      <div style={gridStyle}>
        {phoneList.map((phone: Phone) => (
          <div key={phone.id + "_" + crypto.randomUUID()} style={cardStyle}>
            <img
              src={phone.imageUrl}
              alt={phone.name}
              style={{ width: "100%" }}
            />
            <h3>{phone.name}</h3>
            <p>{phone.brand}</p>
            <p>${phone.basePrice.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "1rem",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "4px",
  padding: "0.5rem",
};
