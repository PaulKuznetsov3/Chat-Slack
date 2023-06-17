import React from 'react';
import
{
  Button,
  Modal,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices';
import { useApi } from '../../contexts/SocketProvider';

const ModalDelete = ({ handleClose }) => {
  const { api } = useApi();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Formik
        onSubmit={async (value, action) => {
          try {
            action.setSubmitting(true);
            const { name } = value;
            const newChannel = {
              name,
              removable: true,
            };
            const data = await api.sendChannel(newChannel);
            dispatch(actions.selectChannel(data.id));
            toast.success(t('modals.channelAdd'));
            handleClose();
          } catch (error) {
            console.log('err', error);
            actions.setSubmitting(false);
            toast.error('errors.network');
          }
        }}
      >
        {({
          isSubmitting,
        }) => (
          <>
            <Modal.Body>
              {t('modals.assure')}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                {t('modals.cansel')}
              </Button>
              <Button variant="danger" type="submit" disabled={isSubmitting}>
                {t('modals.delete')}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
};

export default ModalDelete;
