import { AxiosResponse, isAxiosError } from 'axios';

export const requestHandler = async (request: Promise<AxiosResponse<any>>) => {
  try {
    const response = await request;

    return {
      data: response.data
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: error.message,
      }
    } else {
      return {
        error: "An unexpected error occurred",
      }
    }
  }
}