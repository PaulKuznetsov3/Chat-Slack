/* eslint-disable no-param-reassign */

import {
  createSlice, createEntityAdapter, createAsyncThunk, miniSerializeError,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'chennelsInfo/setInitialState',
  async (authHeader, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.dataPath(), { headers: authHeader });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      if (error.isAxiosError) {
        return rejectWithValue('AxiosError');
      }
      return rejectWithValue(miniSerializeError(error));
    }
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null, loadingStatus: 'idle', error: null,
});
const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    updateChannel: channelsAdapter.setOne,
    selectChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeChannel: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        channelsAdapter.addMany(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      })
      .addCase(fetchData.rejected, (state, { payload }) => {
        state.loadingStatus = 'failed';
        state.error = payload;
      });
  },
});

const actions = {
  ...channelsSlice.actions,
  fetchData,
};
export const stateCurrentChannelId = (state) => state.channels.currentChannelId;
export const selectors = channelsAdapter.getSelectors((state) => state.channelsInfo);
export { actions, fetchData };
export default channelsSlice.reducer;
