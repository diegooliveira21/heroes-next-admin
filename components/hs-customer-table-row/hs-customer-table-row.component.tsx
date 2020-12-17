import React, {
  useRef,
  useState,
  ReactElement, useCallback,
} from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useCustomer } from '@providers/customer/customer.provider';
import { HSCustomerTableRowTypes } from '@components/hs-customer-table-row/hs-customer-table-row.types';
import { CustomerTableRowStyled } from './hs-customer-table-row.styles';

export default function HSCustomerTableRow({
  customerData,
}: HSCustomerTableRowTypes['props']): ReactElement {
  const [isEditing, setIsEditing] = useState(false);
  const rowDataRef = useRef<HSCustomerTableRowTypes['rowDataRef']>(customerData);

  const {
    isCustomerLoading,
    updateCustomerData,
    deleteCustomerData,
    getCustomerList,
  } = useCustomer();

  const handleRowDataRef: HSCustomerTableRowTypes['handleRowDataRef'] = (
    inputName,
  ) => (event) => {
    rowDataRef.current[inputName] = event.target.value;
  };

  const handleSetIsEditing = () => (
    setIsEditing(prevState => !prevState)
  );

  const handleCustomerUpdate = useCallback(
    async () => {
      if (!isEditing) return handleSetIsEditing();

      await updateCustomerData(
        rowDataRef.current.id,
        rowDataRef.current,
      );

      return handleSetIsEditing();
    },
    [
      isEditing,
      rowDataRef,
      updateCustomerData,
      handleSetIsEditing,
    ],
  );

  const handleDeleteCustomerData: HSCustomerTableRowTypes[
    'handleDeleteCustomerData'
    ] = async () => {
      const isCustomerDeleted = await deleteCustomerData(customerData.id);
      if (isCustomerDeleted) await getCustomerList();
    };

  return (
    <tr>
      <CustomerTableRowStyled>
        {customerData.id}
      </CustomerTableRowStyled>
      {Object.keys(customerData).map((
        customerDataKey: keyof HSCustomerTableRowTypes['rowDataRef'],
      ) => (
        <CustomerTableRowStyled key={`HSCustomerTableRowInput-${customerData.id}`}>
          <Form.Control
            type="text"
            placeholder={customerData[customerDataKey]}
            onChange={handleRowDataRef(customerDataKey)}
            readOnly={!isEditing}
            plaintext={!isEditing}
          />
        </CustomerTableRowStyled>
      ))}
      <CustomerTableRowStyled>
        <Button
          block
          onClick={handleCustomerUpdate}
          disabled={isCustomerLoading}
          variant="primary"
        >
          {(!isCustomerLoading
            && (isEditing ? 'Salvar' : 'Editar'))
          || <Spinner animation="border" />}
        </Button>
        <Button
          block
          onClick={handleDeleteCustomerData}
          variant="danger"
          disabled={isCustomerLoading}
        >
          {isCustomerLoading ? (
            <Spinner animation="border" />
          ) : ('Remover')}
        </Button>
      </CustomerTableRowStyled>
    </tr>
  );
}
