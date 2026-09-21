import React from 'react';
import { Button, DatePicker, Input, Space } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const ToBia4MatTab: React.FC = () => {
  return (
    <Space direction="vertical">
      <h2>Nhập mã bệnh nhân và ngày khám</h2>
      <Input placeholder="Nhập mã bệnh nhân" style={{ width: 300 }} />
      <DatePicker placeholder='Ngày xuất khoa' style={{ width: 300 }} onChange={onChange} />
      <Button type='primary' danger>Download</Button>
    </Space>
  );
};

export default ToBia4MatTab;
