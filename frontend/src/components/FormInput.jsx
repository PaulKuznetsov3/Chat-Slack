import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const FormInrut = () => {
  const { t } = useTranslation();
  console.log(useTranslation());
  const [authError, setAuthError] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  console.log(navigate);
  const { logIn } = useAuth();
  console.log(useAuth());
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, actions) => {
        axios.post(routes.loginPath(), values)
          .then((response) => {
            setAuthError(false);
            actions.setSubmitting(true);
            if (!response.data.token) {
              return;
            }
            const name = response.data.username;
            logIn({ username: name });
            navigate('/');
          })
          .catch((error) => {
            actions.setSubmitting(false);
            if (error.response?.status === 401) {
              setAuthError(true);
              inputRef.current.select();
            } else {
              toast.error(t('errors.network'));
            }
          });
      }}
      initialValues={{
        username: '',
        password: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        isSubmitting,
        isValid,
      }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">{t('enter')}</h1>
          <>
            <FloatingLabel controlId="floatingUsername" label="Ваш ник" className="mb-3">
              <Form.Control required name="username" type="text" placeholder="Ваш ник" autoFocus ref={inputRef} onChange={handleChange} value={values.name} isInvalid={touched.username && authError} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Пароль" className="mb-4">
              <Form.Control required name="password" type="password" placeholder="Password" onChange={handleChange} value={values.password} isInvalid={touched.password && authError} />
              <Form.Control.Feedback type="invalid" tooltip>
                {console.log(t('validation.loginFailed'))}
                {errors && t('validation.loginFailed')}
              </Form.Control.Feedback>
            </FloatingLabel>
            <button type="submit" disabled={isValid && isSubmitting} className="w-100 mb-3 btn btn-outline-primary">Войти</button>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default FormInrut;
