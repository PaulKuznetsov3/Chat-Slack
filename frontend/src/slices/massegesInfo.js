/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsInfoActions } from './сhannelsInfo';

const initialState = {
  messages: [],
};

const slice = createSlice({
  name: 'massegesInfo',
  initialState,
  extraReducers: (builder) => {
    console.log(channelsInfoActions);
    builder
      .addCase(channelsInfoActions.fetchData.fulfilled, (state, { payload }) => {
        state.masseges = payload.masseges;
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
