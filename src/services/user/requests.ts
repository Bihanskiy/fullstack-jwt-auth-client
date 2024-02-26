import { AxiosResponse, AxiosRequestConfig } from "axios";
import { basePrivateAPI } from "@/api/api";
import { User } from "@/models/user";

export const getUserData = (headers?: AxiosRequestConfig['headers']): Promise<AxiosResponse<User>> => {
  return basePrivateAPI.get<User>('/api/user', { headers })
}