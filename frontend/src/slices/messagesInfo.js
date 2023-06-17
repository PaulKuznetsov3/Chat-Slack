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
    console.log(channelsInfoActions);
    builder
      .addCase(channelsInfoActions.fetchData.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messagesInfo);
export const { actions } = slice;
export default slice.reducer;
