import { setting } from '@assets/svg';
import { IRouter } from '@routers/interface';
import { ReactSVG } from 'react-svg';
import React from 'react';

export const routerViewSettingManageAccount: IRouter = {
  path: '/setting/manage/account',
  name: 'common.manage.account',
  loader: import('./manage/AccountManage'),
  exact: true,
  menu: {
    'exact': true,
    activePath: /manage\/account/i,
    'hideInNavbar': false,
  },
};

export const routerViewSettingManageRole: IRouter = {
  path: '/setting/manage/role',
  name: 'common.manage.role',
  loader: import('./manage/RoleManage'),
  exact: true,
  menu: {
    'exact': true,
    activePath: /manage\/role/i,
    'hideInNavbar': false,
  },
};

export const routerViewAddRole: IRouter = {
  path: '/setting/manage/role/add',
  name: 'rule.add',
  loader: import('./manage/addRole'),
  exact: true,
};

export const routerViewUpdateRole: IRouter = {
  path: '/setting/manage/role/update/:roleId',
  name: 'rule.update',
  loader: import('./manage/updateRole'),
  exact: true,
};

export const routerViewSettingLogUser: IRouter = {
  path: '/setting/log/user',
  name: 'common.log.user',
  loader: import('./log/UserLog'),
  exact: true,
  menu: {
    'exact': true,
    activePath: /log\/user/i,
    'hideInNavbar': false,
  },
};

export const routerViewSetting: IRouter = {
  path: '/setting',
  name: 'common.setting.system',
  loader: import('./index'),
  exact: true,
  menu: {
    icon: <ReactSVG src={setting} />,
    'exact': true,
    activePath: /setting/i,
    'hideInNavbar': false,
  },
  routes: [routerViewSettingManageRole, routerViewSettingManageAccount, routerViewSettingLogUser],
};



