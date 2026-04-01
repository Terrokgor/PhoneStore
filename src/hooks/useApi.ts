const BASE_URL = "https://prueba-tecnica-api-tienda-moviles.onrender.com";
const API_KEY = "87909682e6cd74208f41a6ef39fe4191";

export function useApi() {
  async function callApi<T>(config: {
    endpoint: string;
    params?: { [key: string]: string | number };
  }): Promise<T> {
    const url = new URL(`${BASE_URL}${config.endpoint}`);

    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value.toString());
      });
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = (await res.json()) as T;
    return data;
  }
  return callApi;
}
