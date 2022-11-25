import React, { useEffect } from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { Col, Row, Input, Select, notification, Spin } from 'antd';
import { useState } from 'react';
import { routerViewDetailService, routerViewService } from '../router';
import '../style.scss'
import { useParams } from 'react-router-dom';
import { useSingleAsync } from '@shared/hook/useAsync';
import { useAltaIntl } from '@shared/hook/useTranslate';
import servicePresenter from '@modules/service/presenter';
import ServiceEntity from '@modules/service/entity';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import SearchComponent from '@shared/components/SearchComponent';
import { ColumnsType } from 'antd/lib/table';
import CircleLabel from '@shared/components/CircleLabel';
const dataTable = require('./fakedata/data.json');


const DeatailService = () => {

    const table = useTable();
    const { serviceId } = useParams()
    const [api, contextHolder] = notification.useNotification();
    const { formatMessage } = useAltaIntl();
    const { getService } = servicePresenter;
    const getServiceById = useSingleAsync(getService);
    const [loading, setLoading] = useState<boolean>(false)
    const [service, setService] = useState<ServiceEntity | null>(null);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilterOption] = useState<any>();

    const columns: ColumnsType = [
        {
            title: 'Số thứ tự',
            dataIndex: 'STT',
            align: 'left'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: boolean) => (
                <>
                    {status ? <CircleLabel text={formatMessage('common.active')} colorCode="green" /> :
                        <CircleLabel text={formatMessage('common.deactive')} colorCode="red" />
                    }
                </>
            )
        }
    ];

    const openNotification = (description: string) => {
        api.error({
            message: 'ERROR',
            description: description,
            placement: 'top',
        });
    };

    useEffect(() => {
        getServiceById.execute(serviceId)
            .then((response) => {
                setService(response.data)
                setLoading(prev => !prev)
            })
            .catch(() => {
                setLoading(prev => !prev)
                openNotification("Đã có lỗi sảy ra")
            });
        table.fetchData({ option: { search: search, filter: { ...filter } } });
    }, [search, filter, table])

    const handleSearch = (searchKey: string) => {
        setSearch(searchKey);
    };



    return (
        <div className='detail__service_page'>
            {contextHolder}
            <MainTitleComponent breadcrumbs={[routerViewService, routerViewDetailService]} title={'service.detail'} classTitle='default-title' />
            <div className="detail_service">
                <div className="content__detail">
                    <Row gutter={16} justify='space-between'>
                        <Col span={8}>
                            <div className="sub__title__detail">
                                Thông tin thiết bị
                            </div>
                            <div className="body__detail">
                                {!loading &&
                                    <Spin />}
                                <div>
                                    <span>
                                        <strong>{formatMessage('service.serviceId')} : </strong> {service?.serviceId}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <strong>{formatMessage('service.serviceName')} : </strong>{service?.serviceName}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <strong>{formatMessage('service.description')} : </strong> {service?.description}
                                    </span>
                                </div>
                            </div>
                            <div className="sub__title__detail">
                                Quy tắt cấp số
                            </div>
                            <div className="body__detail">
                                {!loading &&
                                    <Spin />}
                                <div>
                                    <span>
                                        <strong>Tăng tự động : </strong>
                                        <div className='number-detail'>{service?.provideRule?.autoFrom}</div>
                                        đến
                                        <div className='number-detail'>{service?.provideRule?.autoTo}</div>
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <strong>{formatMessage('service.prefix')} : </strong>
                                        <div className='number-detail'>{service?.provideRule?.prefix}</div>
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <strong>{formatMessage('service.surfix')} : </strong>
                                        <div className='number-detail'>{service?.provideRule?.surfix}</div>
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <strong>{formatMessage('service.resetDaily')}</strong>
                                        <p>Ví dụ: 201 - 2001</p>
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col span={14}>
                            <div className="body__detail">
                                <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">

                                    <div className="d-flex flex-column ">
                                        <div className="label-select">{formatMessage('common.keyword')}</div>
                                        <SearchComponent
                                            onSearch={handleSearch}
                                            placeholder={'common.keyword'}
                                            classNames="mb-0 search-table"
                                        />
                                    </div>
                                </div>
                                <TableComponent
                                    defaultOption={filter}
                                    translateFirstKey="device"
                                    register={table}
                                    columns={columns}
                                    dataSource={dataTable}
                                    disableFirstCallApi={true}
                                />

                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
        </div>
    )
}

export default DeatailService