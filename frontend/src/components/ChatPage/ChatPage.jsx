import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { actions } from '../../slices/index';
import ChatHeader from './ChatHeader';
import ChatChannels from './ChatChannels';
import Messages from '../Messages/Messages';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = () => {
      dispatch(actions.fetchData({ Authorization: `Bearer ${user.token}` }));
    };
    fetchData();
  }, [dispatch, user]);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <ChatHeader />
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <ChatChannels />
              <Messages />
            </div>
          </div>
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
};

export default ChatPage;
