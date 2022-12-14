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
import { routerViewProvideNumber } from './router';
import { ReactSVG } from 'react-svg';
import { addButton } from '@assets/svg';
import { Link } from 'react-router-dom';
import ProvideEntity from '@modules/provide/entity';
import moment from 'moment';
import DataPickerComponent from '@shared/components/DatePickerComponent';
import providePresenter from '@modules/provide/presenter';

const dataTable = [];

const ProvideNumber = () => {
  const { formatMessage } = useAltaIntl();
  const table = useTable();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<{ field: string | undefined, value: string | number | undefined }[]>(
    []
  );

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  const columns: ColumnsType<ProvideEntity> = [
    {
      title: 'provide.order',
      dataIndex: 'order',
      align: 'left'
    },
    {
      title: 'provide.Name',
      dataIndex: 'Name',
      align: 'left',
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
      title: 'provide.end',
      dataIndex: 'end',
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
              status === '??ang ch???' ? <CircleLabel text={status} colorCode="blue" />
                : status === '???? s??? d???ng' ? <CircleLabel text={status} colorCode="grey" />
                  : <CircleLabel text={status} colorCode="red" />
              : ''
          }
        </>
      )

    }, {
      title: 'provide.device',
      dataIndex: 'device',
      align: 'left'
    },
    {
      title: 'provide.detail',
      render: (action: any, record: any) => {


        return (
          <>
            <Link
              to={`/provide/${record.id}`}
              style={{ textDecoration: "underline", color: "#4277FF", }}
            >Chi ti???t</Link>
          </>

        )
      }
    }
  ];



  const dataService: ISelect[] = [{ label: 'common.all', value: 'all' },
  { label: 'Kh??m tim m???ch', value: "Kh??m tim m???ch" },
  { label: 'Kh??m s???n - ph??? khoa', value: "Kh??m s???n - ph??? khoa" },
  { label: 'Kh??m tai m??i h???ng', value: "Kh??m tai m??i h???ng" },
  { label: 'Kh??m r??ng h??m m???t', value: "Kh??m r??ng h??m m???t" },
  { label: 'Kh??m t???ng qu??t', value: "Kh??m t???ng qu??t" },
  { label: 'Kh??m h?? h???p', value: "Kh??m h?? h???p" }];
  const dataStatus: ISelect[] = [{ label: 'common.all', value: 'all' },
  { label: '??ang ch???', value: "??ang ch???" },
  { label: '???? s??? d???ng', value: "???? s??? d???ng" },
  { label: 'B??? qua', value: "B??? qua" }];
  const dataDevice: ISelect[] = [{ label: 'common.all', value: 'all' },
  { label: 'Kiosk', value: "Kiosk" }];
  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'T??n d???ch v???', dataString: dataService, keyLabel: "service" },
    { textLabel: 'T??nh tr???ng', dataString: dataStatus, keyLabel: "status" },
    { textLabel: 'Ngu???n c???p', dataString: dataDevice, keyLabel: "device" },
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
    <div className="provide-page">
      <MainTitleComponent breadcrumbs={routerViewProvideNumber} title={'provide.title'} classTitle='default-title' />
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
              label='Ch???n th???i gian'
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
          apiServices={providePresenter.getProvides}
          // defaultOption={filter}
          translateFirstKey="provide"
          rowKey={res => res[idChooses]}
          register={table}
          columns={columns}
          onRowSelect={setSelectedRowKeys}
          dataSource={dataTable}
          disableFirstCallApi={true}
        />
      </div>
      <Link to={'/provide/add'}>
        <div className='btn_add_provide'>
          <ReactSVG src={addButton} />
          <p>{formatMessage('provide.add')}</p>
        </div>
      </Link>

    </div>
  );
};

export default ProvideNumber;
