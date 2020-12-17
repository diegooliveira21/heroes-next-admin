import React, {
  ReactElement,
} from 'react';
import {
  Col,
  Row,
  Container,
} from 'react-bootstrap';
import HSNavMenu from '@components/hs-nav-menu/hs-nav-menu.component';
import HSCustomerAddForm from '@components/hs-customer-add-form/hs-customer-add-form.component';
import HSCustomerTable from '@components/hs-customer-table/hs-customer-table.component';

function DashboardPage(): ReactElement {
  return (
    <>
      <HSNavMenu />
      <Container>
        <Row>
          <Col>
            <HSCustomerAddForm />
            <HSCustomerTable />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardPage;
