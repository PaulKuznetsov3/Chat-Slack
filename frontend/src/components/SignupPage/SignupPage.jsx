import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import avatar1 from '../../assets/avatar1.jpg';
import SignupInput from './SignupInput';

const SingupPage = () => {
  const { t } = useTranslation();
  return (
    <Container className="fluid h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={avatar1} className="rounded-circle" alt={t('singup.alt')} />
              </div>
              <SignupInput />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingupPage;
