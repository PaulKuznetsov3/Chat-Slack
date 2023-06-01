import { combineReducers } from '@reduxjs/toolkit';
import channelsInfo, { actions as channelsInfoActions } from './сhannelsInfo';
import massegesInfo, { actions as massegesInfoActions } from './massegesInfo';

const actions = {
  ...channelsInfoActions,
  ...massegesInfoActions,
};

export {
  actions,
};
export default combineReducers({
  channelsInfo,
  massegesInfo,
});
