import MainTitleComponent from '@shared/components/MainTitleComponent';
import React from 'react';
import { routerViewProvideNumber } from './router';

const ProvideNumber = () => {
  return (
    <MainTitleComponent breadcrumbs={routerViewProvideNumber} />
  );
};

export default ProvideNumber;