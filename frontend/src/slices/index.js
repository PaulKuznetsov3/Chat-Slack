import { combineReducers } from '@reduxjs/toolkit';
import channelsInfo, { actions as channelsInfoActions } from './сhannelsInfo';
import messagesInfo, { actions as messagesInfoActions } from './messagesInfo';
import modalsInfo, { actions as modalsInfoActions } from './modalsInfo';

const actions = {
  ...modalsInfoActions,
  ...channelsInfoActions,
  ...messagesInfoActions,
};

export {
  actions,
};

export default combineReducers({
  modalsInfo,
  channelsInfo,
  messagesInfo,
});
