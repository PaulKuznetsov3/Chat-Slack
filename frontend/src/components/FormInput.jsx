import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(70, 'Too Long!')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Обязательное поле'),
});

const FormInrut = () => (
  <Formik
    validationSchema={schema}
    onSubmit={(values) => {
      alert(JSON.stringify(values, null, 2));
    }}
    initialValues={{
      name: '',
      password: '',
    }}
  >
    {({
      handleSubmit,
      handleChange,
      values,
      touched,
      errors,
    }) => (
      <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">Войти</h1>
        <>
          <FloatingLabel controlId="floatingInput" label="Ваш ник" className="mb-3">
            <Form.Control required name="name" type="text" placeholder="name@example.com" onChange={handleChange} value={values.name} isInvalid={touched.name && errors.name} />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.name}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Пароль" className="mb-4">
            <Form.Control required name="password" type="password" placeholder="Password" onChange={handleChange} value={values.password} isInvalid={touched.password && errors.password} />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
        </>
      </Form>
    )}
  </Formik>
);

export default FormInrut;
