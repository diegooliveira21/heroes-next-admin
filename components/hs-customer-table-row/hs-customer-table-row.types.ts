import { BaseSyntheticEvent } from 'react';
import { CustomerContextTypes } from '@providers/customer/customer.types';

interface Props {
  customerData: CustomerContextTypes['customerData'];
}
export interface HSCustomerTableRowTypes {
  props: Props;
  handleDeleteCustomerData: () => Promise<void>;
  rowDataRef: CustomerContextTypes['customerData'];
  handleRowDataRef: (
    inputName: keyof CustomerContextTypes['customerData']
  ) => (event: BaseSyntheticEvent) => void;
}
