import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Navbar } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const ChatNav = () => {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();
  return (
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('nav.chat')}</Navbar.Brand>
        {user && <button type="button" className="btn btn-primary" onClick={logOut}>{t('nav.out')}</button>}
      </Container>
    </Navbar>
  );
};

export default ChatNav;
