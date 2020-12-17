import React, {
  useEffect,
  ReactElement,
} from 'react';
import { Table } from 'react-bootstrap';
import { useCustomer } from '@providers/customer/customer.provider';
import HSCustomerTableRow from '@components/hs-customer-table-row/hs-customer-table-row.component';

export default function HSCustomerTable(): ReactElement {
  const {
    getCustomerList,
    customerList,
  } = useCustomer();

  useEffect(
    () => {
      getCustomerList();
    },
    [],
  );

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Idade</th>
          <th>Estado Civil</th>
          <th>CPF</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {customerList.map((customerData) => (
          <HSCustomerTableRow
            key={`HSCustomerTableRow-${customerData.id}`}
            customerData={customerData}
          />
        ))}
      </tbody>
    </Table>
  );
}
