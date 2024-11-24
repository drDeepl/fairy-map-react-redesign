import {
  authControllerSignIn,
  authControllerSignUp,
  Components,
} from "@/api/client";
import {
  ApiErrorResponse,
  handleApiErrorResponse,
} from "@/api/helpers/handler-response";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signIn = createAsyncThunk(
  "user/signin",
  async (
    signInDto: Components.Schemas.SignInRequestDto,
    { rejectWithValue }
  ) => {
    try {
      return await authControllerSignIn(null, signInDto);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);

      return rejectWithValue(errorResposne);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signup",
  async (
    signUpDto: Components.Schemas.SignUpRequestDto,
    { rejectWithValue }
  ) => {
    try {
      return await authControllerSignUp(null, signUpDto);
    } catch (err) {
      const errorResposne: ApiErrorResponse = handleApiErrorResponse(err);

      return rejectWithValue(errorResposne);
    }
  }
);
