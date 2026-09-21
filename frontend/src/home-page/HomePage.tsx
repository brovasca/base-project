import React from 'react';
import { Tabs } from 'antd';
import PhongKhamDongY from './tabs/1_PK_DongY/PK_DongY';
import PhongKhamRHM from './tabs/3_PK_RangHamMat/PK_RangHamMat';
import Campaign1Non from './tabs/CamPaign1(Non)/Campaign1Non';
import PhongXetNghiem from './tabs/2_P_XetNghiem/P_XetNghiem';
import KeToan from './tabs/4_KeToan/KeToan';

const HomePage: React.FC = () => {
  return (
    <div className='container'>
      <h1>Home Page</h1>
      <Tabs defaultActiveKey="phongkhamDY">
        <Tabs.TabPane tab="Phòng Khám Đông Y" key="phongkhamDY">
          <PhongKhamDongY />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Phòng Xét Nghiệm" key="phongXN">
          <PhongXetNghiem />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Phòng Khám Răng - Hàm - Mặt" key="phongRHM">
          <PhongKhamRHM />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Kế toán" key="ketoan">
          <KeToan />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Campaign 1 (Nón)" key="campaign1N">
          <Campaign1Non />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default React.memo(HomePage);
