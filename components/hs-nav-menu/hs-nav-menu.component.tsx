import React, {
  ReactElement,
} from 'react';
import {
  Nav,
  Form,
  Button,
  Navbar,
  FormControl,
} from 'react-bootstrap';

function HSNavMenu(): ReactElement {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Admin</Navbar.Brand>
    </Navbar>
  );
}

export default HSNavMenu;
