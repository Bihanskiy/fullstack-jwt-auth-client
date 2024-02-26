import * as api from "./requests";
import { useQuery } from "@tanstack/react-query";
import { hasCookie } from "cookies-next";

export const useUserDataQuery = () => {

  return useQuery({
    queryKey: ['user'],
    queryFn: () => api.getUserData(),
    enabled: hasCookie("token"),
    retry: 2
  })
}
