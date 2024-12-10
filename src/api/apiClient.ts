import OpenAPIClientAxios, { AxiosResponse } from "openapi-client-axios";
import { Client } from "./schemas/client";
import { getTokenLocalStorage } from "@/common/helpers/token.helper";
import { InternalAxiosRequestConfig } from "axios";

async function initApiClient() {
  const api = new OpenAPIClientAxios({
    definition: `${import.meta.env.VITE_API_URL}api/v1-json`,
  });

  await api.init<Client>();
  const apiClient = await api.getClient<Client>();

  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken: string | null = getTokenLocalStorage();
      config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
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
      console.error("interceptors error", error);
      return Promise.reject(error);
    }
  );

  return apiClient;
}

const apiClient = await initApiClient();

export default apiClient;
