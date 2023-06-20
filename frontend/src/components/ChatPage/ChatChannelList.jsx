import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/сhannelsInfo';
import { actions } from '../../slices';

const ChatChannelsList = () => {
  const { t } = useTranslation();
  const dicpatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const { selectChannel } = actions;
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        !channel.removable ? (
          <li key={channel.id} className="nav-item w-100">
            <Button type="button" onClick={() => dicpatch(selectChannel(channel.id))} variant={channel.id === currentChannelId ? 'secondary' : 'light'} className="w-100 rounded-0 text-start btn">
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </li>
        )
          : (
            <li key={channel.id} className="nav-item w-100">
              <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
                <Button type="button" onClick={() => dicpatch(selectChannel(channel.id))} variant={channel.id === currentChannelId ? 'secondary' : 'light'} className="w-100 text-truncate rounded-0 text-start btn">
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle split id="" variant={channel.id === currentChannelId ? 'secondary' : 'light'} />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => dicpatch(actions.openModal({ type: 'del', target: channel.id }))}>{t('modals.delete')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => dicpatch(actions.openModal({ type: 'ren', target: channel.id }))}>{t('modals.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          )
      ))}
    </ul>
  );
};

export default ChatChannelsList;
