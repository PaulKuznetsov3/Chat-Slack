/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'chennelsInfo/setInitialState',
  async (authHeader) => {
    try {
      const response = await axios.get(routes.dataPath(), { headers: authHeader });
      return response.data;
    } catch (err) {
      console.log('err', err);
      return err;
    }
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
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
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        channelsAdapter.addMany(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
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
