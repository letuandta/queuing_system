import MainTitleComponent from '@shared/components/MainTitleComponent';
import React from 'react';
import { routerViewSetting, routerViewSettingManageRole } from '../router';

const RoleManage = () => {
  return (
    <div>
      <MainTitleComponent breadcrumbs={[routerViewSetting, routerViewSettingManageRole]} />
    </div>
  );
};

export default RoleManage;