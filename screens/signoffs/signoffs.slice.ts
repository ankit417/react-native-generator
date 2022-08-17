import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {signoffsService} from './signoffs.service';
import type {SignoffResponse} from './signoffs.service';

const getSignoffs = createAsyncThunk(
  'signoffs/getSignoffs',
  async (
    data: {
      jobId: number;
      // type: 'job' | 'site_visit' | 'time_entry';
    },
    thunkAPI,
  ) => {
    try {
      const job = await signoffsService.getSignoffs({
        jobId: data.jobId,
        type: 'job',
      });
      const site_visit = await signoffsService.getSignoffs({
        jobId: data.jobId,
        type: 'site_visit',
      });
      const time_entry = await signoffsService.getSignoffs({
        jobId: data.jobId,
        type: 'time_entry',
      });
      return {site_visit, job, time_entry};
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get signoffs!');
    }
  },
);

const initialState: {
  loading: boolean;
  data: {
    site_visit: SignoffResponse | null;
    job: SignoffResponse | null;
    time_entry: SignoffResponse | null;
  };
  success: boolean;
} = {
  loading: true,
  data: {
    site_visit: null,
    job: null,
    time_entry: null,
  },
  success: false,
};

const signoffsSlice = createSlice({
  name: 'signoffSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSignoffs.pending, state => {
      state.loading = true;
    });
    builder.addCase(getSignoffs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(getSignoffs.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = signoffsSlice.actions;
export {getSignoffs};
export default signoffsSlice.reducer;
