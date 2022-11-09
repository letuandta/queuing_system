import React from 'react';
import { Button } from 'antd';
import authenticationPresenter from '@modules/authentication/presenter';
import { useSingleAsync } from '@hook/useAsync';
import { ReactSVG } from 'react-svg';
import { logout as logoutIcon } from '@assets/svg';
import { useAltaIntl } from '@shared/hook/useTranslate';
const LogoutButton = () => {

  const { formatMessage } = useAltaIntl();
  const { logout } = authenticationPresenter;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const logoutCurrentAuth = useSingleAsync(logout);

  const SignOut = () => {
    logoutCurrentAuth.execute().then((response) =>
      console.log(response),
    );
  };

  return (
    <div>
      <Button onClick={SignOut} > 
        <ReactSVG src={logoutIcon}/>
        {formatMessage('auth.logout')}
      </Button>
    </div>
  );
};

export default LogoutButton;