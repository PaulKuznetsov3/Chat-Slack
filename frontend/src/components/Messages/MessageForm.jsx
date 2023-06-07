import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { useApi } from '../../contexts/SocketProvider';

const MessageForm = ({ currentChannelId }) => {
  const inputRef = useRef();
  const { user } = useAuth();
  const { api } = useApi();
  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);
  return (
    <Formik
      onSubmit={async (value, actions) => {
        try {
          actions.setSubmitting(true);
          const { body } = value;
          const newMessage = {
            body,
            channelId: currentChannelId,
            username: user.username,
          };
          await api.sendMessage(newMessage);
          actions.resetForm();
        } catch (error) {
          actions.setSubmitting(false);
          toast.error('errors.network');
        }
      }}
      initialValues={{
        body: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        isSubmitting,
        isDisabled,
      }) => (
        <Form onSubmit={handleSubmit} noValidate className="py-1 border rounded-2">
          <Form.Group className="input-group has-validation">
            <Form.Control
              autoFocus
              name="body"
              placeholder="Введите сообщение..."
              className="border-0 p-0 ps-2"
              disabled={isSubmitting}
              onChange={handleChange}
              value={values.body}
              ref={inputRef}
            />
            <Button
              type="submit"
              className="btn btn-group-vertical border-0"
              variant=""
              disabled={isDisabled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path
                  fill="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
              <span className="visually-hidden">chat.submit</span>
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
