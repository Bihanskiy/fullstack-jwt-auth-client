import { AxiosResponse } from "axios";
import { baseAPI } from "@/api/api";
import { User } from "@/models/user";

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const register = (
  email: string,
  password: string,
):
  Promise<AxiosResponse<AuthResponse>> => {
  return baseAPI.post<AuthResponse>('/api/registration', {
    email,
    password,
  }
  )
}

export const login = (
  email: string,
  password: string,
):
  Promise<AxiosResponse<AuthResponse>> => {
  return baseAPI.post<AuthResponse>('/api/login', {
    email,
    password,
  }
  )
}

export const refreshToken = ()
  : Promise<AxiosResponse<{ access: string }>> => {
  return baseAPI.get<{ access: string }>('/api/refresh')
}

export const logout = ()
  : Promise<AxiosResponse<any>> => {
  return baseAPI.post<any>('/api/logout')
}