import React from 'react';
import { Tabs } from 'antd';
import DMLoaiMay from './KeToan_Tabs/DM_LoaiMay';
import DMKhoaPhong from './KeToan_Tabs/DM_KhoaPhong';
import DMMay from './KeToan_Tabs/DM_May';

const KeToan: React.FC = () => {
  return (
    <Tabs defaultActiveKey="dm_loaimay">
      <Tabs.TabPane tab="Danh mục loại máy" key="dm_loaimay">
        <DMLoaiMay />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Danh mục khoa phòng" key="dm_khoaphong">
        <DMKhoaPhong />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Danh mục máy" key="dm_may">
        <DMMay />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default KeToan;
