import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const ChatNav = () => {
  const { user, logOut } = useAuth();
  return (
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        {user && <button type="button" className="btn btn-primary" onClick={logOut}>Выйти</button>}
      </Container>
    </Navbar>
  );
};

export default ChatNav;
