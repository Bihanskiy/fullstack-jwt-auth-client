const ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
};

export {
  ApiConfig,
};