import React, { useEffect } from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Avatar, Col, Row, Input, Select, notification, Spin } from 'antd';
import { useState } from 'react';
import { routerViewAddDevice, routerViewDetailDevice, routerViewDevice } from '../router';
import '../style.scss'
import { Link, useParams } from 'react-router-dom';
import devicePresenter from '@modules/device/presenter';
import { useSingleAsync } from '@shared/hook/useAsync';
import { useAltaIntl } from '@shared/hook/useTranslate';
import DeviceEntity from '@modules/device/entity';
import { ReactSVG } from 'react-svg';
import { addButton } from '@assets/svg';



const DetailDevice = () => {
    const { deviceId } = useParams()
    const [api, contextHolder] = notification.useNotification();
    const { formatMessage } = useAltaIntl();
    const { getDevice } = devicePresenter;
    const getDeviceById = useSingleAsync(getDevice);
    const [device, setDevice] = useState<DeviceEntity | null>(null);

    const openNotification = (description: string) => {
        api.error({
            message: 'ERROR',
            description: description,
            placement: 'top',
        });
    };

    useEffect(() => {

        getDeviceById.execute(deviceId)
            .then((response) => {
                setDevice(response.data)
                console.log(response.data)
            })
            .catch(() => {
                openNotification("Đã có lỗi sảy ra")
            })

    }, [])



    return (
        <div className='detail__device_page'>
            {contextHolder}
            <MainTitleComponent breadcrumbs={[routerViewDevice, routerViewDetailDevice]} title={'device.detail'} classTitle='default-title' />
            <div className="detail_device">
                <div className="content__detail">
                    <div className="sub__title__detail">
                        Thông tin thiết bị
                    </div>
                    <div className="body__detail">
                        {
                            device === null
                                ? <Spin />
                                : <Row>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong>{formatMessage('device.deviceId')}:  </strong>
                                                {device?.deviceId}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong>{formatMessage('device.deviceType')}:  </strong>
                                                {device?.deviceType}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong>{formatMessage('device.deviceName')}:  </strong>
                                                {device?.deviceName}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong>{formatMessage('device.deviceSignInName')}:  </strong>
                                                {device?.signInName}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong>{formatMessage('device.IPAddress')}:  </strong>
                                                {device?.IPAddress}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong>{formatMessage('device.password')}:  </strong>
                                                {device?.password}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <div>
                                            <span>
                                                <strong>{formatMessage('device.serviceUse')}:</strong>
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <div>
                                            <span>
                                                {device?.serviceUse}
                                            </span>
                                        </div>
                                    </Col>

                                </Row>
                        }

                    </div>
                </div>
            </div>
            <Link to={'/device/update'}>
                <div className='btn_add_device'>
                    <ReactSVG src={addButton} />
                    <p>{formatMessage('device.update')}</p>
                </div>
            </Link>
        </div>
    )
}

export default DetailDevice