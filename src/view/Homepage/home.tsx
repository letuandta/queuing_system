import { Row, Col, Progress, Space } from 'antd';
import React from 'react';
// import authenticationPresenter from '@modules/authentication/presenter';
// import { useSingleAsync } from '@hook/useAsync';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerHomepage } from './router';
import { Area } from '@ant-design/plots';
import TitleComponent from '@shared/components/MainTitleComponent/TitleComponent';
import { device, numberOrder, numberOrdered, numberOrderSkip, numberOrderWaiting } from '@assets/svg'
import { ReactSVG } from 'react-svg';
import { ArrowUpOutlined } from '@ant-design/icons';
import StatsOrder from './component/statsOrder';
import moment from 'moment';
import SelectNoneLable from '@shared/components/SelectNoneLabaleComponent';
import Zstack from '@shared/components/ZstackComponent/Zstack';
import Badge from '@shared/components/Badge';
import Overview from './component/overview';
import Calendar from '@shared/components/Calendar';
import "./style.scss"

const Home: React.FC = () => {
  // const { logout } = authenticationPresenter;
  // const logoutCurrentAuth = useSingleAsync(logout);

  // const SignOut = () => {
  //   logoutCurrentAuth.execute().then((response) =>
  //     console.log(response),
  //   );
  // };

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
    height: 350,
    smooth: true,
    areaStyle: {
      fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    }
  };


  return (
    <div className="homepage">
      <div className='homepage-left'>
        <MainTitleComponent breadcrumbs={routerHomepage} title={'common.homepage.title'} classTitle='default-title' />
        <Row align="middle" gutter={16}>
          <Col span={6}>
            <div>
              <StatsOrder icon={numberOrder} description='Số thứ tự đã cấp' quantity={4221} percent={32.44} status="increase" />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <StatsOrder icon={numberOrdered} description='Số thứ tự đã sử dụng' quantity={3721} percent={32.44} status="decrease" />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <StatsOrder icon={numberOrderWaiting} description='Số thứ tự đang chờ' quantity={72} percent={32.44} status="increase" />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <StatsOrder icon={numberOrderSkip} description='Số thứ tự đã bỏ qua' quantity={43} percent={32.44} status="decrease" />
            </div>
          </Col>
        </Row>
        <div className='month-stat-chart'>
          <div style={{ height: "12rem", display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <TitleComponent title={'Bảng thống kê theo tháng'} className={'default-title chart-title'} level={3} />
              Năm {moment(new Date).year()}
            </div>
            <div>
              <strong>Xem Theo</strong>
              <SelectNoneLable defaultvalue={'Tháng'} option={[{
                value: 'Ngày',
                label: 'Ngày'
              }, {
                value: 'Tháng',
                label: 'Tháng'
              }, {
                value: 'Năm',
                label: 'Năm'
              }]} />
            </div>
          </div>
          <Area {...config} />
        </div>
      </div>
      <div className='homepage-right'>
        <div style={{ height: '5.8rem' }}></div>
        <div className='homepage-right-content'>
          <TitleComponent title={'Tổng quan'} className={'default-title'} level={3} />
          <Row>
            <Col span={24}>
              <Overview
                color='#FF7506'
                progress={{ percents: [90, 10] }}
                badges={[{
                  title: 'Đang hoạt động',
                  quantity: 3799
                }, {
                  title: 'Ngưng hoạt động',
                  quantity: 422
                }]}
                icon={<ReactSVG src={device} />}
                title='Thiết bị'
                quantity={4221}
              />
            </Col>
            <Col span={24}>
              <Overview
                color='#4277FF'
                progress={{ percents: [76, 23] }}
                badges={[{
                  title: 'Đang hoạt động',
                  quantity: 210
                }, {
                  title: 'Ngưng hoạt động',
                  quantity: 66
                }]}
                icon={<ReactSVG src={device} />}
                title='Thiết bị'
                quantity={276}
              />
            </Col>
            <Col span={24}>
              <Overview
                color='#35C75A'
                progress={{ percents: [86, 10, 5] }}
                badges={[{
                  title: 'Đang chờ',
                  quantity: 3722
                }, {
                  title: 'Đã sử dụng',
                  quantity: 486
                }, {
                  title: 'Bỏ qua',
                  quantity: 22
                }]}
                icon={<ReactSVG src={device} />}
                title='Thiết bị'
                quantity={4221}
              />
            </Col>
          </Row>
          <div className='calander-custom'>
            <Calendar />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;