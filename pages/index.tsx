import React, { ReactElement } from 'react';
import HSSignInForm from '@components/hs-sign-in-form/hs-sign-in-form.component';
import {
  Col,
  Row,
  Container,
} from 'react-bootstrap';

export default function Home(): ReactElement {
  return (
    <Container>
      <Row>
        <Col>
          <HSSignInForm />
        </Col>
      </Row>
    </Container>
  );
}
