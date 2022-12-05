import React from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Avatar, Col, Row, Input, Select, notification, Spin } from 'antd';
import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { useNavigate } from "react-router-dom";
import { routerViewAddDevice, routerViewDevice } from '../router';
import '../style.scss'
import SelectAndLabelComponent, { ISelectAndLabel } from '@shared/components/SelectAndLabelComponent';
import ISelect from '@core/select';
import DeviceEntity from '@modules/device/entity';
import { useAltaIntl } from '@shared/hook/useTranslate';
import devicePresenter from '@modules/device/presenter';
import { useSingleAsync } from '@shared/hook/useAsync';



const AddDevice: React.FC = () => {
    const navigate = useNavigate()
    const { formatMessage } = useAltaIntl();
    const { addDevice } = devicePresenter;
    const addNewDevice = useSingleAsync(addDevice);
    const [api, contextHolder] = notification.useNotification();
    const OPTIONS = [' Khám tim mạch', ' khám sản - phụ khoa', ' khám răng hàm mặt', ' khám tai mũi họng', ' khám hô hấp', ' khám tổng quát'];
    const [loading, setLoading] = useState<boolean>(false)
    const [deviceId, setDeviceId] = useState('')
    const [deviceName, setDeviceName] = useState('')
    const [deviceType, setdeviceType] = useState('')
    const [IPAddress, setIPAddress] = useState('')
    const [signInName, setSignInName] = useState('')
    const [password, setPassword] = useState('')
    const [servicesUse, setServiceUse] = useState<string[]>([]);
    const device: Partial<DeviceEntity> = {
        deviceId: deviceId,
        deviceName: deviceName,
        deviceType: deviceType,
        IPAddress: IPAddress,
        signInName: signInName,
        password: password,
        activeStatus: true,
        connectStatus: true,
        serviceUse: `${servicesUse}`,
        key: 40,
    }

    const onSelectDeviceTypeChange = (value: string) => {
        setdeviceType(value);
    }


    const openNotification = (description: string) => {
        api.error({
            message: 'ERROR',
            description: description,
            placement: 'top',
        });
    };

    const handleAddDevice = () => {
        setLoading(prev => !prev)
        addNewDevice.execute(device)
            .then((response) => {
                if (response.status) navigate('/device')
            })
            .catch(() => {
                setLoading(prev => !prev)
                openNotification("Đã có lỗi sảy ra")
            })
    }


    const handleCancle = () => {
        navigate('/device')
    }

    const filteredOptions = OPTIONS.filter(o => !servicesUse.includes(o));

    const dataString: ISelect[] = [{ label: 'Kiosk', value: "Kiosk" }, { label: 'Dispaly counter', value: "Dispaly counter" }];
    const selectTypeDevice: ISelectAndLabel = { textLabel: 'Loại thiết bị', dataString, keyLabel: "deviceType" };

    return (
        <div className='add__device_page'>
            {contextHolder}
            {loading &&
                <div className='spin_loading'>
                    <Spin />
                </div>}
            <MainTitleComponent breadcrumbs={[routerViewDevice, routerViewAddDevice]} title={'device.add'} classTitle='default-title' />
            <div className="add_device">
                <div className="content__add">
                    <div className="sub__title__add">
                        Thông tin thiết bị
                    </div>
                    <div className="body__add">
                        <Row>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('device.deviceId')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhâp mã thiết bị" onChange={(event) => setDeviceId(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <SelectAndLabelComponent
                                    key={selectTypeDevice.name}
                                    onChange={onSelectDeviceTypeChange}
                                    dataString={selectTypeDevice.dataString}
                                    textLabel={selectTypeDevice.textLabel}
                                    className={''}
                                    require={true}
                                    placeholder={'Chon loai thiet bi'}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('device.deviceName')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tên thiết bị" onChange={(event) => setDeviceName(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('device.deviceSignInName')}  <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tài khoản" onChange={(event) => setSignInName(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('device.IPAddress')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập địa chỉ IP" onChange={(event) => setIPAddress(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('device.password')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập mật khẩu" onChange={(event) => setPassword(event.target.value)} />
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 16 }}>
                            <Col span={24}>
                                <p className="name__add">{formatMessage('device.serviceUse')} <span style={{ color: 'red' }}>*</span></p>
                            </Col>
                            <Col span={24}>
                                <Select
                                    className="add__service"
                                    mode="multiple"
                                    placeholder="Nhập dịch vụ sử dụng"
                                    value={servicesUse}
                                    onChange={setServiceUse}
                                    options={filteredOptions.map(item => ({
                                        value: item,
                                        label: item,
                                    }))}
                                />
                            </Col>
                            <Col span={24}>
                                <small><span style={{ color: 'red' }}>*</span> Là trường thông tin bắt buộc</small>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="action__add">
                    <div className="btn__add btn_cancel" onClick={handleCancle}>
                        {formatMessage('common.cancel')}
                    </div>
                    <div className="btn__add btn__add_device" onClick={handleAddDevice}>
                        {formatMessage('device.add')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDevice