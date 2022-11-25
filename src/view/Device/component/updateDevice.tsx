import React, { useEffect } from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Avatar, Col, Row, Input, Select, notification, Spin } from 'antd';
import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { useNavigate, useParams } from "react-router-dom";
import { routerViewAddDevice, routerViewDevice, routerViewUpdateDevice } from '../router';
import '../style.scss'
import SelectAndLabelComponent, { ISelectAndLabel } from '@shared/components/SelectAndLabelComponent';
import ISelect from '@core/select';
import DeviceEntity from '@modules/device/entity';
import { useAltaIntl } from '@shared/hook/useTranslate';
import devicePresenter from '@modules/device/presenter';
import { useSingleAsync } from '@shared/hook/useAsync';
import { prevButton } from '@assets/svg';



const UpdateDevice: React.FC = () => {
    const { deviceIdParam } = useParams()
    const navigate = useNavigate()
    const { formatMessage } = useAltaIntl();
    const { getDevice, changeDevice } = devicePresenter;
    const changeNewDevice = useSingleAsync(changeDevice);
    const getDeviceById = useSingleAsync(getDevice);
    const [api, contextHolder] = notification.useNotification();
    const OPTIONS = [' Khám tim mạch', ' khám sản - phụ khoa', ' khám răng hàm mặt', ' khám tai mũi họng', ' khám hô hấp', ' khám tổng quát'];
    const [loading, setLoading] = useState<boolean>(true)
    const [servicesUse, setServiceUse] = useState<string[]>([]);
    const [device, setDevice] = useState<Partial<DeviceEntity>>({
        deviceId: '',
        deviceName: '',
        deviceType: '',
        IPAddress: '',
        signInName: '',
        password: '',
        activeStatus: true,
        connectStatus: true,
        serviceUse: '',
        key: 31,
    })


    const errorNotification = (description: string) => {
        api.error({
            message: 'ERROR',
            description: description,
            placement: 'top',
        });
    };

    const successNotification = (description: string) => {
        api.success({
            message: 'SUCESS',
            description: description,
            placement: 'top',
        });
    };


    useEffect(() => {

        getDeviceById.execute(deviceIdParam)
            .then((response) => {
                setDevice(response.data)
                setLoading(false)
            })
            .catch(() => {
                errorNotification("Đã có lỗi sảy ra")
            })

    }, [])

    console.log("deviceeeee", device);


    const onSelectDeviceTypeChange = (value: string) => {
        console.log(value);

        setDevice(prev => ({ ...prev, deviceType: value }))
    }

    const onSelectServiceUseChange = (value: string[]) => {
        setDevice(prev => ({ ...prev, serviceUse: `${value}` }))
    }

    const convertDeviceServiceUse = () => {
        let service = device.serviceUse?.split(',');
        if (service) return service
        return []
    }


    const handleChangeDevice = () => {
        setLoading(prev => !prev)
        changeNewDevice.execute(deviceIdParam, device)
            .then((response) => {
                if (response.status) {
                    setLoading(prev => !prev);
                    successNotification("Cập nhật thành công");
                }

            })
            .catch(() => {
                setLoading(prev => !prev)
                errorNotification("Đã có lỗi sảy ra")
            })
    }

    const filteredOptions = OPTIONS.filter(o => {
        let service = convertDeviceServiceUse()
        return !service.includes(o)
    })

    const handleCancle = () => {
        navigate('/device')
    }


    const dataString: ISelect[] = [{ label: 'Kiosk', value: "Kiosk" }, { label: 'Dispaly counter', value: "Dispaly counter" }];
    const selectTypeDevice: ISelectAndLabel = { textLabel: 'Loại thiết bị', dataString, keyLabel: "deviceType" };

    return (
        <div className='add__device_page'>
            {contextHolder}
            {loading &&
                <div className='spin_loading'>
                    <Spin />
                </div>}
            <MainTitleComponent breadcrumbs={[routerViewDevice, routerViewUpdateDevice]} title={'device.add'} classTitle='default-title' />
            <div className="add_device">
                <div className="content__add">
                    <div className="sub__title__add">
                        Thông tin thiết bị
                    </div>
                    <div className="body__add">
                        <Row>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('device.deviceId')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' value={`${device.deviceId}`} placeholder="Nhâp mã thiết bị" onChange={(event) => setDevice(prev => ({ ...prev, deviceId: event.target.value }))} />
                            </Col>
                            <Col span={12}>
                                <SelectAndLabelComponent
                                    key={selectTypeDevice.name}
                                    value={device.deviceType}
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
                                <Input className='add__input' value={device.deviceName} placeholder="Nhập tên thiết bị" onChange={(event) => setDevice(prev => ({ ...prev, deviceName: event.target.value }))} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('device.deviceSignInName')}  <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' value={device.signInName} placeholder="Nhập tài khoản" onChange={(event) => setDevice(prev => ({ ...prev, signInName: event.target.value }))} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('device.IPAddress')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' value={device.IPAddress} placeholder="Nhập địa chỉ IP" onChange={(event) => setDevice(prev => ({ ...prev, IPAddress: event.target.value }))} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('device.password')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' value={device.password} placeholder="Nhập mật khẩu" onChange={(event) => setDevice(prev => ({ ...prev, password: event.target.value }))} />
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
                                    value={convertDeviceServiceUse()}
                                    onChange={onSelectServiceUseChange}
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
                    <div className="btn__add btn__add_device" onClick={handleChangeDevice}>
                        {formatMessage('device.update')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateDevice