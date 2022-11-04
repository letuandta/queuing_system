import { IRouter } from '@routers/interface';

export const routerViewDevice: IRouter = {
    path: '/device',
    name: 'common.device',
    loader: import('./index'),
    exact: true,
    menu: {
        'exact': true,
        activePath: /device/i,
        'hideInNavbar': false
    }
};