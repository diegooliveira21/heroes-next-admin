import { ReactElement } from 'react';

interface CustomerData {
  id: string;
  name: string;
  age: string;
  maritalStatus: string;
  document: number;
  city: string;
  state: string;
}

interface Props {
  children: ReactElement;
}
export interface CustomerContextValue {
  addNewCustomer: (customerData: CustomerData) => Promise<boolean>;
  updateCustomerData: (
    customerID: string,
    customerData: CustomerData
  ) => Promise<boolean>;
  deleteCustomerData: (
    customerID: string,
  ) => Promise<boolean>;
  getCustomerList: () => Promise<boolean>;
  isCustomerLoading: boolean;
  customerList: CustomerData[];
}

export interface CustomerContextTypes extends CustomerContextValue {
  props: Props;
  customerData: CustomerData;
}
