export interface UserData {
  id?: number | null;
  email: string;
  password?: string;
}

export interface UseUserService {
  fetchUserRegister: (userData: UserData) => Promise<UserData>;
  fetchUserAuthenticate: (userData: UserData) => Promise<UserData>;
}
