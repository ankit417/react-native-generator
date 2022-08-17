import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {checklistsService} from './checklists.service';
import type {ChecklistReponse} from './checklists.service';

const getChecklists = createAsyncThunk(
  'checklists/getChecklists',
  async (
    data: {
      jobId: number;
      siteVisitId: number;
    },
    thunkAPI,
  ) => {
    try {
      return await checklistsService.getChecklists(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get checklists!');
    }
  },
);

const initialState: {
  loading: boolean;
  data: ChecklistReponse | null;
  success: boolean;
} = {
  loading: true,
  data: null,
  success: false,
};

const checklistsSlice = createSlice({
  name: 'checklists',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getChecklists.pending, state => {
      state.loading = true;
    });
    builder.addCase(getChecklists.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(getChecklists.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = checklistsSlice.actions;
export {getChecklists};
export default checklistsSlice.reducer;
