import OpenAPIClientAxios, { AxiosResponse } from "openapi-client-axios";
import { Client } from "./schemas/client";
import { getTokenLocalStorage } from "@/common/helpers/token.helper";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

async function initApiClient() {
  const api = new OpenAPIClientAxios({
    definition: `${import.meta.env.VITE_API_URL}api/v1-json`,
  });

  console.log(`${import.meta.env.VITE_API_URL}api/v1-json`);
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
    async (error: AxiosError) => {
      const originalRequest: InternalAxiosRequestConfig = error.config!;

      console.error("interceptors error", error);

      if (error.status === 401 && !originalRequest?.headers["X-Retry"]) {
        originalRequest.headers["X-Retry"] = "true";

        const tokenResponse = await apiClient.AuthController_refresh();
        localStorage.setItem("accessToken", tokenResponse.data.accessToken);

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${tokenResponse.data.accessToken}`;

        return apiClient(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
}

const apiClient = await initApiClient();

export default apiClient;
