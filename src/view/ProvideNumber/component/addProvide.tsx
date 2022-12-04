import React from 'react'
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { notification, Spin } from 'antd';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { routerViewAddProvide, routerViewProvideNumber } from '../router';
import '../style.scss'
import SelectAndLabelComponent, { ISelectAndLabel } from '@shared/components/SelectAndLabelComponent';
import ISelect from '@core/select';
import DeviceEntity from '@modules/device/entity';
import { useAltaIntl } from '@shared/hook/useTranslate';
import devicePresenter from '@modules/device/presenter';
import { useSingleAsync } from '@shared/hook/useAsync';
import ProvideEntity from '@modules/provide/entity';
import providePresenter from '@modules/provide/presenter';



const AddProvide: React.FC = () => {
    const navigate = useNavigate()
    const { formatMessage } = useAltaIntl();
    const { addProvide } = providePresenter;
    const addNewProvide = useSingleAsync(addProvide);
    const [api, contextHolder] = notification.useNotification();
    const [serviceType, setServiceType] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const provide: Partial<ProvideEntity> = {
        key: 60,
        Name: 'Lê Tuấn Đat',
        service: serviceType,
        order: 2010060,
        start: '',
        end: '',
        device: 'Kiosk',
        status: 'Đang chờ',
        phone: '0123456789',
        email: 'LeTuanDat@gmail.com',
    }

    const onSelectDeviceTypeChange = (value: string) => {
        setServiceType(value);
    }


    const openNotification = (description: string) => {
        api.error({
            message: 'ERROR',
            description: description,
            placement: 'top',
        });
    };

    const getDateEnd = (date: Date, hour: number) => {
        date.setTime(date.getTime() + hour * 60 * 60 * 1000)
        console.log(date);

        return date
    }

    const handleAddProvide = () => {
        setLoading(prev => !prev)
        const date = new Date(Date.now())
        provide.start = date.toString()
        provide.end = getDateEnd(date, 8).toString()
        if (provide.service === '') {
            openNotification('Mời chọn dịch vụ trước')
            setLoading(prev => !prev)
        }
        else
            addNewProvide.execute(provide)
                .then((response) => {
                    if (response.status) navigate('/provide')
                })
                .catch(() => {
                    setLoading(prev => !prev)
                    openNotification("Đã có lỗi sảy ra")
                })
    }


    const handleCancle = () => {
        navigate('/provide')
    }

    const dataString: ISelect[] = [
        {
            label: 'Khám tim mạch',
            value: "Khám tim mạch"
        },
        {
            label: 'Khám sản - Phụ khoa',
            value: "Khám sản - Phụ khoa"
        },
        {
            label: 'Khám tổng quát',
            value: "Khám tổng quát"
        },
        {
            label: 'Khám răng hàm mặt',
            value: "Khám răng hàm mặt"
        },
        {
            label: 'Khám tai mũi họng',
            value: "Khám tai mũi họng"
        },
        {
            label: 'Khám hô hấp',
            value: "Khám hô hấp"
        },
    ];
    const selectTypeDevice: ISelectAndLabel = { textLabel: 'Loại dịch vụ', dataString, keyLabel: "serviceType" };

    return (
        <div className='add__provide_page'>
            {contextHolder}
            {loading &&
                <div className='spin_loading'>
                    <Spin />
                </div>}
            <MainTitleComponent breadcrumbs={[routerViewProvideNumber, routerViewAddProvide]} title={'provide.add'} classTitle='default-title' />
            <div className="add_provide">
                <div className="content__add">
                    <div className="sub__title__add">
                        CẤP SỐ MỚI
                    </div>
                    <p className='select-title'>Dịch vụ khách hàng lựa chọn</p>
                    <div className="body__add">
                        <SelectAndLabelComponent
                            value={''}
                            key={selectTypeDevice.name}
                            onChange={onSelectDeviceTypeChange}
                            dataString={selectTypeDevice.dataString}
                            className={''}
                            require={true}
                            placeholder={'Chọn dịch vụ'}
                        />
                    </div>
                    <br />
                    <br />
                    <div className="action__add">
                        <div className="btn__add btn_cancel" onClick={handleCancle}>
                            {formatMessage('common.cancel')}
                        </div>
                        <div className="btn__add btn__add_provide" onClick={handleAddProvide}>
                            {formatMessage('provide.print')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProvide