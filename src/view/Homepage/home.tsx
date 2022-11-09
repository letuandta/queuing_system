import { Row, Col } from 'antd';
import React from 'react';
// import authenticationPresenter from '@modules/authentication/presenter';
// import { useSingleAsync } from '@hook/useAsync';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerHomepage } from './router';
import { Area } from '@ant-design/plots';
import TitleComponent from '@shared/components/MainTitleComponent/TitleComponent';

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
    smooth: true,
  };

 
  return (
    <div className="homepage">
      <div className='homepage-left'>
        <MainTitleComponent breadcrumbs={routerHomepage} title={'common.homepage.title'} classTitle='default-title' />
        <Row align="middle" gutter={16}>
          <Col span={6}><div></div></Col>
          <Col span={6}><div></div></Col>
          <Col span={6}><div></div></Col>
          <Col span={6}><div></div></Col>
        </Row>
        <div className='month-stat-chart'>
          <Area {...config} />
        </div>
      </div>
      <div className='homepage-right'>
        <div style={{ height: '5.8rem' }}></div>
        <div className='homepage-right-content'>
          <TitleComponent title={'Tổng quan'} className={'default-title'} level={3} />
          <Row>
            <Col span={24}><div></div></Col>
            <Col span={24}><div></div></Col>
            <Col span={24}><div></div></Col>
          </Row>
          <div className='calander-custom'>

          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;