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
import { routerViewService } from './router';
import DeviceEntity from '@modules/device/entity';
import { ReactSVG } from 'react-svg';
import { addButton } from '@assets/svg';
import { Link } from 'react-router-dom';
import servicePresenter from '@modules/service/presenter';
import ServiceEntity from '@modules/service/entity';
import DataPickerComponent from '@shared/components/DatePickerComponent';

const dataTable = require('./fakedata/data.json');

const Service = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<{ field: string | undefined, value: string | number | undefined }[]>(
    []
  );

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  const columns: ColumnsType<ServiceEntity> = [
    {
      title: 'service.serviceId',
      dataIndex: 'serviceId',
      align: 'left'
    },
    {
      title: 'service.serviceName',
      dataIndex: 'serviceName',
      align: 'left',
    },
    {
      title: 'service.description',
      dataIndex: 'description',
    },
    {
      title: 'service.activeStatus',
      dataIndex: 'activeStatus',
      render: (status: boolean) => (
        <>
          {status ? <CircleLabel text={formatMessage('common.active')} colorCode="green" /> :
            <CircleLabel text={formatMessage('common.deactive')} colorCode="red" />
          }
        </>
      )
    },
    {
      title: 'service.detail',
      render: (action: any, record: any) => {
        return (
          <>
            <Link
              to={`/service/${record.id}`}
              style={{ textDecoration: "underline", color: "#4277FF", }}
            >Chi tiết</Link>
          </>

        )
      }
    },
    {
      title: 'service.update',
      render: (action: any, record: any) => {
        return (
          <>
            <Link
              to={`/service/update/${record.id}`}
              style={{ textDecoration: "underline", color: "#4277FF", }}
            >Cập nhật</Link>
          </>

        )
      }
    }
  ];

  const handleRefresh = () => {
    table.fetchData({ option: { search: search, filter: filter } });
    setSelectedRowKeys([]);
  };


  const dataActiveStatus: ISelect[] = [{ label: 'common.all', value: 'all' },
  { label: 'common.active', value: "true" },
  { label: 'common.deactive', value: "false" }];
  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'Trạng thái hoạt động', dataString: dataActiveStatus, keyLabel: "activeStatus" },
  ];

  useEffect(() => {
    table.fetchData({ option: { search: search, filter: filter } });
  }, [search, filter, table]);

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };

  const onChangeSelectStatus = (name: string | undefined) => (status: any) => {
    if (name && status) {
      let filterTemp = filter
      let checkExist = filter.findIndex(obj => obj.field === name)

      if (checkExist >= 0) {
        filterTemp[checkExist].value = status
      }
      else {
        filter.push({ field: name, value: status })
      }

      setFilterOption(filterTemp.map(fil => fil));
    }
  };
  return (
    <div className="service-page">
      <MainTitleComponent breadcrumbs={routerViewService} title={'service.title'} classTitle='default-title' />
      <div className="main-card">
        <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
          <div className="d-flex flex-row ">
            {arraySelectFilter.map(item => (
              <SelectAndLabelComponent
                onChange={onChangeSelectStatus(item.keyLabel)}
                key={item.name}
                className={`margin-select ${item.keyLabel}`}
                dataString={item.dataString}
                textLabel={item.textLabel}
              />
            ))}
            <DataPickerComponent
              label='Chọn thời gian'
            />
          </div>
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
          apiServices={servicePresenter.getServices}
          // defaultOption={filter}
          translateFirstKey="service"
          rowKey={res => res[idChooses]}
          register={table}
          columns={columns}
          onRowSelect={setSelectedRowKeys}
          dataSource={dataTable}
          disableFirstCallApi={true}
        />
      </div>
      <Link to={'/service/add'}>
        <div className='btn_add_service'>
          <ReactSVG src={addButton} />
          <p>{formatMessage('service.add')}</p>
        </div>
      </Link>

    </div>
  );
};

export default Service;
