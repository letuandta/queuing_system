import '../style.scss';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';

import MainTitleComponent from '@shared/components/MainTitleComponent';
import SearchComponent from '@shared/components/SearchComponent/SearchComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { ReactSVG } from 'react-svg';
import { addButton } from '@assets/svg';
import { Link } from 'react-router-dom';
import { routerViewSetting, routerViewSettingManageAccount } from '../router';
import RuleEntity from '@modules/rule/entity';
import rulePresenter from '@modules/rule/presenter';
import ISelect from '@core/select';
import SelectAndLabelComponent, { ISelectAndLabel } from '@shared/components/SelectAndLabelComponent';
import accountPresenter from '@modules/account/presenter';
import CircleLabel from '@shared/components/CircleLabel';
import DataPickerComponent from '@shared/components/DatePickerComponent';
import logPresenter from '@modules/log/presenter';
import moment from 'moment';

const AccountManage = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();

  const idChooses = 'id';
  const columns: ColumnsType<RuleEntity> = [
    {
      title: 'log.usename',
      dataIndex: 'usename',
      align: 'left'
    },
    {
      title: 'log.time',
      dataIndex: 'time',
      align: 'left',
      render: (date: string) => (
        <>
          {
            moment(date).format('DD/MM/YYYY HH:mm:ss')
          }
        </>
      )
    },
    {
      title: 'log.IP',
      dataIndex: 'IP',
      align: 'left'
    },
    {
      title: 'log.acctive',
      dataIndex: 'acctive',
      align: 'left'
    }
  ]

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
    <div className='setting-page'>
      <MainTitleComponent breadcrumbs={[routerViewSetting, routerViewSettingManageAccount]} title={'Danh sách tài khoảng'} classTitle='default-title' />
      <div className="main-card">
        <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
          <div className="d-flex flex-row ">
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
          apiServices={logPresenter.getLogs}
          translateFirstKey="account"
          defaultOption={filter}
          rowKey={res => res[idChooses]}
          register={table}
          columns={columns}
          onRowSelect={setSelectedRowKeys}
          disableFirstCallApi={true}
        />
      </div>
      <Link to={'/device/add'}>
        <div className='btn_add_setting'>
          <ReactSVG src={addButton} />
          <p>{formatMessage('account.add')}</p>
        </div>
      </Link>

    </div>
  );
};

export default AccountManage;