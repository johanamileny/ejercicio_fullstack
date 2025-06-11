export interface AuthenticatedUser {
  name: string;       
  email: string;      
  password: string;
  userType: string;
  token: string;
}
