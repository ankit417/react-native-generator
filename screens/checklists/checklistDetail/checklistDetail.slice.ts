import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {checklistsDetailService} from './checklistDetail.service';
import type {
  ChecklistDetailReponse,
  CheckUncheckChecklistRequest,
} from './checklistDetail.service';

const getChecklistDetail = createAsyncThunk(
  'checklistDetail/getChecklistDetail',
  async (
    data: {
      checklistId: number;
    },
    thunkAPI,
  ) => {
    try {
      return await checklistsDetailService.getChecklistDetail(data);
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get checklist detail!');
    }
  },
);

const checkUncheckChecklist = createAsyncThunk(
  'checklistDetail/checkUncheckChecklist',
  async (
    data: {
      checklistId: number;
      checklistItemId: number;
      body: CheckUncheckChecklistRequest;
    },
    thunkAPI,
  ) => {
    try {
      const response = await checklistsDetailService.checkUncheckChecklist(
        data,
      );
      await thunkAPI.dispatch(
        getChecklistDetail({checklistId: data.checklistId}),
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot update the checklist!');
    }
  },
);

const initialState: {
  loading: boolean;
  data: ChecklistDetailReponse | null;
  success: boolean;
} = {
  loading: true,
  data: null,
  success: false,
};

const checklistDetailSlice = createSlice({
  name: 'checklists',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getChecklistDetail.pending, state => {
      state.loading = true;
    });
    builder.addCase(getChecklistDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(getChecklistDetail.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = checklistDetailSlice.actions;
export {getChecklistDetail, checkUncheckChecklist};
export default checklistDetailSlice.reducer;
