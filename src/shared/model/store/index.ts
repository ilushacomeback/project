import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth';
import { productsApi } from '../../api/products';
import { categoriesApi } from '../../api/categories';
import { userApi } from '../../api/user';
import {
  authReducer as auth,
  actions as authActions,
  authSelectors,
} from '../slices/authSlice';
import {
  productsReducer as products,
  actions as productsActions,
  productsSelectors,
} from '../slices/products';

export const actions = {
  ...authActions,
  ...productsActions,
};

export const selectors = {
  authSelectors,
  productsSelectors,
};

const reducer = combineReducers({
  auth,
  products,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      userApi.middleware,
    ]),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
