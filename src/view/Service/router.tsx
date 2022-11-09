import { service } from '@assets/svg';
import { IRouter } from '@routers/interface';
import React from 'react';
import { ReactSVG } from 'react-svg';

export const routerViewService: IRouter = {
  path: '/service',
  name: 'common.service',
  loader: import('./index'),
  exact: true,
  menu: {
    icon: <ReactSVG className="icon-has-fill-has-stroke" src={service} />,
    'exact': true,
    activePath: /service/i,
    'hideInNavbar': false,
  },
};