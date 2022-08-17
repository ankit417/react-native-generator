import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {incompleteService} from './incomplete.service';
import type {IncompleteEventResponse} from './incomplete.service';

const getInCompleteEvent = createAsyncThunk(
  'incomplete/getInCompleteEvent',
  async (_, thunkAPI) => {
    try {
      return await incompleteService.getInCompleteEvent();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState: {
  loading: boolean;
  data?: IncompleteEventResponse | null;
  success: boolean;
} = {
  loading: true,
  data: null,
  success: false,
};

const incompleteEventSlice = createSlice({
  name: 'incomplete',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getInCompleteEvent.pending, state => {
      state.loading = true;
    });
    builder.addCase(getInCompleteEvent.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(getInCompleteEvent.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = incompleteEventSlice.actions;
export {getInCompleteEvent};
export default incompleteEventSlice.reducer;
