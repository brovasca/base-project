import React, { useState } from 'react';
import { Dropdown, Input, Menu, Space, Typography } from 'antd';

const PhongKhamRHM: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState('BN trả: 20%');

  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={['20%']}
      onSelect={({ key }) => setSelectedItem(`BN trả: ${key}`)}
    >
      <Menu.Item key="20%">BN trả: 20%</Menu.Item>
      <Menu.Item key="5%">BN trả: 5%</Menu.Item>
      <Menu.Item key="0%">BN trả: 0%</Menu.Item>
    </Menu>
  );

  return (
    <>
      <p className='h3 mb-5'>Tư vấn giá tiền</p>
      <Space className='mb-5'>
        <Input.Search placeholder="Nhập mã bệnh nhân" allowClear style={{ width: 300 }} />
        <Dropdown overlay={menu}>
          <Typography.Link>{selectedItem}</Typography.Link>
        </Dropdown>
      </Space>
      <div>
        <p className='h3 text-danger'>Chi phí BHYT</p>
        <p className='h5'><span>Tổng: </span><span>0 đ</span></p>
        <p className='h5 mb-5'><span>Tổng bệnh nhân trả: </span><span>0 đ</span></p>
      </div>
      <div>
        <p className='h3 text-danger'>Chi phí thu phí </p>
        <p className='h5'><span>Tổng: </span><span>0 đ</span></p>
      </div>
    </>
  );
};

export default PhongKhamRHM;
