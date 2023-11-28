const useGoogleLogin = (params: { token: string }) =>
  useFetch(`${useRuntimeConfig().apiBaseUrl}/user/registerOrLogin`, {
    body: {
      ...params,
    },
    key: 'login-by-google',
    method: 'POST',
  });

export { useGoogleLogin };
