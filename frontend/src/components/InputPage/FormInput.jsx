import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes.js';
import useAuth from '../../hooks/useAuth.js';

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
const FormInrut = () => {
  const { t } = useTranslation();
  const [authError, setAuthError] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { logIn } = useAuth();
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
            logIn({ username: response.data.username, token: response.data.token });
            navigate('/');
          })
          .catch((error) => {
            actions.setSubmitting(false);
            if (error.response.status === 401) {
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
          <h1 className="text-center mb-4">{t('inputPage.enter')}</h1>
          <>
            <FloatingLabel controlId="floatingUsername" label={t('inputPage.label')} className="mb-3">
              <Form.Control required name="username" type="text" placeholder={t('inputPage.label')} autoFocus ref={inputRef} onChange={handleChange} value={values.name} isInvalid={touched.username && authError} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={t('inputPage.password')} className="mb-4">
              <Form.Control required name="password" type="password" placeholder={t('inputPage.password')} onChange={handleChange} value={values.password} isInvalid={touched.password && authError} />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors && t('validation.loginFailed')}
              </Form.Control.Feedback>
            </FloatingLabel>
            <button type="submit" disabled={isValid && isSubmitting} className="w-100 mb-3 btn btn-outline-primary">{t('inputPage.enter')}</button>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default FormInrut;
