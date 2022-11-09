import MainTitleComponent from '@shared/components/MainTitleComponent';
import React from 'react';
import { routerViewService } from './router';

const Service = () => {
  return (
    <MainTitleComponent breadcrumbs={routerViewService} />
  );
};

export default Service;