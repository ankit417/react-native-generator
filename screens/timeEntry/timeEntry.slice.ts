import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {timeEntryService, UpdateTimeEntryRequest} from './timeEntry.service';
import type {TimeEntryResponse} from './timeEntry.service';

const getTimeEntries = createAsyncThunk(
  'timeEntry/getTimeEntries',
  async (
    data: {
      siteVisitId: number;
    },
    thunkAPI,
  ) => {
    try {
      return await timeEntryService.getTimeEntries(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get time entries!');
    }
  },
);

const updateTimeEntry = createAsyncThunk(
  'timeEntry/updateTimeEntry',
  async (
    {
      body,
      siteVisitId,
      timeEntryId,
      onSuccess,
    }: {
      siteVisitId: number;
      timeEntryId: number;
      body: UpdateTimeEntryRequest;
      onSuccess: () => void;
    },
    thunkAPI,
  ) => {
    try {
      const response = await timeEntryService.updateTimeEntry({
        timeEntryId,
        body,
      });
      await thunkAPI.dispatch(getTimeEntries({siteVisitId}));
      onSuccess();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot update time entry!');
    }
  },
);

const initialState: {
  loading: boolean;
  data: TimeEntryResponse | null;
  success: boolean;
} = {
  loading: true,
  data: null,
  success: false,
};

const timeEntrySlice = createSlice({
  name: 'timeEntry',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTimeEntries.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTimeEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(getTimeEntries.rejected, state => {
      state.loading = false;
      state.success = false;
    });
  },
});

export const {} = timeEntrySlice.actions;
export {getTimeEntries, updateTimeEntry};
export default timeEntrySlice.reducer;
