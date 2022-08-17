import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {loginService} from './login.service';
import type {LoginRequest, LoginResponse} from './login.service';

const login = createAsyncThunk(
  'login/user',
  async (user: LoginRequest, thunkAPI) => {
    try {
      return await loginService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot login!');
    }
  },
);

const initialState: {
  loading: boolean;
  data?: LoginResponse | null;
  success: boolean;
} = {
  loading: false,
  data: null,
  success: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: state => {
      state.data = null;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(login.rejected, state => {
      state.loading = false;
    });
  },
});

export const {logout} = loginSlice.actions;
export {login};
export default loginSlice.reducer;
