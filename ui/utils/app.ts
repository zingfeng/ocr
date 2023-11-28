import vue3GoogleLogin from 'vue3-google-login';

export interface IApp {
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  accessToken: string;
}

export function AppSetup() {
  // declare app information
  const app: IApp = {
    name: 'Social Network',
  };
  const user: User = {
    id: 0,
    firstName: 'Social network',
    lastName: '',
    email: '',
    avatar: '',
    accessToken: '',
  };

  useState('app', () => app);
  useState('isLogin', () => false);
  useState('user', () => user);
  useCookie('accessToken');

  const nuxtApp = useNuxtApp();

  nuxtApp.vueApp.use(vue3GoogleLogin, {
    clientId:
      '555039281696-buvdmte949fos24981uep7a05ipujsvi.apps.googleusercontent.com',
  });

  return {
    app,
  };
}
