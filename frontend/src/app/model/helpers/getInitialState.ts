import { AuthState } from '@/shared/interfaces/index';

export const getAuthInitialState = (): AuthState => {
  const user = localStorage.getItem('user');
  // const user: string | undefined = getCookie('user');

  if (user) {
    return JSON.parse(user);
  }

  return { accessToken: null, id: null, username: null };
};
