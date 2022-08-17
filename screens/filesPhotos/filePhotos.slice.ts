import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {filePhotoService} from './filePhotos.service';
import type {FilePhotosResponse} from './filePhotos.service';

const postFilePhotos = createAsyncThunk(
  'filePhotos/postFilePhotos',
  async (data: {jobId: number; data: FormData}, thunkAPI) => {
    try {
      return await filePhotoService.postFilePhotos(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('cannot post file photos');
    }
  },
);

const initialState: {
  loading: boolean;
  data?: FilePhotosResponse | null;
  success: boolean;
} = {
  loading: false,
  data: null,
  success: false,
};

const postFilePhotoSlice = createSlice({
  name: 'filePhoto',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postFilePhotos.pending, state => {
      state.loading = true;
    });
    builder.addCase(postFilePhotos.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(postFilePhotos.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = postFilePhotoSlice.actions;
export {postFilePhotos};
export default postFilePhotoSlice.reducer;
