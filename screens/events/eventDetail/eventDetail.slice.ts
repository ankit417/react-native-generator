import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {eventDetailService} from './eventDetail.service';
import type {EventDetailResponse} from './eventDetail.service';

const getEventDetail = createAsyncThunk(
  'eventDetail/getEventDetail',
  async (data: {eventId: number; employeeId: number}, thunkAPI) => {
    try {
      return await eventDetailService.getEventDetail(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get Event detail!');
    }
  },
);

const initialState: {
  loading: boolean;
  data: EventDetailResponse | null;
  success: boolean;
} = {
  loading: true,
  data: null,
  success: false,
};

const eventDetailSlice = createSlice({
  name: 'eventDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getEventDetail.pending, state => {
      state.loading = true;
    });
    builder.addCase(getEventDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(getEventDetail.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = eventDetailSlice.actions;
export {getEventDetail};
export default eventDetailSlice.reducer;
