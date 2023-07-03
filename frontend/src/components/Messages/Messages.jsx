import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../../slices/сhannelsInfo';
import { selectors as messagesSelectors } from '../../slices/messagesInfo';
import MessageForm from './MessageForm';
import useAuth from '../../hooks/useAuth';

const Messages = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectAll);
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
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
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesChannel.length !== 0 ? messagesChannel.map((message) => (
            <div key={message.id} className="flx">
              <div className={`${message.username === user.username ? 'text-break mb-2 bg-bl border-radius flx-end' : 'text-break mb-2 border-radius bg-gr'}`}>
                <b>{message.username}</b>
                {`: ${message.body}`}
              </div>
            </div>
          )) : ''}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm currentChannelId={currentChannelId} messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
