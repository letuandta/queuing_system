import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSingleAsync } from '@hook/useAsync';
import authenticationPresenter from '@modules/authentication/presenter';
import { useAltaIntl } from '@shared/hook/useTranslate';
import RenderError from '../components/RenderError';
import { IResetPasswordDTO } from '@modules/authentication/repository';


const useQuerySearchParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search)
}

const ForgotPassword = () => {
  const history = useNavigate();
  const { formatMessage } = useAltaIntl();
  const { resetPass } = authenticationPresenter;
  const resetPasswordCall = useSingleAsync(resetPass);
  const [errorStatus, setErrorStatus] = useState('');
  const searchParams = useQuerySearchParams()

  const onFinishFailed = () => {
    setErrorStatus('');
  };

  const onSubmitEmail = (values: any) => {
    console.log(values);
    if (values.password !== values.confirmPassword)
      setErrorStatus("Hai mật khẩu không khớp. Vui lòng nhập lại!!")
    else {
      let payload: IResetPasswordDTO = {
        oobCode: searchParams.get('oobCode'),
        newPassword: values.password
      }
      console.log(payload);
      resetPasswordCall
        ?.execute(payload)
        .then(() => {
          history('/login')
        })
        .catch(() => {
          setErrorStatus('Cập nhật không thành công')
        });
    }
  };

  return (
    <>
      <div className="main-form auth-form">
        <div className="content-form">
          <img className="logo-alta-form" src={require('../../../shared/assets/svg/Logo_alta.svg')}></img>
          <div className="input-form">
            <p className="main-title">{formatMessage('forgot.password.title.reset')}</p>
            <Form
              name="forgotPassword"
              layout="vertical"
              onFinish={onSubmitEmail}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
            >
              <Form.Item
                label={formatMessage('auth.password')}
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password
                  placeholder={formatMessage('auth.password')}
                  status={errorStatus !== '' ? 'error' : ''}
                />
              </Form.Item>
              <Form.Item
                label={formatMessage('auth.password.confirm')}
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password
                  placeholder={formatMessage('auth.password.confirm')}
                  status={errorStatus !== '' ? 'error' : ''}
                />
              </Form.Item>
              {errorStatus && <RenderError errorStatus={errorStatus} />}
              <br />
              <br />
              <Form.Item className='form-item-multi-button'>
                <Button htmlType="submit" className="normal-button">
                  {formatMessage('forgot.password.button.accept')}
                </Button>
              </Form.Item>
            </Form>
            {errorStatus && <RenderError errorStatus={errorStatus} />}
          </div>
        </div>
        <div className='thumnail-login'>
          <img className="thumnail-login-image" src={require('../../../shared/assets/svg/Thumnail_reset_password.svg')}></img>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
