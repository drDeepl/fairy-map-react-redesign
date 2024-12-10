import { Components } from "@/api/schemas/client";
import { BaseAppState } from "@/common/interfaces/state.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEthnicGroups } from "./ethnic-group-list.actions";
import { ApiErrorResponse } from "@/api/helpers/handler-response";

export interface EthnicGroupListState extends BaseAppState {
  ethnicGroups: Components.Schemas.EthnicGroupLanguageDto[];
}

const initialState: EthnicGroupListState = {
  loading: false,
  error: undefined,
  success: false,
  ethnicGroups: [],
};

const ethnicGroupListSlice = createSlice({
  name: "ethnicGroupList",
  initialState,
  reducers: {
    addEthnicGroup: (
      state: EthnicGroupListState,
      action: PayloadAction<Components.Schemas.EthnicGroupLanguageDto>
    ) => {
      state.ethnicGroups.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEthnicGroups.pending, (state: EthnicGroupListState) => {
        state.loading = true;
        state.error = undefined;
        state.success = false;
      })
      .addCase(
        fetchEthnicGroups.fulfilled,
        (
          state: EthnicGroupListState,
          action: PayloadAction<Components.Schemas.EthnicGroupLanguageDto[]>
        ) => {
          state.loading = false;
          state.ethnicGroups = action.payload;
          state.success = true;
        }
      )
      .addCase(
        fetchEthnicGroups.rejected,
        (state: EthnicGroupListState, action) => {
          state.loading = false;
          state.error = action.payload as ApiErrorResponse;
          state.success = false;
        }
      );
  },
});

export const { addEthnicGroup } = ethnicGroupListSlice.actions;

export default ethnicGroupListSlice.reducer;
