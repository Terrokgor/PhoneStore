const BASE_URL = "https://prueba-tecnica-api-tienda-moviles.onrender.com";
const API_KEY = "87909682e6cd74208f41a6ef39fe4191";

import { useCallback } from "react";

interface ApiConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  params?: Record<string, string | number | undefined>;
  body?: unknown;
}

export function useApi() {
  const callApi = useCallback(async function <T>(
    config: ApiConfig,
  ): Promise<T> {
    const method = config.method || "GET";
    const url = new URL(`${BASE_URL}${config.endpoint}`);

    if (config.params && method === "GET") {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const headers: Record<string, string> = {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    };

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (config.body && (method === "POST" || method === "PUT")) {
      fetchOptions.body = JSON.stringify(config.body);
    }

    try {
      const res = await fetch(url.toString(), fetchOptions);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorText}`);
      }

      const data = await res.json();
      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred");
    }
  }, []);

  return { callApi };
}
