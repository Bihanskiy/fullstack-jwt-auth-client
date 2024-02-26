import * as api from "./requests";
import { useMutation } from "@tanstack/react-query";

export const useRegisterQuery = () => {
  return useMutation({
    mutationFn: (
      {
        email,
        password,
      }:
        {
          email: string,
          password: string
        }
    ) => api.register(
      email,
      password,
    )
  })
}

export const useLoginQuery = () => {
  return useMutation({
    mutationFn: (
      {
        email,
        password,
      }:
        {
          email: string,
          password: string
        }
    ) => api.login(
      email,
      password,
    )
  })
}

export const useLogoutQuery = () => {
  return useMutation({
    mutationFn: () => api.logout(),
  })
}