import { ResponseDto, ResponseStatusCode } from '~~/utils/base';

export interface Wallet {
  wid: number;
  currency: string;
  type: number;
  uid: number;
  balance: number;
  overdraft: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletResponse {
  wallet?: Wallet;
  topUp?: {
    fullMessage: string;
    snippetMessage: string;
    email: string;
    qrCodeText: string;
    bankAccount: {
      accountNumber: string;
      accountHolder: string;
      bankName: string;
      branch: string;
    };
  };
}

export interface Transaction {
  id: number;
  wid: number;
  type: 'debit' | 'credit';
  content: string;
  amount: number;
  createdAt: string;
}

const getWallet = async (): Promise<WalletResponse> => {
  const res: ResponseDto = (await $fetch(
    `${useRuntimeConfig().baseUrlApi}/payment/wallet`,
    {
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      method: 'GET',
    },
  )) as any;

  if (res.status === ResponseStatusCode.SUCCESS) {
    return res.data as WalletResponse;
  }
  return {};
};

const getHistory = async (
  walletId: number,
  currency = 'VND',
): Promise<Transaction[]> => {
  const res: ResponseDto = (await $fetch(
    `${useRuntimeConfig().baseUrlApi}/payment/history`,
    {
      body: {
        wid: walletId,
        currency,
      },
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      method: 'POST',
    },
  )) as any;

  if (res.status === ResponseStatusCode.SUCCESS) {
    return res.data as Transaction[];
  }
  return [];
};

const getWebsocketEndpoint = (): string => {
  return useRuntimeConfig().wsEndpoint;
};

export { getWallet, getHistory, getWebsocketEndpoint };
