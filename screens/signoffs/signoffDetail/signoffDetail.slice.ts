import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {signoffDetailService} from './signoffDetail.service';
import type {SignoffDetailResponse} from './signoffDetail.service';

const getSignoffDetail = createAsyncThunk(
  'signOffDetail/getSignoffDetail',
  async (
    data: {signOffId: number; type: 'job' | 'site_visit' | 'time_entry'},
    thunkAPI,
  ) => {
    try {
      return await signoffDetailService.getSignOffDetail(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get Event detail!');
    }
  },
);

const initialState: {
  loading: boolean;
  data: SignoffDetailResponse | null;
  success: boolean;
} = {
  loading: true,
  data: null,
  success: false,
};

const getSignoffDetailSlice = createSlice({
  name: 'signoffDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSignoffDetail.pending, state => {
      state.loading = true;
    });
    builder.addCase(getSignoffDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(getSignoffDetail.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = getSignoffDetailSlice.actions;
export {getSignoffDetail};
export default getSignoffDetailSlice.reducer;
