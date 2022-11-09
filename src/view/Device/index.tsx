import MainTitleComponent from '@shared/components/MainTitleComponent';
import React from 'react';
import { routerViewDevice } from './router';

const Device = () => {
  return (
    <MainTitleComponent breadcrumbs={routerViewDevice} />
  );
};

export default Device;
