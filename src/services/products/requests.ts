import { AxiosResponse } from "axios";
import { baseAPI } from "@/api/api";
import { Product } from "@/models/product";

export const getProducts = (): Promise<AxiosResponse<Product[]>> => {
  return baseAPI.get<Product[]>('/api/products')
}