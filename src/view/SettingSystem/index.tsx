import MainTitleComponent from '@shared/components/MainTitleComponent';
import React from 'react';
import { routerViewSetting } from './router';

const SettingSystem = () => {
  return (
    <div>
      <MainTitleComponent breadcrumbs={routerViewSetting} />
    </div>
  );
};

export default SettingSystem;