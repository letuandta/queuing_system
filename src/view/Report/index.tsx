import './style.scss';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';
import ISelect from '@core/select';
import CircleLabel from '@shared/components/CircleLabel';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import SelectAndLabelComponent, {
  ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { routerViewReport } from './router';
import { ReactSVG } from 'react-svg';
import { addButton, downloadButton } from '@assets/svg';
import { Link } from 'react-router-dom';
import ProvideEntity from '@modules/provide/entity';
import moment from 'moment';
import DataPickerComponent from '@shared/components/DatePickerComponent';
import providePresenter from '@modules/provide/presenter';

const dataTable = [];

const Report = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  const columns: ColumnsType<ProvideEntity> = [
    {
      title: 'provide.order',
      dataIndex: 'order',
      align: 'left'
    },
    {
      title: 'provide.service',
      dataIndex: 'service',
      align: 'left'
    },
    {
      title: 'provide.start',
      dataIndex: 'start',
      render: (date: string) => (
        <>
          {
            moment(date).format('HH:mm - DD/MM/YYYY')
          }
        </>
      )
    },
    {
      title: 'provide.status',
      dataIndex: 'status',
      render: (status: string) => (
        <>
          {
            status ?
              status === 'Đang chờ' ? <CircleLabel text={status} colorCode="blue" />
                : status === 'Đã sử dụng' ? <CircleLabel text={status} colorCode="grey" />
                  : <CircleLabel text={status} colorCode="red" />
              : ''
          }
        </>
      )

    }, {
      title: 'provide.device',
      dataIndex: 'device',
      align: 'left'
    }
  ];





  useEffect(() => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
  }, [search, filter, table]);

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };

  const onChangeSelectStatus = (name: string | undefined) => (status: any) => {
    if (name && status) {
      setFilterOption((pre: any) => ({ ...pre, field: name, value: status }));
    }
  };
  return (
    <div className="report-page">
      <MainTitleComponent breadcrumbs={routerViewReport} />
      <div className="main-card">
        <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
          <div className="d-flex flex-row ">
            <DataPickerComponent
              label='Chọn thời gian'
            />
          </div>
        </div>
        <TableComponent
          apiServices={providePresenter.getProvides}
          defaultOption={filter}
          translateFirstKey="report"
          rowKey={res => res[idChooses]}
          register={table}
          columns={columns}
          onRowSelect={setSelectedRowKeys}
          dataSource={dataTable}
          disableFirstCallApi={true}
        />
      </div>
      <div className='btn_download'>
        <ReactSVG src={downloadButton} />
        <p>{'Tải về'}</p>
      </div>

    </div>
  );
};

export default Report;
