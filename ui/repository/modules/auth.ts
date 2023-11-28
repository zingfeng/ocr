import HttpFactory from '../factory';
import {
  ICreateAccountInput,
  ICreateAccountResponse,
  ILoginInput,
  ILoginResponse,
} from 'types';

class AuthModule extends HttpFactory {
  private RESOURCE = '/auth';

  async login(credentials: ILoginInput): Promise<ILoginResponse> {
    return await this.call<ILoginResponse>(
      'POST',
      `${this.RESOURCE}/login`,
      credentials,
    );
  }

  async create(account: ICreateAccountInput): Promise<ICreateAccountResponse> {
    return await this.call<ICreateAccountResponse>(
      'POST',
      `${this.RESOURCE}/register`,
      account,
    );
  }
}

export default AuthModule;
