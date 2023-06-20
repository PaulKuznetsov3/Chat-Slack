import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import avatar from '../../assets/avatar.jpg';
import FormInrut from './FormInput';

const InputPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <img src={avatar} className="rounded-circle" alt={t('inputPage.enter')} />
              </Col>
              <FormInrut />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('inputPage.text')}</span>
                <a href="/signup">{t('inputPage.link')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InputPage;
