import { IForgotPasswordDTO, ILoginDTO, IResetPasswordDTO } from '@modules/authentication/repository';
import { FirebaseConfig } from '../configs';


type IPayLoad = ILoginDTO | IForgotPasswordDTO | IResetPasswordDTO


function AuthenticationRepositoriesImpl() {
  const auth = FirebaseConfig.getInstance().auth;

  interface IParamsFirebaseAuth {
    asyncFunction: (...params: any[]) => Promise<any>,
    payload?: any
  }


  const execute = (
    {
      asyncFunction = () => {
        return new Promise<any>((resolve) => {
          resolve('Khong co ham nao duoc truyen vao');
        });
      },
      payload,
    }: IParamsFirebaseAuth,
  ) => {
    let args: any[] = [];
    if (payload !== undefined) { args = Object.values(payload); }
    console.log(args);

    return asyncFunction?.(auth, ...args);
  };



  // const execute = (asyncFunction: (...params: any[]) => Promise<any>, params: ILoginDTO) => {
  //     let args: any = Object.values(params);
  //     return asyncFunction?.(auth, ...args);
  // };

  return {
    execute,
  };
}

export const fbRepositorires = AuthenticationRepositoriesImpl();