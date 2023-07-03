import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes.js';
import useAuth from '../../hooks/useAuth';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('validation.required')
    .min(3, 'validation.length')
    .max(20),
  password: Yup.string()
    .required('validation.required')
    .min(6, 'validation.passwordLength'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'validation.MustMatch')
    .required('validation.required'),
});

const SignupInput = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authError, setAuthError] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const { username, password } = values;
        axios.post(routes.signPath(), { username: filter.clean(username), password })
          .then((response) => {
            setAuthError(false);
            actions.setSubmitting(true);
            auth.logIn(response.data);
            navigate(routes.chat());
          })
          .catch((error) => {
            actions.setSubmitting(false);
            if (error.response.status === 409) {
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
        confirmPassword: '',
      }}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        isSubmitting,
        isValid,
      }) => (
        <Form className="w-50" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">{t('signup.alt')}</h1>
          <>
            <FloatingLabel controlId="floatingUsername" label={t('signup.userName')} className="mb-3">
              <Form.Control required name="username" type="text" placeholder="Ваш ник" autoFocus onBlur={handleBlur} ref={inputRef} onChange={handleChange} value={values.username} isInvalid={(touched.username && errors.username) || authError} />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.username && t(`${errors.username}`)}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={t('signup.password')} className="mb-4">
              <Form.Control required name="password" type="password" placeholder="Password" onBlur={handleBlur} onChange={handleChange} value={values.password} isInvalid={(touched.password && errors.password) || authError} />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password && t(`${errors.password}`)}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingconfirmPassword" label={t('signup.repidPassword')} className="mb-4">
              <Form.Control required name="confirmPassword" type="password" placeholder="confirmPassword" onChange={handleChange} value={values.confirmPassword} isInvalid={(touched.confirmPassword && errors.confirmPassword) || authError === true} />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.confirmPassword && t(`${errors.confirmPassword}`)}
                {t('validation.409')}
              </Form.Control.Feedback>
            </FloatingLabel>
            <button type="submit" disabled={isValid && isSubmitting} className="w-100 mb-3 btn btn-outline-primary">{t('signup.button')}</button>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default SignupInput;
