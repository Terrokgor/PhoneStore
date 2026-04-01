type ApiParams = Record<string, string | number | undefined>;

interface GetPhonesParams extends ApiParams {
  search?: string;
  limit?: number;
}

export function getPhones(params?: GetPhonesParams) {
  return {
    method: "GET" as const,
    endpoint: "/products",
    params,
  };
}

export function getPhoneById(id: string) {
  return {
    method: "GET" as const,
    endpoint: `/products/${id}`,
  };
}
