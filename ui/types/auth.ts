export interface ILoginInput {
  email: string;
  password: string;
}
export interface ILoginResponse {
  success: boolean;
}
export interface ICreateAccountInput {
  email: string;
  password: string;
}

export interface ICreateAccountResponse {
  success: boolean;
}
