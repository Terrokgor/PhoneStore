export const getPhones = (params?: {
  search?: string;
  limit?: number;
  offset?: number;
}) => ({
  endpoint: "/products",
  params: { ...params },
});

export const getPhoneById = (id: string) => ({
  url: `/products/${id}`,
  method: "GET",
});
