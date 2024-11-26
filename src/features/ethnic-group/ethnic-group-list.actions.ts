import { ethnicGroupControllerEthnicGroups } from "@/api/client";
import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEthnicGroups = createAsyncThunk(
  "ethnicGroupList/fetchEthnicGroups",
  async (_, thunkApi) => {
    try {
      const ethhnicGroups = await ethnicGroupControllerEthnicGroups();
      console.log(ethhnicGroups);
      return thunkApi.fulfillWithValue(ethhnicGroups);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);
      return thunkApi.rejectWithValue(errorResposne as ApiErrorResponse);
    }
  }
);
