import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Components } from "@/api/schemas/client";
import apiClient from "@/api/apiClient";

export const signIn = createAsyncThunk(
  "user/signin",
  async (signInDto: Components.Schemas.SignInRequestDto, thunkApi) => {
    try {
      const res = await apiClient.AuthController_signIn(null, signInDto);
      return thunkApi.fulfillWithValue(res.data);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);
      return thunkApi.rejectWithValue(errorResposne);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signup",
  async (signUpDto: Components.Schemas.SignUpRequestDto, thunkApi) => {
    try {
      const res = await apiClient.AuthController_signUp(null, signUpDto);
      return thunkApi.fulfillWithValue(res.data);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);
      return thunkApi.rejectWithValue(errorResposne);
    }
  }
);
