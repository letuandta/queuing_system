import { IRouter } from '@routers/interface';

export const routerForgotPassword: IRouter = {
  path: '/forgot-password',
  loader: import('./index'),
  exact: true,
};


export const routerResetPassword: IRouter = {
  path: '/reset-password',
  loader: import('./resetPassword'),
  exact: true,
};