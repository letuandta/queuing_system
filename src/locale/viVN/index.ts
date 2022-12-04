import viVN from 'antd/lib/locale/vi_VN';

import auth from './auth';
import common from './common';
import Form from './form';
import pageError from './pageError';
import roles from './roles';
import server from './server';
import device from './device';
import service from './service';
import provide from './provide';
import rule from './rule';
import account from './account';
import log from './log'

export default {
  ...viVN,
  ...common,
  ...server,
  ...auth,
  ...pageError,
  ...roles,
  Form,
  ...device,
  ...service,
  ...provide,
  ...rule,
  ...account,
  ...log,
};
