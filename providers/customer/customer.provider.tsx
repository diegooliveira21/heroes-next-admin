import React, {
  useContext,
  ReactElement,
  createContext, useState,
} from 'react';
import useCustomerService from '@services/customer/use-customer.service';
import { ToastCommonTitleEnum } from '@providers/toast/toast.enums';
import { useToast } from '@providers/toast/toast.provider';
import { CustomerContextTypes, CustomerContextValue } from '@providers/customer/customer.types';

const CustomerContext = createContext<CustomerContextValue>({
  addNewCustomer: async () => false,
  updateCustomerData: async () => false,
  deleteCustomerData: async () => false,
  getCustomerList: async () => false,
  isCustomerLoading: false,
  customerList: [],
});

export function useCustomer(): CustomerContextValue {
  return useContext(CustomerContext);
}

export default function
CustomerProvider({
  children,
}: CustomerContextTypes['props']): ReactElement {
  const [customerList, setCustomerList] = useState<
    CustomerContextValue['customerList']>([]);
  const [isCustomerLoading, setIsCustomerLoading] = useState<
    CustomerContextValue['isCustomerLoading']
    >(false);

  const {
    addCustomer,
    updateCustomer,
    getAllCustomers,
    deleteCustomer,
  } = useCustomerService();
  const {
    addToast,
  } = useToast();

  const addNewCustomer: CustomerContextTypes['addNewCustomer'] = async (
    customerData,
  ) => {
    try {
      setIsCustomerLoading(true);
      await addCustomer(customerData);

      return true;
    } catch (error) {
      addToast({
        title: ToastCommonTitleEnum.Error,
        message: error.message,
      });

      return false;
    } finally {
      setIsCustomerLoading(false);
    }
  };

  const getCustomerList: CustomerContextTypes['getCustomerList'] = async () => {
    try {
      setIsCustomerLoading(true);

      const customerPopulateList = await getAllCustomers().then((
        collection => {
          const customerPopulate: CustomerContextTypes['customerData'][] = [];
          collection.forEach(
            customer => customerPopulate.push({
              id: customer.id,
              ...customer.data(),
            } as CustomerContextTypes['customerData']),
          );
          return customerPopulate;
        }));

      setCustomerList(customerPopulateList);

      return true;
    } catch (error) {
      addToast({
        title: ToastCommonTitleEnum.Error,
        message: error.message,
      });

      return false;
    } finally {
      setIsCustomerLoading(false);
    }
  };

  const updateCustomerData: CustomerContextTypes['updateCustomerData'] = async (
    customerID,
    customerData,
  ) => {
    try {
      setIsCustomerLoading(true);
      return updateCustomer(customerID, customerData).then(() => true);
    } catch (error) {
      addToast({
        title: ToastCommonTitleEnum.Error,
        message: error.message,
      });

      return false;
    } finally {
      setIsCustomerLoading(false);
    }
  };

  const deleteCustomerData: CustomerContextTypes['deleteCustomerData'] = async (
    customerID,
  ) => {
    try {
      setIsCustomerLoading(true);
      return deleteCustomer(customerID).then(() => true);
    } catch (error) {
      addToast({
        title: ToastCommonTitleEnum.Error,
        message: error.message,
      });

      return false;
    } finally {
      setIsCustomerLoading(false);
    }
  };

  return (
    <CustomerContext.Provider value={{
      addNewCustomer,
      getCustomerList,
      updateCustomerData,
      deleteCustomerData,
      isCustomerLoading,
      customerList,
    }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
