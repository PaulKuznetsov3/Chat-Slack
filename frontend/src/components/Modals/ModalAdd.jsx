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
import { actions } from '../../slices';
import useAuth from '../../hooks/useAuth';
import { useApi } from '../../contexts/SocketProvider';
import { selectors as channelsSelectors } from '../../slices/сhannelsInfo';

const schema = (channels) => Yup.object().shape({
  name: Yup.string().required().min(3).max(20)
    .notOneOf(channels)
    .trim(),
});

const ModalAdd = ({ handleClose }) => {
  const { api } = useApi();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { logOut } = useAuth();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const channels = useSelector(channelsSelectors.selectAll);
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.header')}</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema(channels.map((channel) => channel.name))}
        onSubmit={async (value, action) => {
          try {
            action.setSubmitting(true);
            const { name } = value;
            const newChannel = {
              name: filter.clean(name),
              removable: true,
            };
            const data = await api.sendChannel(newChannel);
            dispatch(actions.selectChannel(data.id));
            toast.success(t('modals.channelAdd'));
            handleClose();
          } catch (error) {
            action.setSubmitting(false);
            toast.error(t('errors.network'));
            logOut();
          }
        }}
        initialValues={{
          name: '',
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
                  type="text"
                  name="name"
                  className="mb-2"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  value={values.name}
                  isInvalid={errors.name && touched.name}
                  ref={inputRef}
                  id="name"
                  autoComplete="off"
                />
                <Form.Label text="Имя канала" className="visually-hidden" htmlFor="name">{t('modals.channelName')}</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.name === 'name must be at least 3 characters' && t('validation.length')}
                  {errors.name === 'name must be at most 20 characters' && t('validation.length')}
                  {errors.name === 'name is a required field' && t('validation.required')}
                  {errors.name?.includes('name must not be one of the following values') && t('validation.unique')}
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

export default ModalAdd;
