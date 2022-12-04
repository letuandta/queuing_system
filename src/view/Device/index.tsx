import './style.scss';

import { Popover, Space } from 'antd';
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
import { routerViewDevice } from './router';
import devicePresenter from '@modules/device/presenter';
import DeviceEntity from '@modules/device/entity';
import { ReactSVG } from 'react-svg';
import { addButton } from '@assets/svg';
import { Link } from 'react-router-dom';

const dataTable = require('./fakedata/data.json');

const Device = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  const columns: ColumnsType<DeviceEntity> = [
    {
      title: 'device.deviceId',
      dataIndex: 'deviceId',
      align: 'left'
    },
    {
      title: 'device.deviceName',
      dataIndex: 'deviceName',
      align: 'left',
    },
    {
      title: 'device.IPAddress',
      dataIndex: 'IPAddress',
    },
    {
      title: 'device.activeStatus',
      dataIndex: 'activeStatus',
      render: (status: boolean) => (
        <>
          {status ? <CircleLabel text={formatMessage('common.active')} colorCode="green" /> :
            <CircleLabel text={formatMessage('common.deactive')} colorCode="red" />
          }
        </>
      )


      ,
    },
    {
      title: 'device.connectStatus',
      dataIndex: 'connectStatus',
      render: (connect: boolean) => (
        <>
          {connect ? <CircleLabel text={formatMessage('common.statusConnect')} colorCode="green" /> :
            <CircleLabel text={formatMessage('common.statusDisconnect')} colorCode="red" />
          }
        </>
      )
    },
    {
      title: 'device.serviceUse',
      dataIndex: 'serviceUse',
      render: text => <>
        <div style={{
          width: "200px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>{text}
        </div>
        <Popover content={text}>
          <a style={{ textDecoration: "underline", color: "#4277FF", }}>xem thêm</a>
        </Popover>

      </>,

    }, {
      title: 'device.detail',
      render: (action: any, record: any) => {
        return (
          <>
            <Link
              to={`/device/${record.id}`}
              style={{ textDecoration: "underline", color: "#4277FF", }}
            >Chi tiết</Link>
          </>

        )
      }
    },
    {
      title: 'device.update',
      render: (action: any, record: any) => {


        return (
          <>
            <Link
              to={`/device/update/${record.id}`}
              style={{ textDecoration: "underline", color: "#4277FF", }}
            >Cập nhật</Link>
          </>

        )
      }
    }
  ];

  const handleRefresh = () => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
    setSelectedRowKeys([]);
  };


  const dataActiveStatus: ISelect[] = [{ label: 'common.all', value: undefined },
  { label: 'common.active', value: "common.active" },
  { label: 'common.deactive', value: "common.deactive" }];
  const dataConnectStatus: ISelect[] = [{ label: 'common.all', value: undefined },
  { label: 'common.statusConnect', value: "common.statusConnect" },
  { label: 'common.statusDisconnect', value: "common.statusDisconnect" }];
  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'Trạng thái hoạt động', dataString: dataActiveStatus, keyLabel: "activeStatus" },
    { textLabel: 'Trạng thái kết nối', dataString: dataConnectStatus, keyLabel: "connectStatus" },
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
    <div className="device-page">
      <MainTitleComponent breadcrumbs={routerViewDevice} title={'device.title'} classTitle='default-title' />
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
          apiServices={devicePresenter.getDevices}
          defaultOption={filter}
          translateFirstKey="device"
          rowKey={res => res[idChooses]}
          register={table}
          columns={columns}
          onRowSelect={setSelectedRowKeys}
          dataSource={dataTable}
          disableFirstCallApi={true}
        />
      </div>
      <Link to={'/device/add'}>
        <div className='btn_add_device'>
          <ReactSVG src={addButton} />
          <p>{formatMessage('device.add')}</p>
        </div>
      </Link>

    </div>
  );
};

export default Device;
