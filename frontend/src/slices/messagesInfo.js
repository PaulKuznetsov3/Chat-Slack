/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsInfoActions } from './сhannelsInfo';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const slice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsInfoActions.fetchData.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      })
      .addCase(channelsInfoActions.removeChannel, (state, { payload }) => {
        const chennelId = payload;
        const messages = Object.values(state.entities).filter((e) => e.id !== chennelId);
        messagesAdapter.setAll(state, messages);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messagesInfo);
export const { actions } = slice;
export default slice.reducer;
