
class DeviceEntity {

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

  constructor(device?: Partial<DeviceEntity>) {
    if (!device) {
      return;
    }
    Object.assign(this, device);
  }
}



export default DeviceEntity;