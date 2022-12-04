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

const AccountManage = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();

  const idChooses = 'id';
  const columns: ColumnsType<RuleEntity> = [
    {
      title: 'account.usename',
      dataIndex: 'usename',
      align: 'left'
    },
    {
      title: 'account.name',
      dataIndex: 'name',
      align: 'left'
    },
    {
      title: 'account.phone',
      dataIndex: 'phone',
      align: 'left'
    },
    {
      title: 'account.email',
      dataIndex: 'email',
      align: 'left'
    },
    {
      title: 'account.rule',
      dataIndex: 'rule',
      align: 'left'
    },
    {
      title: 'account.status',
      dataIndex: 'status',
      render: (connect: boolean) => (
        <>
          {connect ? <CircleLabel text={formatMessage('common.statusConnect')} colorCode="green" /> :
            <CircleLabel text={formatMessage('common.statusDisconnect')} colorCode="red" />
          }
        </>
      )
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

  const dataRoles: ISelect[] = [{ label: 'common.all', value: undefined },
  { label: 'Kê toán', value: "Kê toán" },
  { label: 'Bác sĩ', value: "Bác sĩ" },
  { label: 'Lễ tân', value: "Lễ tân" },
  { label: 'Quản lí', value: "Quản lí" },
  { label: 'Admin', value: "Admin" },
  { label: 'SuperAdmin', value: "SuperAdmin" },
  ];
  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'Tên vai trò', dataString: dataRoles, keyLabel: "role" }
  ];

  return (
    <div className='setting-page'>
      <MainTitleComponent breadcrumbs={[routerViewSetting, routerViewSettingManageAccount]} title={'Danh sách tài khoảng'} classTitle='default-title' />
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
          apiServices={accountPresenter.getAccounts}
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