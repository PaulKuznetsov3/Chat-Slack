import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import MessageForm from './MessageForm';

const Messages = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messagesInfo.messages);
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const currentChannel = channels.filter(({ id }) => id === currentChannelId)
    .map(({ name }) => name);
  const messagesChannel = messages.filter((message) => message.channelId === currentChannelId);
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {`# ${currentChannel}`}
            </b>
          </p>
          <span className="text-muted">
            {t('messages.messageCount', { count: messagesChannel.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesChannel.length !== 0 ? messagesChannel.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              {`: ${message.body}`}
            </div>
          )) : ''}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm currentChannelId={currentChannelId} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
