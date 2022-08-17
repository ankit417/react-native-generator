const capitalize = require("../utils/capitalize");

exports.sliceBoilerplate = (fileName) => {
  const name = capitalize(fileName);

  return `import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {${fileName}Service} from './${fileName}.service';
import type {${name}Reponse} from './${fileName}.service';

const get${name} = createAsyncThunk(
  '${fileName}/get${name}',
  async (
    data: {
      id: number;
    },
    thunkAPI,
  ) => {
    try {
      return await ${fileName}Service.get${name}(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get ${fileName}}!');
    }
  },
);

const initialState: {
  loading: boolean;
  data: ${name}Reponse | null;
  success: boolean;
} = {
  loading: true,
  data: null,
  success: false,
};

const ${fileName}Slice = createSlice({
  name: '${fileName}Slice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(get${name}.pending, state => {
      state.loading = true;
    });
    builder.addCase(get${name}.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(get${name}.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = ${fileName}Slice.actions;
export {get${name}};
export default ${fileName}Slice.reducer;
  `;
};
