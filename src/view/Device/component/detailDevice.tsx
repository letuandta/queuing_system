import React from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Avatar, Col, Row, Input, Select } from 'antd';
import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { useNavigate } from "react-router-dom";
import { routerViewAddDevice, routerViewDevice } from '../router';
import '../style.scss'
import SelectAndLabelComponent, { ISelectAndLabel } from '@shared/components/SelectAndLabelComponent';
import ISelect from '@core/select';



const DetailDevice = () => {
    const navigate = useNavigate()
    const db = FirebaseConfig.getInstance().fbDB
    const OPTIONS = ['Khám tim mạch', 'Khám sản - Phụ khoa', 'Khám răng hàm mặt', 'Khám tai mũi họng', 'Khám hô hấp', 'Khám tổng quát'];
    const [deviceId, setDeviceId] = useState('')
    const [deviceName, setDeviceName] = useState('')
    const [catedevice, setCatedevice] = useState('')
    const [deviceIP, setDeviceIP] = useState('')
    const [deviceusername, setDeviceusername] = useState('')
    const [devicepassword, setDevicepassword] = useState('')
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    const addDevice = async () => {
        // try {
        //     const docRef = await addDoc(collection(db, 'devices'), {
        //         deviceIP: deviceIP,
        //         deviceName: deviceName,
        //         deviceID: deviceId,
        //         deviceStatus: true,
        //         deviceConnect: true,
        //         detail: 'chi tiết',
        //         update: 'cập nhật',
        //         services: selectedItems
        //     })
        //     navigate('/device')

        // }
        // catch (e) {
        //     console.log(e);

    }

    const dataString: ISelect[] = [{ label: 'common.all', value: undefined }, { label: 'Kiosk', value: "Kiosk" }];
    const selectTypeDevice: ISelectAndLabel = { textLabel: 'Trạng thái hoạt động', dataString, keyLabel: "activeStatus" };

    return (
        <div className='add__device_page'>
            <MainTitleComponent breadcrumbs={[routerViewDevice, routerViewAddDevice]} title={'commom.device.add'} classTitle='default-title' />
            <div className="add_device">
                <div className="content__add">
                <div className="sub__title__add">
                        Thông tin thiết bị
                    </div>
                    <div className="body__add">
                        <Row>
                        <Col span={12}>
                            <div>
                                <span>
                                    <strong>Thiet bi</strong>
                                    lablablabla
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                        <div>
                                <span>
                                    <strong>Thiet bi</strong>
                                    lablablabla
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                        <div>
                                <span>
                                    <strong>Thiet bi</strong>
                                    lablablabla
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                        <div>
                                <span>
                                    <strong>Thiet bi</strong>
                                    lablablabla
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                        <div>
                                <span>
                                    <strong>Thiet bi</strong>
                                    lablablabla
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                        <div>
                                <span>
                                    <strong>Thiet bi</strong>
                                    lablablabla
                                </span>
                            </div>
                        </Col>
                        <Col span={24}>
                        <div>
                                <span>
                                    <strong>Thiet bi</strong>
                                </span>
                            </div>
                        </Col>
                        <Col span={24}>
                        <div>
                                <span>
                                    lablablablaaaaaasfsjDHDKJFSBKABHJKJFkjfhkhfkjfhjkfhkjhs
                                </span>
                            </div>
                        </Col>
                            
                        </Row>
                    </div>
                   </div>
            </div>
        </div>
    )
}

export default DetailDevice