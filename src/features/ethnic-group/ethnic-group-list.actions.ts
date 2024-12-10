import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";

import apiClient from "@/api/apiClient";

export const fetchEthnicGroups = createAsyncThunk(
  "ethnicGroupList/fetchEthnicGroups",
  async (_, thunkApi) => {
    try {
      const res = await apiClient.EthnicGroupController_ethnicGroups();
      return res.data;
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);
      return thunkApi.rejectWithValue(errorResposne as ApiErrorResponse);
    }
  }
);
