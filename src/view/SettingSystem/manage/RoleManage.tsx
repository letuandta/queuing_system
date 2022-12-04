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
import { routerViewSetting, routerViewSettingManageRole } from '../router';
import RuleEntity from '@modules/rule/entity';
import rulePresenter from '@modules/rule/presenter';

const RoleManage = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string>('');

  const idChooses = 'id';
  const columns: ColumnsType<RuleEntity> = [
    {
      title: 'rule.name',
      dataIndex: 'name',
      align: 'left'
    },
    {
      title: 'rule.user.total',
      dataIndex: 'total',
      align: 'left'
    },
    {
      title: 'rule.description',
      dataIndex: 'description',
      align: 'left'
    },
    {
      title: '',
      render: (action: any, record: any) => {

        return (
          <>
            <Link
              to={`/setting/manage/role/update/${record.id}`}
              style={{ textDecoration: "underline", color: "#4277FF", }}
            >Cập nhật</Link>
          </>

        )
      }
    }
  ]

  useEffect(() => {
    table.fetchData({ option: { search: search } });
  }, [search, , table]);

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };

  return (
    <div className='setting-page'>
      <MainTitleComponent breadcrumbs={[routerViewSetting, routerViewSettingManageRole]} title={'Danh sách vai trò'} classTitle='default-title' />
      <div className="main-card">
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
          apiServices={rulePresenter.getRules}
          translateFirstKey="rule"
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
          <p>{formatMessage('rule.add')}</p>
        </div>
      </Link>

    </div>
  );
};

export default RoleManage;