/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsInfoActions } from './сhannelsInfo';

const initialState = {
  messages: [],
};

const slice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    console.log(channelsInfoActions);
    builder
      .addCase(channelsInfoActions.fetchData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
