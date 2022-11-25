import React from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Button, Checkbox, Col, Form, Input, InputNumber, notification, Row, Spin } from 'antd';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { routerViewService, routerViewAddService } from '../router';
import '../style.scss'
import { useAltaIntl } from '@shared/hook/useTranslate';
import { useSingleAsync } from '@shared/hook/useAsync';
import ServiceEntity from '@modules/service/entity';
import TextArea from 'antd/lib/input/TextArea';
import servicePresenter from '@modules/service/presenter';



const AddService: React.FC = () => {
    const navigate = useNavigate()
    const { formatMessage } = useAltaIntl();
    const { addService } = servicePresenter;
    const addNewService = useSingleAsync(addService);
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState<boolean>(false)
    const [checkAuto, setCheckAuto] = useState<boolean>(false)
    const [checkPrefix, setCheckPrefix] = useState<boolean>(false)
    const [checkSurfix, setCheckSurfix] = useState<boolean>(false)
    const [checkReset, setCheckReset] = useState<boolean>(false)
    const [service, setService] = useState<Partial<ServiceEntity>>({
        serviceId: '',
        serviceName: '',
        description: '',
        activeStatus: true,
        key: 10,
        provideRule: {
            autoFrom: 0,
            autoTo: 0,
            prefix: 0,
            surfix: 0,
            resetDaily: true
        }
    })


    const openNotification = (description: string) => {
        api.error({
            message: 'ERROR',
            description: description,
            placement: 'top',
        });
    };

    const handleAddService = (value: any) => {
        value.provideRule.resetDaily = checkReset
        console.log(value);
        console.log({})
        setLoading(prev => !prev)
        addNewService.execute({ ...service, ...value })
            .then((response) => {
                if (response.status) navigate('/service')
            })
            .catch(() => {
                setLoading(prev => !prev)
                openNotification("Đã có lỗi sảy ra")
            })
    }

    const handleCancle = () => {
        navigate('/service')
    }

    return (
        <div className='main-form add__service_page'>
            {contextHolder}
            {loading &&
                <div className='spin_loading'>
                    <Spin />
                </div>}
            <MainTitleComponent breadcrumbs={[routerViewService, routerViewAddService]} title={'service.add'} classTitle='default-title' />
            <div className="add_service">
                <Form onFinish={handleAddService}>
                    <div className="content__add">
                        <div className="sub__title__add">
                            Thông tin dịch vụ
                        </div>
                        <div className="body__add">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label={formatMessage('service.serviceId')}
                                        name='serviceId'
                                        rules={
                                            [{ required: true }]
                                        }
                                    >
                                        <Input
                                            placeholder={formatMessage('service.serviceId')}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item
                                        label={formatMessage('service.serviceName')}
                                        name='serviceName'
                                        rules={
                                            [{ required: true }]
                                        }
                                    >
                                        <Input
                                            placeholder={formatMessage('service.serviceName')}
                                        ></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={formatMessage('service.description')}
                                        name='description'
                                        rules={
                                            [{ required: true }]
                                        }
                                    >
                                        <TextArea rows={4} />
                                    </Form.Item>
                                </Col>
                            </Row>


                        </div>
                        <div className="sub__title__add">
                            Thông tin dịch vụ
                        </div>
                        <div className="body__add">
                            <Row className='provide-rule'>
                                <Col span={12}>
                                    <Form.Item
                                        name='provideRule'
                                        className='service-autoNumber'
                                    >
                                        <Checkbox onChange={() => setCheckAuto(prev => (!prev))}>Tăng tự động {checkAuto && "từ: "}</Checkbox>
                                        {checkAuto && <>

                                            <Row align='middle' gutter={16}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name={['provideRule', 'autoFrom']}

                                                    >
                                                        <InputNumber />
                                                    </Form.Item>
                                                </Col>
                                                <span>Đến</span>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name={['provideRule', 'autoTo']}

                                                    >
                                                        <InputNumber />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </>}
                                    </Form.Item>

                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name='provideRule'
                                        className='service-autoNumber'
                                    >
                                        <Checkbox onChange={() => setCheckPrefix(prev => (!prev))}>Prefix {checkPrefix && ':'}</Checkbox>
                                        {checkPrefix && <>
                                            <Row align='middle' gutter={16}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name={['provideRule', 'prefix']}

                                                    >
                                                        <InputNumber />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </>}
                                    </Form.Item>

                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name='provideRule'
                                        className='service-autoNumber'
                                    >
                                        <Checkbox onChange={() => setCheckSurfix(prev => (!prev))}>Surfix {checkSurfix && ':'}</Checkbox>
                                        {checkSurfix && <>
                                            <Row align='middle' gutter={8}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        name={['provideRule', 'surfix']}

                                                    >
                                                        <InputNumber />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </>}
                                    </Form.Item>

                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name={['provideRule', 'resetDaily']}
                                        className='service-autoNumber'
                                    >
                                        <Checkbox onChange={() => setCheckReset(prev => (!prev))}>Reset mỗi ngày</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="action__add">
                        <div className="btn__add btn_cancel" onClick={handleCancle}>
                            {formatMessage('common.cancel')}
                        </div>
                        <div className="btn__add btn__add_service">
                            <Form.Item>
                                <Button htmlType='submit'>{formatMessage('service.add')}</Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AddService