import React, {
  useRef,
  useCallback,
  ReactElement,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { HSCustomerAddFormTypes } from '@components/hs-customer-add-form/hs-customer-add-form.types';
import { useCustomer } from '@providers/customer/customer.provider';
import { CustomerDataKeyEnum } from '@providers/customer/customer.enums';
import useHSCustomerAddFormValidations from '@components/hs-customer-add-form/hs-customer-add-form-validations.hook';
import HSInputErrorMessage from '@components/hs-input-error-message/hs-input-error-message.component';

export default function
HSCustomerAddForm(): ReactElement {
  const {
    addNewCustomer,
    getCustomerList,
  } = useCustomer();
  const {
    errorMessage,
    makeValidations,
    resetValidations,
  } = useHSCustomerAddFormValidations();
  const initialFormData = {
    id: '',
    name: '',
    age: '',
    maritalStatus: '',
    document: 0,
    city: '',
    state: '',
  };
  const formDataRef = useRef<HSCustomerAddFormTypes['formData']>(initialFormData);

  const handleFormDataRef: HSCustomerAddFormTypes[
    'handleFormDataRef'
    ] = (inputName) => (event) => {
      formDataRef.current[inputName] = event.target.value;
    };

  const handleFormDataRefReset: HSCustomerAddFormTypes[
    'handleFormDataRefReset'
    ] = () => {
      formDataRef.current = initialFormData;
    };

  const handleFormSubmit: HSCustomerAddFormTypes['handleFormSubmit'] = useCallback(
    async () => {
      if (!(await makeValidations(formDataRef.current))) return;
      // TODO: Fix prop id
      const { id, ...formDataFiltered } = formDataRef.current;

      const isCustomerAdded = await addNewCustomer(formDataFiltered);

      if (isCustomerAdded) {
        resetValidations();
        handleFormDataRefReset();
        await getCustomerList();
      }
    },
    [
      formDataRef,
      makeValidations,
    ],
  );

  const inputList: HSCustomerAddFormTypes['inputList'] = [
    { name: CustomerDataKeyEnum.Name, label: 'Nome' },
    { name: CustomerDataKeyEnum.Age, label: 'Idade' },
    { name: CustomerDataKeyEnum.MaritalStatus, label: 'Estado Civil' },
    { name: CustomerDataKeyEnum.Document, label: 'CPF' },
    { name: CustomerDataKeyEnum.City, label: 'Cidade' },
    { name: CustomerDataKeyEnum.State, label: 'Estado' },
  ];

  return (
    <Form>
      {inputList.map(({ name, label }) => (
        <Form.Group controlId="formBasicPassword">
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type="text"
            placeholder={label}
            onChange={handleFormDataRef(name)}
          />
        </Form.Group>
      ))}
      <HSInputErrorMessage message={errorMessage} />
      <Button
        variant="light"
        onClick={handleFormSubmit}
      >
        Adicionar
      </Button>
    </Form>
  );
}
