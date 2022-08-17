import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
  CreateTimeEntryRequest,
  CreateTimeEntryResponse,
  timerService,
} from './timer.service';
import type {CreateTimerRequest, CreateTimerResponse} from './timer.service';
import {getEventDetail} from '../../eventDetail.slice';

const createTimer = createAsyncThunk(
  'timer/createTimer',
  async (data: CreateTimerRequest, thunkAPI) => {
    try {
      const response = await timerService.createTimer(data);
      await thunkAPI.dispatch(
        getEventDetail({eventId: data.eventId, employeeId: data.startedBy}),
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue('Cannot create timer');
    }
  },
);

const deleteTimer = createAsyncThunk(
  'timer/deleteTimer',
  async (
    {
      timerId,
      onSuccess,
    }: {
      timerId: number;
      onSuccess: () => void;
    },
    thunkAPI,
  ) => {
    try {
      const response = await timerService.deleteTimer(timerId);
      onSuccess();
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue('Cannot delete timer');
    }
  },
);

const createTimeEntry = createAsyncThunk(
  'timer/createTimeEntry',
  async (
    {data, onSuccess}: {data: CreateTimeEntryRequest; onSuccess: () => void},
    thunkAPI,
  ) => {
    try {
      const response = await timerService.createTimeEntry(data);
      onSuccess();
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue('Cannot create time entry');
    }
  },
);

const initialState: {
  loading: boolean;
  success: boolean;
  data: CreateTimerResponse | null;

  createTimeEntryLoading: boolean;
  createTimeEntrySuccess: boolean;
  createTimeEntryData: CreateTimeEntryResponse | null;
} = {
  loading: false,
  success: false,
  data: null,

  createTimeEntryLoading: false,
  createTimeEntrySuccess: false,
  createTimeEntryData: null,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createTimer.pending, state => {
      state.loading = true;
    });
    builder.addCase(createTimer.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(createTimer.rejected, state => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(deleteTimer.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteTimer.fulfilled, state => {
      state.loading = false;
      state.success = true;
      state.data = null;
    });
    builder.addCase(deleteTimer.rejected, state => {
      state.loading = false;
    });
    builder.addCase(createTimeEntry.pending, state => {
      state.createTimeEntryLoading = true;
    });
    builder.addCase(createTimeEntry.fulfilled, (state, action) => {
      state.createTimeEntryLoading = false;
      state.createTimeEntrySuccess = true;
      state.createTimeEntryData = action.payload;
    });
    builder.addCase(createTimeEntry.rejected, state => {
      state.createTimeEntryLoading = false;
    });
  },
});

export const {} = timerSlice.actions;
export {createTimer, deleteTimer, createTimeEntry};
export default timerSlice.reducer;
