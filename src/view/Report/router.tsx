import { report } from '@assets/svg';
import { IRouter } from '@routers/interface';
import React from 'react';
import { ReactSVG } from 'react-svg';

export const routerViewReport: IRouter = {
  path: '/report',
  name: 'common.report',
  loader: import('./index'),
  exact: true,
  menu: {
    icon: <ReactSVG className='icon-has-fill-no-stroke' src={report} />,
    'exact': true,
    activePath: /report/i,
    'hideInNavbar': false,
  },
};