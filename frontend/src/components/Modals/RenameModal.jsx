import React, { useRef, useEffect } from 'react';
import
{
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { actions } from '../../slices';
import { useApi } from '../../contexts/SocketProvider';
import { selectors as channelsSelectors } from '../../slices/сhannelsInfo';

const schema = (channels) => Yup.object().shape({
  name: Yup.string()
    .required('validation.required')
    .min(3, 'validation.length')
    .max(20, 'validation.length')
    .notOneOf(channels, 'validation.unique'),
});

const RenameModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { api } = useApi();
  const { t } = useTranslation();
  const inputRef = useRef();
  const { logOut } = useAuth();
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const channels = useSelector(channelsSelectors.selectAll);
  const channelId = useSelector((state) => state.modalsInfo.modal.target);
  const [currentChannel] = channels.filter((channel) => channel.id === channelId);
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema(channels.map((channel) => channel.name))}
        onSubmit={async (value, action) => {
          try {
            action.setSubmitting(true);
            const { name } = value;
            const renameChannel = {
              name: filter.clean(name),
              id: currentChannel.id,
            };
            const data = await api.renameChannel(renameChannel);
            dispatch(actions.selectChannel(data));
            toast.success(t('modals.channelRename'));
            handleClose();
          } catch (error) {
            action.setSubmitting(false);
            toast.error(t('errors.network'));
            logOut();
          }
        }}
        initialValues={{
          name: currentChannel.name,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} noValidate className="py-1 border rounded-2">
            <Modal.Body>
              <Form.Group className="input-group has-validation">
                <Form.Control
                  name="name"
                  className="mb-2"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  value={values.name}
                  isInvalid={errors.name && touched.name}
                  ref={inputRef}
                  id="name"
                />
                <Form.Label text="Имя канала" className="visually-hidden" htmlFor="name">{t('modals.channelName')}</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.name && t(`${errors.name}`)}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                {t('modals.cansel')}
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {t('modals.send')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RenameModal;
