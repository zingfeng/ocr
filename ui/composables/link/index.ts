import { ResponseDto, ResponseStatusCode } from '~~/utils/base';

export enum LinkHistoryType {
  NORMAL = 0,
  BOT = 1,
}

export enum LinkActionType {
  STAY = 0,
  REDIRECT = 1,
}

export interface LinkHistory {
  id: number;
  linkId: number;
  deviceId: string;
  ipAddress: string;
  country: string;
  type: LinkHistoryType;
  time: number;
  createdAt: string;
  action: LinkActionType;
}

const useLinks = async () =>
  await useFetch(`${useRuntimeConfig().baseUrlApi}/link`, {
    transform: (res) => {
      if ((res as ResponseDto).status === ResponseStatusCode.SUCCESS) {
        return (res as ResponseDto).data;
      }
      return [];
    },
    headers: {
      'vegeta-token': useCookie('accessToken').value,
    },
    key: 'get-links',
    method: 'GET',
    server: false,
  });

const createLink = async (params: {
  url: string;
  shadow: string;
  allowCountry: string[];
  restrictCountry: string[];
  timeDuration: number;
}) => {
  const { data } = await useFetch(
    `${useRuntimeConfig().baseUrlApi}/link/create`,
    {
      body: {
        ...params,
      },
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      key: `create-new-link-${new Date().getTime()}`,
      method: 'POST',
      server: false,
    },
  );
  return data;
};

const updateLink = async (params: {
  id: number;
  url: string;
  shadow: string;
  allowCountry: string[];
  restrictCountry: string[];
}) => {
  const policy =
    params.allowCountry.length > 0
      ? 'allow'
      : params.restrictCountry.length > 0
      ? 'restrict'
      : 'none';

  const { data } = await useFetch(
    `${useRuntimeConfig().baseUrlApi}/link/update/${params.id}`,
    {
      body: {
        ...params,
        policy,
      },
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      key: `update-link-${new Date().getTime()}`,
      method: 'POST',
      server: false,
    },
  );
  return data;
};

const getEmbedScriptTag = async (params: {
  linkId: number;
}): Promise<string> => {
  const res: ResponseDto = (await $fetch(
    `${useRuntimeConfig().baseUrlApi}/link/embedTag/${params.linkId}`,
    {
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      method: 'GET',
    },
  )) as any;

  if (res.status === ResponseStatusCode.SUCCESS) {
    return res.data as string;
  }
  return '';
};

const getLinkDetail = async (params: {
  linkId: number;
}): Promise<Record<string, any>> => {
  const res: ResponseDto = (await $fetch(
    `${useRuntimeConfig().baseUrlApi}/link/${params.linkId}`,
    {
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      method: 'GET',
    },
  )) as any;

  if (res.status === ResponseStatusCode.SUCCESS) {
    return res.data as any;
  }
  return {};
};

const verifyEmbedScriptTag = async (params: {
  linkId: number;
}): Promise<
  Partial<{
    isValid: boolean;
    isDuplicate: boolean;
    screenshot: string;
  }>
> => {
  const res: ResponseDto = (await $fetch(
    `${useRuntimeConfig().baseUrlApi}/link/verifyEmbedTag/${params.linkId}`,
    {
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      method: 'GET',
    },
  )) as any;

  let result: Partial<{
    isValid: boolean;
    isDuplicate: boolean;
    screenshot: string;
  }> = {};
  if (res.status === ResponseStatusCode.SUCCESS) {
    result = res.data as any;
  }
  return result;
};

const extendLink = async (params: {
  linkId: number;
  timeDuration: number;
}): Promise<ResponseDto> => {
  const res: ResponseDto = (await $fetch(
    `${useRuntimeConfig().baseUrlApi}/link/extend`,
    {
      headers: {
        'vegeta-token': useCookie('accessToken').value,
      },
      body: {
        id: params.linkId,
        timeDuration: params.timeDuration,
      },
      method: 'POST',
    },
  )) as any;

  return res;
};

export {
  useLinks,
  createLink,
  updateLink,
  getEmbedScriptTag,
  verifyEmbedScriptTag,
  getLinkDetail,
  extendLink,
};
