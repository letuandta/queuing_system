import React, { useEffect } from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Col, Row, notification, Spin } from 'antd';
import { useState } from 'react';
import { routerViewProvideNumber, routerViewDetailProvide } from '../router';
import '../style.scss'
import { Link, useParams } from 'react-router-dom';
import { useSingleAsync } from '@shared/hook/useAsync';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { ReactSVG } from 'react-svg';
import { backButton } from '@assets/svg';
import providePresenter from '@modules/provide/presenter';
import ProvideEntity from '@modules/provide/entity';
import CircleLabel from '@shared/components/CircleLabel';
import moment from 'moment';



const DetailProvide = () => {
    const { provideId } = useParams()
    const [api, contextHolder] = notification.useNotification();
    const { formatMessage } = useAltaIntl();
    const { getProvide } = providePresenter;
    const getProvideById = useSingleAsync(getProvide);
    const [provide, setProvide] = useState<ProvideEntity | null>(null);

    const openNotification = (description: string) => {
        api.error({
            message: 'ERROR',
            description: description,
            placement: 'top',
        });
    };

    useEffect(() => {

        getProvideById.execute(provideId)
            .then((response) => {
                setProvide(response.data)
                console.log(response.data)
            })
            .catch(() => {
                openNotification("Đã có lỗi sảy ra")
            })

    }, [])



    return (
        <div className='detail__device_page'>
            {contextHolder}
            <MainTitleComponent breadcrumbs={[routerViewProvideNumber, routerViewDetailProvide]} title={'device.detail'} classTitle='default-title' />
            <div className="detail_device">
                <div className="content__detail">
                    <div className="sub__title__detail">
                        Thông tin thiết bị
                    </div>
                    <div className="body__detail">
                        {
                            provide === null
                                ? <Spin />
                                : <Row>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong style={{ marginRight: '2rem' }}>{formatMessage('provide.Name')}:  </strong>
                                                {provide?.Name}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong style={{ marginRight: '2rem' }}>{formatMessage('provide.device')}:  </strong>
                                                {provide?.device}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong style={{ marginRight: '2rem' }}>{formatMessage('provide.service')}:  </strong>
                                                {provide?.service}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span style={{ display: 'flex' }}>
                                                <strong style={{ marginRight: '2rem' }}>{formatMessage('provide.status')}:  </strong>

                                                {
                                                    provide?.status ?
                                                        provide.status === 'Đang chờ' ? <CircleLabel text={provide.status} colorCode="blue" />
                                                            : provide.status === 'Đã sử dụng' ? <CircleLabel text={provide.status} colorCode="grey" />
                                                                : <CircleLabel text={provide.status} colorCode="red" />
                                                        : ''
                                                }
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong style={{ marginRight: '2rem' }}>{formatMessage('provide.order')}:  </strong>
                                                {provide?.order}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong style={{ marginRight: '2rem' }}>{formatMessage('provide.phone')}:</strong>
                                                {provide?.phone}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong style={{ marginRight: '2rem' }}>{formatMessage('provide.start')}:</strong>
                                                {moment(provide.start).format('HH:mm - DD/MM/YYYY')}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong style={{ marginRight: '2rem' }}>{formatMessage('provide.email')}:</strong>
                                                {provide?.email}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div>
                                            <span>
                                                <strong style={{ marginRight: '2rem' }}>{formatMessage('provide.end')}:</strong>
                                                {moment(provide.end).format('HH:mm - DD/MM/YYYY')}
                                            </span>
                                        </div>
                                    </Col>

                                </Row>
                        }

                    </div>
                </div>
            </div>
            <Link to={`/provide`}>
                <div className='btn_add_device'>
                    <ReactSVG src={backButton} />
                    <p>{formatMessage('provide.back')}</p>
                </div>
            </Link>
        </div>
    )
}

export default DetailProvide