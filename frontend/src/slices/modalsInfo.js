/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    show: false,
    type: '',
    target: null,
  },
};

const modalsSlice = createSlice({
  name: 'modalsInfo',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, target } = payload;
      console.log('pa', payload);
      state.modal.show = true;
      state.modal.type = type;
      state.modal.target = target;
    },
    closeModal: (state, { payload }) => {
      const { type, target } = payload;
      state.modal.show = false;
      state.modal.type = type;
      state.modal.target = target;
    },
  },
});

const actions = {
  ...modalsSlice.actions,
};
export { actions };
export default modalsSlice.reducer;
