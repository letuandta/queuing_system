import { routerForgotPassword } from '@view/Auth/ForgotPassword/router';
import { routerLogin } from '@view/Auth/Login/router';
import { routerViewProfile } from '@view/Auth/Profile/router';
import { routerViewAddDevice, routerViewDevice } from '@view/Device/router';
import { routerHomepage } from '@view/Homepage/router';
import { routerViewProvideNumber } from '@view/ProvideNumber/router';
import { routerViewReport } from '@view/Report/router';
import { routerViewRoot } from '@view/router';
import { routerViewService } from '@view/Service/router';
import { routerViewSetting } from '@view/SettingSystem/router';

import { IRouter } from './interface';

export const privatePage: IRouter[] = [routerViewRoot, routerHomepage, routerViewProfile, routerViewDevice,
  routerViewReport, routerViewProvideNumber, routerViewService, routerViewSetting, routerViewAddDevice,
];

export const publicPage: IRouter[] = [routerLogin, routerForgotPassword];
