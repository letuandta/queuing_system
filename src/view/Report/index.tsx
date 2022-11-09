import MainTitleComponent from '@shared/components/MainTitleComponent';
import React from 'react';
import { routerViewReport } from './router';

const Report = () => {
  return (
    <MainTitleComponent breadcrumbs={routerViewReport} />
  );
};

export default Report;