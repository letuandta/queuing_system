
class DeviceEntity{

    id: string = '';
    deviceId: String = '';
    deviceName: string = '';
    deviceType: string = '';
    IPAddress: string = '';
    signInName: string = '';
    password: string = '';
    activeStatus: boolean = true;
    connectStatus: boolean = true;
    serviceUse: string = '';
    key: number = 0;
  
    constructor(user?: Partial<DeviceEntity>) {
      if (!user) {
        return;
      }
      Object.assign(this, user);
    }
  }



  export default DeviceEntity;