import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {addSignoffService} from './addSignoff.service';
import type {AddSignoffResponse} from './addSignoff.service';

const addSignoff = createAsyncThunk(
  'signOff/addSignoff',
  async (data: FormData, thunkAPI) => {
    try {
      return await addSignoffService.addSignOff(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot add signoff!');
    }
  },
);

const initialState: {
  loading: boolean;
  data: AddSignoffResponse | null;
  success: boolean;
} = {
  loading: true,
  data: null,
  success: false,
};

const addSignoffSlice = createSlice({
  name: 'addSignoff',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addSignoff.pending, state => {
      state.loading = true;
    });
    builder.addCase(addSignoff.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(addSignoff.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = addSignoffSlice.actions;
export {addSignoff};
export default addSignoffSlice.reducer;
