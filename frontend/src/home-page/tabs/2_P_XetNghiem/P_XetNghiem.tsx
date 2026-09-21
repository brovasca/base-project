import React from 'react';
import { Button, DatePicker, Space } from 'antd';

const PhongXetNghiem: React.FC = () => {
  return (
    <>
      <h2>Đúng người duyệt và đã chọn máy chưa?</h2>
      <Space direction="vertical" size={12}>
        <DatePicker.RangePicker />
        <Button type='primary' danger>Kiểm tra</Button>
      </Space>
    </>
  );
};

export default PhongXetNghiem;
