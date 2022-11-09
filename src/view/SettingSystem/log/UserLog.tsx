import MainTitleComponent from '@shared/components/MainTitleComponent';
import React from 'react';
import { routerViewSetting, routerViewSettingLogUser } from '../router';

const UserLog = () => {
  return (
    <div>
      <MainTitleComponent breadcrumbs={[routerViewSetting, routerViewSettingLogUser]} />
    </div>
  );
};

export default UserLog;