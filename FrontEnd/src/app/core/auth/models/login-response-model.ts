export interface LoginResponseModel {
  succeeded?: boolean;
  message?: string;
  errors?: any;
  data?: loginDataModel;
}
export interface loginDataModel {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  isVerified: boolean;
  jwToken: string;
  refreshToken: string;
}
