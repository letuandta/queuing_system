import { IRouter } from '@routers/interface';

export const routerHomepage: IRouter = {
  path: '/',
  loader: import('./home'),
  exact: true,
  name: 'homepage.name', //translate here for breadcrumb and sidebar
};
