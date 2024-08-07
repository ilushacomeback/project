import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';
import { RouterProvider } from './providers/route/index';
import { AuthProvider } from '@/shared/index';
import { store } from '@/shared/index';
import { Navbar } from '@/widgets';
import { getBasketInitialState } from './model/helpers/getBasketInitialState';

export const init = async () => {
  await getBasketInitialState(store.dispatch);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider>
            <Navbar />
          </RouterProvider>
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  );
};
