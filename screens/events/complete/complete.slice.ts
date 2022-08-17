import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {completeService} from './complete.service';
import type {CompletedUserEventsResponse} from './complete.service';

const getCompletedUserEvents = createAsyncThunk(
  'complete/getCompletedUserEvents',
  async (_, thunkAPI) => {
    try {
      return await completeService.getCompletedUserEvents();
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get completed Events!');
    }
  },
);

const initialState: {
  loading: boolean;
  data?: CompletedUserEventsResponse | null;
  success: boolean;
} = {
  loading: true,
  data: null,
  success: false,
};

const getCompletedUserEventsSlice = createSlice({
  name: 'complete',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCompletedUserEvents.pending, state => {
      state.loading = true;
    });
    builder.addCase(getCompletedUserEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(getCompletedUserEvents.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = getCompletedUserEventsSlice.actions;
export {getCompletedUserEvents};
export default getCompletedUserEventsSlice.reducer;
