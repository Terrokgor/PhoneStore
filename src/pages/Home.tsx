import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { getPhones } from "../services/phoneApi";
import { useDebounce } from "../hooks/useDebounce";
import PhoneCard from "../components/PhoneCard";
import type { Phone } from "../types/phone";

export default function Home() {
  const { callApi } = useApi();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [phoneList, setPhoneList] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhones = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await callApi<Phone[]>(
          getPhones({ search: debouncedSearch, limit: 20 }),
        );
        setPhoneList(res);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, [debouncedSearch, callApi]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por nombre o marca..."
        className="search-input"
      />

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>{phoneList.length} resultados encontrados</p>

      <div className="phone-grid">
        {phoneList.map((phone) => (
          <PhoneCard key={phone.id + "_" + crypto.randomUUID()} phone={phone} />
        ))}
      </div>
    </div>
  );
}


