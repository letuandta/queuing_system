import { provideNumber } from '@assets/svg';
import { IRouter } from '@routers/interface';
import { ReactSVG } from 'react-svg';
import React from 'react';

export const routerViewProvideNumber: IRouter = {
  path: '/provide',
  name: 'common.provide.number',
  loader: import('./index'),
  exact: true,
  menu: {
    icon: <ReactSVG src={provideNumber} />,
    'exact': true,
    activePath: /provide/i,
    'hideInNavbar': false,
  },
};