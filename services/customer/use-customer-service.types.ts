import { CustomerContextTypes } from '@providers/client/customer.types';
import { firebaseClient } from '../../firebaseClient';

export interface UseCustomerService {
  getAllCustomers: () => Promise<
    firebaseClient.firestore.QuerySnapshot<
      firebaseClient.firestore.DocumentData>
    >;
  addCustomer: (
    customerData: CustomerContextTypes['customerData']
  ) => Promise<firebaseClient.firestore.DocumentReference<
      firebaseClient.firestore.DocumentData>
    >;
  updateCustomer: (
    customerID: string,
    customerData: CustomerContextTypes['customerData']
  ) => Promise<void>;
  deleteCustomer: (
    customerID: string,
  ) => Promise<void>;
}
