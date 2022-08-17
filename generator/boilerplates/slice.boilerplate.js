exports.sliceBoilerplate = (fileName) => {
  return `import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {${fileName}Service} from './${fileName}.service';
import type {${fileName}Reponse} from './${fileName}.service';

const get${fileName} = createAsyncThunk(
  '${fileName}/get${fileName}',
  async (
    data: {
      id: number;
    },
    thunkAPI,
  ) => {
    try {
      return await ${fileName}Service.get${fileName}(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get ${fileName}}!');
    }
  },
);

const initialState: {
  loading: boolean;
  data: ${fileName}Reponse | null;
  success: boolean;
} = {
  loading: true,
  data: null,
  success: false,
};

const ${fileName}Slice = createSlice({
  name: '${fileName}',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(get${fileName}.pending, state => {
      state.loading = true;
    });
    builder.addCase(get${fileName}.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(get${fileName}.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = ${fileName}Slice.actions;
export {get${fileName}};
export default ${fileName}Slice.reducer;
  `;
};
