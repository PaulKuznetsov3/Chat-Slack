import React from 'react';
import
{
  Button,
  Modal,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slices';
import { useApi } from '../../contexts/SocketProvider';
import { selectors as channelsSelectors } from '../../slices/сhannelsInfo';

const ModalDelete = ({ handleClose }) => {
  const { api } = useApi();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const channelId = useSelector((state) => state.modalsInfo.modal.target);
  const [currentChannel] = channels.filter((channel) => channel.id === channelId);
  const defaultChannel = 1;
  const removeChannel = async () => {
    try {
      await api.deleteChannel(currentChannel);
      dispatch(actions.removeChannel(currentChannel.id));
      toast.success(t('modals.removeChannel'));
      dispatch(actions.selectChannel(defaultChannel));
      handleClose();
    } catch (err) {
      toast.error(t('errors.network'));
    }
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.assure')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          {t('modals.cansel')}
        </Button>
        <Button variant="danger" type="submit" onClick={() => removeChannel()}>
          {t('modals.delete')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalDelete;
