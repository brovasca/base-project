import React from 'react';
import { Tabs } from 'antd';
import CheckPtttTab from './PK_DongYTabs/CheckPTTT';
import ToBia4MatTab from './PK_DongYTabs/Bia4mat';
import BenhNhanTab from './PK_DongYTabs/CopyCDTT';

const PhongKhamDongY: React.FC = () => {
  return (
    <Tabs defaultActiveKey="checkpttt">
      <Tabs.TabPane tab="Check PTTT" key="checkpttt">
        <CheckPtttTab />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Làm tờ bìa 4 mặt" key="bia4mat">
        <ToBia4MatTab />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Copy chỉ định, thủ thuật" key="copycdtt">
        <BenhNhanTab />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default PhongKhamDongY;
