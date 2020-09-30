import { UserData } from '@services/user/use-user-service.types';

export interface UseUserData extends UserData {
  isLogged: boolean;
}

export interface UseUser {
  data: UseUserData;
  userRegister: (userData: UserData) => Promise<void>;
  userAuthenticate: (userData: UserData) => Promise<void>;
}
