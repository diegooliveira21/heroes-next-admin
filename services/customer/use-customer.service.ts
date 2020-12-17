import { useMemo } from 'react';
import { firebaseClient } from '../../firebaseClient';
import { UseCustomerService } from './use-customer-service.types';

export default function
useCustomerService(): UseCustomerService {
  const getAllCustomers: UseCustomerService['getAllCustomers'] = async () => (
    firebaseClient.firestore()
      .collection('users').get()
  );

  const addCustomer: UseCustomerService['addCustomer'] = async (
    customerData,
  ) => (
    firebaseClient.firestore()
      .collection('users').add(customerData)
  );

  const updateCustomer: UseCustomerService['updateCustomer'] = async (
    customerID,
    customerData,
  ) => (
    firebaseClient.firestore()
      .collection('users').doc(customerID).set(customerData)
  );

  const deleteCustomer: UseCustomerService['deleteCustomer'] = async (
    customerID,
  ) => (
    firebaseClient.firestore()
      .collection('users').doc(customerID).delete()
  );

  return useMemo(
    () => ({
      addCustomer,
      deleteCustomer,
      updateCustomer,
      getAllCustomers,
    }),
    [firebaseClient.firestore],
  );
}
