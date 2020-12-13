export interface UserData {
  id?: number | null;
  email: string;
  password: string;
  token?: string | null;
}

export interface UseUserService {
  fetchUserRegister: (userData: UserData) => Promise<UserData>;
  fetchUserAuthenticate: (userData: UserData) => Promise<UserData>;
}
