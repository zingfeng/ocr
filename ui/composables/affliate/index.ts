import { User } from '~~/utils/app';
import { ResponseDto, ResponseStatusCode } from '~~/utils/base';

export enum CommissionStatus {
  ESTIMATE = 'ESTIMATE',
  OFFICIAL = 'OFFICIAL',
}

export enum CommissionPayment {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export interface ReferCode {
  code: string;
  status: string;
  userId: number;
  extras: { rate: number };
}

export interface Commission {
  amount: number;
  rate: number;
  commission: number;
  txType: string; // 'TOP_UP'
  tx: {
    id: number;
    wid: number;
    amount: number;
    type: string; // 'credit'
    content: string;
    createdAt: string;
  };
  fromUId: number;
  status: string; // 'ESTIMATE'
  paymentStatus: string; // 'PENDING'
  createdAt: string;
  updatedAt: string;
}

export interface ReferAccount {
  uId: number;
  referralId: number;
  status: string; // 'ACTIVE',
  createdAt: string;
  updatedAt: string;
}

const getMyReferCode = async () => {
  const res: ResponseDto = (await $fetch(
    `${useRuntimeConfig().baseUrlApi}/affiliate/refer-code`,
    {
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      method: 'GET',
    },
  )) as any;

  if (res.status === ResponseStatusCode.SUCCESS) {
    return res.data as ReferCode;
  }
  return {};
};

const getMyCommission = async () => {
  const res: ResponseDto = (await $fetch(
    `${useRuntimeConfig().baseUrlApi}/affiliate/list-my-commission`,
    {
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      method: 'GET',
    },
  )) as any;

  if (res.status === ResponseStatusCode.SUCCESS) {
    return res.data as {
      commissions: Commission[];
      users: User[];
    };
  }
  return {};
};

const getMyReferAccount = async () => {
  const res: ResponseDto = (await $fetch(
    `${useRuntimeConfig().baseUrlApi}/affiliate/list-referral-user`,
    {
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      method: 'GET',
    },
  )) as any;

  if (res.status === ResponseStatusCode.SUCCESS) {
    return res.data as {
      referUser: ReferAccount[];
      users: User[];
    };
  }
  return {};
};

const connectRefCode = async (refCode: string) => {
  const res: ResponseDto = (await $fetch(
    `${useRuntimeConfig().baseUrlApi}/affiliate/connect-code`,

    {
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      method: 'POST',
      body: {
        referralCode: refCode,
      },
    },
  )) as any;

  return res;
};

const getWebsiteURL = (): string => {
  return useRuntimeConfig().public.websiteUrl;
};

export {
  getMyReferCode,
  getMyCommission,
  getMyReferAccount,
  getWebsiteURL,
  connectRefCode,
};
