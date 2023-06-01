/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'chennelsInfo/setInitialState',
  async (authHeader) => {
    const response = await axios.get(routes.dataPath(), { headers: authHeader });
    console.log('res', response.data);
    return response.data;
  },
);

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    selectChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        console.log(payload.channels);
        state.channels = payload.channels;
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

const actions = {
  ...channelsSlice.actions,
  fetchData,
};
export { actions, fetchData };
export default channelsSlice.reducer;
