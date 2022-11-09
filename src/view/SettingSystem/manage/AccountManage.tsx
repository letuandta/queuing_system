import MainTitleComponent from '@shared/components/MainTitleComponent';
import React from 'react';
import { routerViewSetting, routerViewSettingManageAccount } from '../router';

const AccountManage = () => {
  return (
    <div>
      <MainTitleComponent breadcrumbs={[routerViewSetting, routerViewSettingManageAccount]} />
    </div>
  );
};

export default AccountManage;