import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import React, { useEffect } from 'react';
import Messages from '../Messages/Messages';
import useAuth from '../../hooks/useAuth';
import ChatChannels from './ChatChannels';
import Modals from '../Modals/Modals';
import { actions } from '../../slices';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(actions.fetchData({ Authorization: `Bearer ${user.token}` }));
    };
    fetchData();
  }, [dispatch, user]);

  return (
    <Container className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChatChannels />
        <Messages />
        <Modals />
      </div>
    </Container>
  );
};

export default ChatPage;
