import OpenAPIClientAxios, {
  AxiosRequestConfig,
  AxiosResponse,
} from "openapi-client-axios";
import { Client } from "./schemas/client";
import { getTokenLocalStorage } from "@/common/helpers/token.helper";
const api = new OpenAPIClientAxios({
  definition: "https://fairy-map-nest.onrender.com/api/v1-json",
});

api.init<Client>();

const apiClient = await api.getClient<Client>();

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken: string | null = getTokenLocalStorage();
    config.headers["authorization"] = accessToken
      ? `Bearer ${accessToken}`
      : "";
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default apiClient;
