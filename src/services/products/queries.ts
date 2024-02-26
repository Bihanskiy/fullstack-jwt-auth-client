import * as api from "./requests";
import { useQuery } from "@tanstack/react-query";

export const useProductsDataQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.getProducts(),
  })
}
