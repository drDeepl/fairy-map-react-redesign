import OpenAPIClientAxios from "openapi-client-axios";
import { Client } from "./client";
const api = new OpenAPIClientAxios({
  definition: "https://fairy-map-nest.onrender.com/api/v1-json",
});

api.init<Client>();

const apiClient = await api.getClient<Client>();

export default apiClient;
