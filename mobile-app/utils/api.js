import axios from "axios";
import { getSessionToken, getXsrfToken } from "./tokenManager";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});
//192.168.1.44:8080/api/v1


//192.168.19.238:8080/api/v1

http: api.interceptors.request.use(
  async (originalConfig) => {
    const config = { ...originalConfig };

    const token = await getSessionToken();
    if (token) {
      config.headers.Authorization = token;
    }

    // const xsrfToken = await getXsrfToken();
    // config.headers["X-XSRF-TOKEN"] = xsrfToken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
