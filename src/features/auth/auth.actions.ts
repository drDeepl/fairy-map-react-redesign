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

      return response.data;
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);

      return rejectWithValue(errorResposne);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signup",
  async (signUpDto: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/api/auth/signup", signUpDto);
      console.log(response);
      return response.data;
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);

      return rejectWithValue(errorResposne);
    }
  }
);
