import apiClient from "@/api/apiClient";
import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signIn = createAsyncThunk(
  "user/signin",
  async (signInDto: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/api/auth/signin", signInDto);
      console.log(response);
      return response;
    } catch (err: any) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);

      return rejectWithValue(errorResposne);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signup",
  async (signUp: any, thunkAPI) => {
    console.log(signUp);
  }
);
