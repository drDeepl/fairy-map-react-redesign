import { AuthControllerService, SignInRequestDto } from "@/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  user: null | JwtPayload;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

export const signIn = createAsyncThunk(
  "user/signin",
  async (signInDto: SignInRequestDto, thunkAPI) => {
    return await AuthControllerService.authControllerSignIn(signInDto);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const accessToken: string = action.payload.accessToken;
        const arrayToken = accessToken.split(".");
        const tokenPayload = JSON.parse(atob(arrayToken[1])) as JwtPayload;
        console.log(`token payload ${tokenPayload}`);
        state.user = tokenPayload;
        state.loading = false;
        state.success = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
