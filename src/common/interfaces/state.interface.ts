import { ApiErrorResponse } from "@/api/helpers/handler-response";

export interface BaseAppState {
  loading: boolean;
  error?: ApiErrorResponse;
  success: boolean;
}
