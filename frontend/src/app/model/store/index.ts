import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/shared/api/auth';
import { productsApi } from '@/shared/api/products';
import { categoriesApi } from '@/shared/api/categories';
import { userApi } from '@/shared/api/user';
import { basketApi } from '@/shared/api/basket';
import { searchApi } from '@/shared/api/search';
import {
  authReducer as authState,
  actions as authActions,
  authSelectors,
} from '../slices/authSlice';
import {
  productsReducer as productsState,
  actions as productsActions,
  productsSelectors,
} from '../slices/productsSlice';
import {
  basketReducer as basketState,
  actions as basketActions,
  basketSelectors
} from '../slices/basketSlice'

export const actions = {
  ...authActions,
  ...productsActions,
  ...basketActions,
};

export const selectors = {
  authSelectors,
  productsSelectors,
  basketSelectors,
};

const reducer = combineReducers({
  authState,
  productsState,
  basketState,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [basketApi.reducerPath]: basketApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      userApi.middleware,
      basketApi.middleware,
      searchApi.middleware,
    ]),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
