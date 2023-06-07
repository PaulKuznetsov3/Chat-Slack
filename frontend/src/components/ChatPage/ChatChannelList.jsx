import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { actions } from '../../slices';

const ChatChannelsList = () => {
  const dicpatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { selectChannel } = actions;
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <Button type="button" onClick={() => dicpatch(selectChannel(channel.id))} variant={channel.id === currentChannelId ? 'secondary' : 'light'} className="w-100 rounded-0 text-start btn">
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ChatChannelsList;
