import React, {
  ReactElement,
} from 'react';
import {
  Col,
  Row,
  Container,
} from 'react-bootstrap';
import HSNavMenu from '@components/hs-nav-menu/hs-nav-menu.component';

function DashboardPage(): boolean | ReactElement {
  return (
    <>
      <HSNavMenu />
      <Container>
        <Row>
          <Col>
            <h1>Works</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardPage;
