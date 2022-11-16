import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@modules';
import UserEntity from '@modules/user/entity';
import { Selector } from '@reduxjs/toolkit';
import { imgAvatar } from '@shared/assets/images';
import ChangeLanguage from '@shared/components/ChangeLanguage';
import { ReactSVG } from 'react-svg';
import { bellFullFill } from '@assets/svg';

interface IHeaderComponent {
  profile?: UserEntity;
}

const HeaderComponentSelector: Selector<RootState, IHeaderComponent> = (state: RootState) => {
  return {
    profile: state.profile.user,
  };
};

const HeaderComponent = () => {
  const { profile } = useSelector(HeaderComponentSelector);
  const navigate = useNavigate();

  return (
    <>
      <div className="header-component">
        <div className="header-component__search">
          {/* <ChangeLanguage /> */}
        </div>
        <div style={{ stroke: '#FFAC6A', fill: '#FFAC6A' }}>
          <ReactSVG src={bellFullFill} />
        </div>
        <div className="header-component__dropdown">
          <div className="dropdown__profile__img">
            <img alt="img-avatar" className="img-avatar" src={profile?.avatar || imgAvatar} />
          </div>
        </div>
        <div
          className="header-component__identify"
          onClick={() => {
            navigate('/profile');
          }}
        >
          <h4 className="identify__admin">{profile?.userFullName}</h4>
          <p className="identify__hi">{(profile && profile?.role?.roleName) || 'xin chào'}</p>
          <p className="identify__place">{profile?.email || 'Lê Tuấn Đạt'}</p>
        </div>
      </div>
    </>
  );
};

export default memo(HeaderComponent);
