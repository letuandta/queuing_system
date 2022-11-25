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
  name: "device.add",
  loader: import("./component/addDevice"),
  exact: true
}

export const routerViewDetailDevice: IRouter = {
  path: '/device/:deviceId',
  name: "device.detail",
  loader: import('./component/detailDevice'),
  exact: true
}

export const routerViewUpdateDevice: IRouter = {
  path: '/device/update/:deviceIdParam',
  name: "device.update",
  loader: import('./component/updateDevice'),
  exact: true
}