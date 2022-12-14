import React, { useEffect } from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Avatar, Col, Row, Input, Select, notification, Spin, Checkbox } from 'antd';
import { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { FirebaseConfig } from 'src/firebase/configs';
import { useNavigate, useParams } from "react-router-dom";
import { routerViewAddRole, routerViewSettingManageRole, routerViewSetting, routerViewUpdateRole } from '../router';
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
import { prevButton } from '@assets/svg';



const UpdateRole: React.FC = () => {
    const { roleId } = useParams()
    const navigate = useNavigate()
    const { formatMessage } = useAltaIntl();
    const { getRule, changeRule } = rulePresenter;
    const getRoleById = useSingleAsync(getRule);
    const changeNewRole = useSingleAsync(changeRule);
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState<boolean>(true)
    const [role, setRole] = useState<Partial<RuleEntity>>({
        key: 7,
        name: '',
        total: 1,
        description: ''
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

        getRoleById.execute(roleId)
            .then((response) => {
                setRole(response.data)
                setLoading(false)
            })
            .catch(() => {
                errorNotification("???? c?? l???i s???y ra")
            })

    }, [])


    const handleChangeRole = () => {
        setLoading(prev => !prev)
        changeNewRole.execute(roleId, role)
            .then((response) => {
                if (response.status) {
                    setLoading(prev => !prev);
                    successNotification("C???p nh???t th??nh c??ng");
                }

            })
            .catch(() => {
                setLoading(prev => !prev)
                errorNotification("???? c?? l???i s???y ra")
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
            <MainTitleComponent breadcrumbs={[routerViewSetting, routerViewSettingManageRole, routerViewUpdateRole]} title={'rule.add'} classTitle='default-title' />
            <div className="add_setting">
                <div className="content__add">
                    <div className="sub__title__add">
                        Th??ng tin thi???t b???
                    </div>
                    <div className="body__add">
                        <Row>
                            <Col span={12}>
                                <p className="name__add">{formatMessage('rule.name')} <span style={{ color: 'red' }}>*</span></p>
                                <Input value={role.name} className='add__input' placeholder="Nh??p t??n vai tr??" onChange={(event) => setRole(prev => ({ ...prev, name: event.target.value }))} />
                                <br />
                                <br />
                                <p className="name__add">{formatMessage('rule.description')} <span style={{ color: 'red' }}>*</span></p>
                                <TextArea value={role.description} rows={6} className='add__input' placeholder="Nh???p m?? t???" onChange={(event) => setRole(prev => ({ ...prev, description: event.target.value }))} />
                                <br />
                                <br />
                                <small><span style={{ color: 'red' }}>*</span> L?? tr?????ng th??ng tin b???t bu???c</small>
                            </Col>
                            <Col span={12}>
                                <p className="name__add">{'Ph??n quy???n ch???c n??ng'} <span style={{ color: 'red' }}>*</span></p>
                                <div className='delegation'>
                                    <div className="sub__title__add">
                                        Nh??m ch???c n??ng A
                                    </div>
                                    <div>
                                        <Row>
                                            <Col span={24}>
                                                <Checkbox value="A">T???t c???</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Ch???c n??ng x</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Ch???c n??ng y</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Ch???c n??ng z</Checkbox>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="sub__title__add">
                                        Nh??m ch???c n??ng B
                                    </div>
                                    <div>
                                        <Row>
                                            <Col span={24}>
                                                <Checkbox value="A">T???t c???</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Ch???c n??ng x</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Ch???c n??ng y</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="A">Ch???c n??ng z</Checkbox>
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
                    <div className="btn__add btn__add_setting" onClick={handleChangeRole}>
                        {formatMessage('rule.update')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateRole