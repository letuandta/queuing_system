import { device } from '@assets/svg';
import { IRouter } from '@routers/interface';
import React from 'react';
import { ReactSVG } from 'react-svg';

export const routerViewDevice: IRouter = {
  path: '/device',
  name: 'common.device',
  loader: import('./index'),
  exact: true,
  menu: {
    icon: <ReactSVG src={device} />,
    'exact': true,
    activePath: /device/i,
    'hideInNavbar': false,
  },
};

export const routerViewAddDevice: IRouter = {
  path: "/device/add",
  name: "common.device.add",
  loader: import("./component/detailDevice"),
  exact: true
}