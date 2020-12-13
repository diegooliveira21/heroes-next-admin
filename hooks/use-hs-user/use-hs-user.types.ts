import { UserData } from '@services/user/use-user-service.types';

export type UseUserData = UserData;

export interface UseUser {
  data: UseUserData;
  userRegister?: (userData: UserData) => Promise<void>;
  userAuthenticate?: (userData: UserData) => Promise<void>;
  isLoading: boolean;
}
