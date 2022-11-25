import httpRepository from '@core/repository/http';
import User from '@modules/user/entity';
import { confirmPasswordReset, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { fbRepositorires } from 'src/firebase/auth';

const register = (payload: any) => {
  return httpRepository.execute({
    path: '/auth/register',
    method: 'post',
    payload,
    config: { isPrivate: false },
  });
};

export interface IForgotPasswordDTO {
  email: string
}

const forgotPass = (payload: IForgotPasswordDTO) => {

  let newPayload = Object.assign(payload, { action: { url: "http://localhost:4321/login" } })

  return fbRepositorires.execute({
    asyncFunction: sendPasswordResetEmail,
    payload: newPayload
  })
};

const CheckRecoveryToken = (payload: any) => {
  return httpRepository.execute({
    path: `api/Users/CheckRecoveryToken?recoveryToken=${payload}`,
    method: 'get',
    showSuccess: false,
    showError: false,
    config: { isPrivate: false },
  });
};

const updatePassword = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users/ChangePassword',
    method: 'put',
    payload,
    showSuccess: false,
    showError: false,
    config: { isPrivate: true },
  });
};

export interface ILoginDTO {
  username: string;
  password: string;
}

const login = (payload: ILoginDTO) => {
  return fbRepositorires.execute({
    asyncFunction: signInWithEmailAndPassword,
    payload: payload,
  });
  // return httpRepository.execute({
  //   path: '/api/Users/Login',
  //   method: 'post',
  //   payload,
  //   config: { isPrivate: false },
  // });
};

const logout = () => {
  return fbRepositorires.execute({
    asyncFunction: signOut,
  });
};


export interface IResetPasswordDTO {
  oobCode: string | null,
  newPassword: string
}

const resetPass = (payload: IResetPasswordDTO) => {
  return fbRepositorires.execute({
    asyncFunction: confirmPasswordReset,
    payload: payload
  })
};

const getProfile = () => {
  return {};
};

const updateProfile = (payload: any) => {
  return httpRepository.execute({
    path: '/api/Users/Profile',
    method: 'put',
    showSuccess: false,
    payload,
    convert: res => {
      return new User(res);
    },
  });
};

const uploadAvatar = (payload: any) => {
  return httpRepository.execute({
    path: 'api/Users',
    method: 'put',
    payload,
  });
};

const updateProfileUser = (id: any, payload: any) => {
  return httpRepository.execute({
    path: `api/Users/${id}`,
    method: 'put',
    payload,
    config: { isPrivate: true, isFormData: true },
  });
};

export default {
  register,
  login,
  logout,
  resetPass,
  forgotPass,
  CheckRecoveryToken,
  updatePassword,
  getProfile,
  uploadAvatar,
  updateProfile,
  updateProfileUser,
};
