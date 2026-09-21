import React from 'react';
import { Button, DatePicker, Space } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const DMMay: React.FC = () => {
  return (
    <Space direction='vertical'>
      <h2>Bạn đã nhập đủ PTTT chưa?</h2>
      <DatePicker placeholder='Chọn từ ngày ... đến ngày hiện tại' style={{ width: 300 }} onChange={onChange} />
      <Button type='primary' danger>Kiểm tra</Button>
    </Space>
  );
};

export default DMMay;
