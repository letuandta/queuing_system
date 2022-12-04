import React from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Avatar, Col, Row, Input, Select, notification, Spin, Checkbox } from 'antd';
import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { useNavigate } from "react-router-dom";
import { routerViewAddRole, routerViewSettingManageRole, routerViewSetting } from '../router';
import '../style.scss'
import SelectAndLabelComponent, { ISelectAndLabel } from '@shared/components/SelectAndLabelComponent';
import ISelect from '@core/select';
import DeviceEntity from '@modules/device/entity';
import { useAltaIntl } from '@shared/hook/useTranslate';
import devicePresenter from '@modules/device/presenter';
import { useSingleAsync } from '@shared/hook/useAsync';
import TextArea from 'antd/lib/input/TextArea';
import RuleEntity from '@modules/rule/entity';
import rulePresenter from '@modules/rule/presenter';



const AddRole: React.FC = () => {
    const navigate = useNavigate()
    const { formatMessage } = useAltaIntl();
    const { addRule } = rulePresenter;
    const addNewDevice = useSingleAsync(addRule);
    const [api, contextHolder] = notification.useNotification();
    const OPTIONS = [' Khám tim mạch', ' khám sản - phụ khoa', ' khám răng hàm mặt', ' khám tai mũi họng', ' khám hô hấp', ' khám tổng quát'];
    const [loading, setLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const role: Partial<RuleEntity> = {
        key: 7,
        name: name,
        total: 1,
        description: description
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
        addNewDevice.execute(role)
            .then((response) => {
                if (response.status) navigate('/setting/manage/role')
            })
            .catch(() => {
                setLoading(prev => !prev)
                openNotification("Đã có lỗi sảy ra")
            })
    }


    const handleCancle = () => {
        navigate('/setting/manage/role')
    }


    return (
        <div className='add__setting_page'>
            {contextHolder}
            {loading &&
                <div className='spin_loading'>
                    <Spin />
                </div>}
            <MainTitleComponent breadcrumbs={[routerViewSetting, routerViewSettingManageRole, routerViewAddRole]} title={'rule.add'} classTitle='default-title' />
            <div className="add_setting">
                <div className="content__add">
                    <div className="sub__title__add">
                        Thông tin thiết bị
                    </div>
                    <div className="body__add">
                        <Row>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('rule.name')} <span style={{ color: 'red' }}>*</span></p>
                                <Input className='add__input' placeholder="Nhâp tên vai trò" onChange={(event) => setName(event.target.value)} />
                                <br />
                                <br />
                                <p className="name__add">{formatMessage('rule.description')} <span style={{ color: 'red' }}>*</span></p>
                                <TextArea rows={6} className='add__input' placeholder="Nhập mô tả" onChange={(event) => setDescription(event.target.value)} />
                                <br />
                                <br />
                                <small><span style={{ color: 'red' }}>*</span> Là trường thông tin bắt buộc</small>
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{'Phân quyền chức năng'} <span style={{ color: 'red' }}>*</span></p>
                                <div className='delegation'>
                                    <div className="sub__title__add">
                                        Nhóm chức năng A
                                    </div>
                                    <div>
                                        <Row>
                                            <Col span={24}>
                                                <Checkbox value="A">Tất cả</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Chức năng x</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Chức năng y</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Chức năng z</Checkbox>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="sub__title__add">
                                        Nhóm chức năng B
                                    </div>
                                    <div>
                                        <Row>
                                            <Col span={24}>
                                                <Checkbox value="A">Tất cả</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Chức năng x</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Chức năng y</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Chức năng z</Checkbox>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="action__add">
                    <div className="btn__add btn_cancel" onClick={handleCancle}>
                        {formatMessage('common.cancel')}
                    </div>
                    <div className="btn__add btn__add_setting" onClick={handleAddDevice}>
                        {formatMessage('rule.add')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRole