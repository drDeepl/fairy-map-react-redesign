import OpenAPIClientAxios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from "openapi-client-axios";
import type { Client } from "./schemas/client";
// import type {
//   AxiosInstance,
//   AxiosError,
//   InternalAxiosRequestConfig,
//   AxiosResponse,
// } from "axios";
import { tokenService } from "../services/token.service";

let refreshPromise: Promise<string> | null = null;

function createOpenAPIClient(): Promise<AxiosInstance & Client> {
  const api = new OpenAPIClientAxios({
    definition: `${import.meta.env.VITE_API_URL}api/v1-json`,
    axiosConfigDefaults: {
      baseURL: import.meta.env.VITE_API_URL,
    },
  });
  return api.init<Client>();
}

function addAuthInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config: any) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

function addRefreshInterceptor(client: AxiosInstance & Client) {
  client.interceptors.response.use(
    (res: AxiosResponse) => res,
    async (error: AxiosError) => {
      const originalReq = error.config as any;
      if (error.response?.status === 401 && !originalReq.headers?.["X-Retry"]) {
        originalReq.headers = originalReq.headers || {};
        originalReq.headers["X-Retry"] = "true";

        if (!refreshPromise) {
          refreshPromise = client
            .AuthController_refresh()
            .then((res: any) => {
              const newToken = res.data.accessToken;
              tokenService.setAccessToken(newToken);
              return newToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const freshToken = await refreshPromise;
        originalReq.headers["Authorization"] = `Bearer ${freshToken}`;
        return client.request(originalReq);
      }
      return Promise.reject(error);
    }
  );
}

let apiClient: (AxiosInstance & Client) | null = null;

export async function initApiClient(): Promise<AxiosInstance & Client> {
  if (apiClient) {
    return apiClient;
  }
  const client = await createOpenAPIClient();
  addAuthInterceptor(client);
  addRefreshInterceptor(client);
  apiClient = client;
  return apiClient;
}

const client = await initApiClient();
export default client;
