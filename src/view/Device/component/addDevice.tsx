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



const AddDevice = () => {
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
    const [device, setDevice] = useState()
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));


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
                                <p className="name__add">Mã thiết bị <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhâp mã thiết bị" onChange={(event) => setDeviceId(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <SelectAndLabelComponent
                                    key={selectTypeDevice.name}
                                    dataString={selectTypeDevice.dataString}
                                    textLabel={selectTypeDevice.textLabel}
                                    className={''}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Tên thiết bị <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tên thiết bị" onChange={(event) => setDeviceName(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Tên đăng nhập <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập tài khoản" onChange={(event) => setDeviceusername(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <p className="name__add">Địa chỉ IP <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập địa chỉ IP" onChange={(event) => setDeviceIP(event.target.value)} />
                            </Col>
                            <Col span={12}>
                                <p className="name__add">Mật khẩu <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhập mật khẩu" onChange={(event) => setDevicepassword(event.target.value)} />
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 16 }}>
                            <Col span={24}>
                                <p className="name__add">Dịch vụ sử dụng <span style={{ color: 'red' }}>*</span></p>
                            </Col>
                            <Col span={24}>
                                <Select
                                    className="add__service"
                                    mode="multiple"
                                    placeholder="Nhập dịch vụ sử dụng"
                                    value={selectedItems}
                                    onChange={setSelectedItems}
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
                    <div className="btn__add btn_cancel">
                        Hủy bỏ
                    </div>
                    {/* <div className="btn__add btn__add_device" onClick={addDevice}>
                        Thêm thiết bị
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default AddDevice