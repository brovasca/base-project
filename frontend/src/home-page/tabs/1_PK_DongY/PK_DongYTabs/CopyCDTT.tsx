import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Input, message, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { BenhNhan, createBenhNhan, deleteBenhNhan, getBenhNhan, updateBenhNhan } from '../../../../app-reducers/SessionBenhNhanReducer';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const emptyForm = {
  MA_BENH_NHAN: '',
  HO_TEN: '',
  NGAY_SINH: '',
  GIOI_TINH: '',
  SO_DIEN_THOAI: '',
  DIA_CHI: '',
  CCCD: '',
  NGHE_NGHIEP: '',
  GHI_CHU: '',
};

const BenhNhanTab: React.FC = () => {
  const [data, setData] = useState<BenhNhan[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<BenhNhan | null>(null);
  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [updateForm, setUpdateForm] = useState(emptyForm);

  useEffect(() => {
    loadBenhNhan();
  }, []);

  const loadBenhNhan = async () => {
    try {
      setLoading(true);
      setData(await getBenhNhan());
    } catch (error) {
      console.error('Lỗi lấy danh sách bệnh nhân:', error);
      message.error('Không tải được danh sách bệnh nhân');
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<BenhNhan> = [
    { title: 'Mã bệnh nhân', dataIndex: 'MA_BENH_NHAN', key: 'MA_BENH_NHAN', render: (value: string) => <strong>{value}</strong> },
    { title: 'Họ tên', dataIndex: 'HO_TEN', key: 'HO_TEN' },
    { title: 'Ngày sinh', dataIndex: 'NGAY_SINH', key: 'NGAY_SINH' },
    { title: 'Giới tính', dataIndex: 'GIOI_TINH', key: 'GIOI_TINH' },
    { title: 'Số điện thoại', dataIndex: 'SO_DIEN_THOAI', key: 'SO_DIEN_THOAI' },
    { title: 'Địa chỉ', dataIndex: 'DIA_CHI', key: 'DIA_CHI' },
    { title: 'CCCD', dataIndex: 'CCCD', key: 'CCCD' },
    { title: 'Nghề nghiệp', dataIndex: 'NGHE_NGHIEP', key: 'NGHE_NGHIEP' },
    { title: 'Ghi chú', dataIndex: 'GHI_CHU', key: 'GHI_CHU' },
    { title: 'Ngày tạo', dataIndex: 'NGAY_TAO', key: 'NGAY_TAO' },
    { title: 'Ngày cập nhật', dataIndex: 'NGAY_CAP_NHAT', key: 'NGAY_CAP_NHAT' },
  ];

  const handleSubmit = async () => {
    try {
      await createBenhNhan(form);
      message.success('Thành công');
      setVisible(false);
      setForm(emptyForm);
      await loadBenhNhan();
    } catch (error) {
      console.error('Lỗi thêm', error);
      message.error('Thêm thất bại');
    }
  };

  const openUpdate = () => {
    if (!selected) {
      message.warning('Chọn một dòng trên bảng');
      return;
    }
    setUpdateForm({
      MA_BENH_NHAN: selected.MA_BENH_NHAN,
      HO_TEN: selected.HO_TEN,
      NGAY_SINH: selected.NGAY_SINH,
      GIOI_TINH: selected.GIOI_TINH,
      SO_DIEN_THOAI: selected.SO_DIEN_THOAI,
      DIA_CHI: selected.DIA_CHI,
      CCCD: selected.CCCD,
      NGHE_NGHIEP: selected.NGHE_NGHIEP,
      GHI_CHU: selected.GHI_CHU,
    });
    setVisibleUpdate(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selected) {
      message.warning('Chọn một dòng trên bảng');
      return;
    }
    try {
      await updateBenhNhan(selected.MA_BENH_NHAN, updateForm);
      message.success('Thành công');
      setVisibleUpdate(false);
      setSelected(null);
      setUpdateForm(emptyForm);
      await loadBenhNhan();
    } catch (error) {
      console.error('Lỗi', error);
      message.error('Sửa thất bại');
    }
  };

  const openDelete = () => {
    if (!selected) {
      message.warning('Chọn một dòng trên bảng');
      return;
    }
    setVisibleDelete(true);
  };

  const handleDelete = async () => {
    if (!selected) {
      message.warning('Chọn một dòng trên bảng');
      return;
    }
    try {
      await deleteBenhNhan(selected.MA_BENH_NHAN);
      message.success(`Đã xóa ${selected.MA_BENH_NHAN}`);
      setVisibleDelete(false);
      setSelected(null);
      await loadBenhNhan();
    } catch (error) {
      console.error('Lỗi', error);
      message.error('Xóa thất bại');
    }
  };

  const filteredData = data.filter((item) => {
    const keyword = searchText.trim().toLowerCase();
    if (!keyword) {
      return true;
    }
    return [item.MA_BENH_NHAN?.toString() ?? '', item.HO_TEN ?? ''].some((field) =>
      field.toLowerCase().includes(keyword),
    );
  });

  return (
    <>
      <h2>Nhập mã bệnh nhân hoặc tên để tìm</h2>
      <Input.Search
        placeholder="Nhập mã BN hoặc tên để tìm"
        allowClear
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 500}}
      />
      <Space direction="horizontal" size={20} className='d-flex justify-content-end'>
        <Button onClick={() => { setForm(emptyForm); setVisible(true); }}><PlusOutlined style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyItems: 'center', 
        }}/>Thêm bệnh nhân</Button>
        <Button onClick={openUpdate} disabled={!selected}><EditOutlined style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyItems: 'center',
        }} />Sửa</Button>
        <Button danger onClick={openDelete} disabled={!selected}>Xóa</Button>
      </Space>
      <Table
        rowKey="MA_BENH_NHAN"
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowClassName={(record) => record.MA_BENH_NHAN === selected?.MA_BENH_NHAN ? 'ant-table-row-selected' : ''}
        onRow={(record) => ({
          onClick: () => setSelected(record),
        })}
      />
      <Modal title="Thêm" visible={visible} onCancel={() => setVisible(false)} onOk={handleSubmit} okText="Xác nhận thêm" cancelText="Hủy">
        <Input placeholder="Mã bệnh nhân" value={form.MA_BENH_NHAN} onChange={(e) => setForm({ ...form, MA_BENH_NHAN: e.target.value })} />
        <br/><br/>
        <Input placeholder="Họ tên" value={form.HO_TEN} onChange={(e) => setForm({ ...form, HO_TEN: e.target.value })} />
        <br /><br />
        <DatePicker
          format="DD/MM/YYYY"
          placeholder='Ngày sinh'
          allowClear
          style={{ width: '100%' }}
          value={form.NGAY_SINH ? moment(form.NGAY_SINH, 'DD/MM/YYYY') : null}
          onChange={(_date, dateString) => {
            const value = Array.isArray(dateString) ? dateString[0] : dateString;
            setForm({ ...form, NGAY_SINH: value || '' });
          }}
        />
        <br /><br />
        <Input placeholder='Giới tính' value={form.GIOI_TINH} onChange={(e) => setForm({ ...form, GIOI_TINH: e.target.value })} />
        <br /><br />
        <Input placeholder="Số điện thoại" value={form.SO_DIEN_THOAI} onChange={(e) => setForm({ ...form, SO_DIEN_THOAI: e.target.value })} />
        <br /><br />
        <Input placeholder="Địa chỉ" value={form.DIA_CHI} onChange={(e) => setForm({ ...form, DIA_CHI: e.target.value })} />
        <br /><br />
        <Input placeholder="CCCD" value={form.CCCD} onChange={(e) => setForm({ ...form, CCCD: e.target.value })} />
        <br /><br />
        <Input placeholder="Nghề nghiệp" value={form.NGHE_NGHIEP} onChange={(e) => setForm({ ...form, NGHE_NGHIEP: e.target.value })} />
        <br /><br />
        <Input placeholder="Ghi chú" value={form.GHI_CHU} onChange={(e) => setForm({ ...form, GHI_CHU: e.target.value })} />
      </Modal>
      <Modal title="Sửa" visible={visibleUpdate} onCancel={() => setVisibleUpdate(false)} onOk={handleUpdateSubmit} okText="Xác nhận" cancelText="Hủy">
        <p>Mã bệnh nhân: <strong>{selected?.MA_BENH_NHAN}</strong></p>
        <Input placeholder="Họ tên" value={updateForm.HO_TEN} onChange={(e) => setUpdateForm({ ...updateForm, HO_TEN: e.target.value })} />
        <br /><br />
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="Ngày sinh"
          style={{ width: '100%' }}
          value={updateForm.NGAY_SINH ? moment(updateForm.NGAY_SINH, 'DD/MM/YYYY') : null}
          onChange={(_date, dateString) => {
            const value = Array.isArray(dateString) ? dateString[0] : dateString;
            setUpdateForm({ ...updateForm, NGAY_SINH: value || '' });
          }}
        />
        <br /><br />
        <Input placeholder='Giới tính' value={updateForm.GIOI_TINH} onChange={(e) => setUpdateForm({ ...updateForm, GIOI_TINH: e.target.value })} />
        <br /><br />
        <Input placeholder="Số điện thoại" value={updateForm.SO_DIEN_THOAI} onChange={(e) => setUpdateForm({ ...updateForm, SO_DIEN_THOAI: e.target.value })} />
        <br /><br />
        <Input placeholder="Địa chỉ" value={updateForm.DIA_CHI} onChange={(e) => setUpdateForm({ ...updateForm, DIA_CHI: e.target.value })} />
        <br /><br />
        <Input placeholder="CCCD" value={updateForm.CCCD} onChange={(e) => setUpdateForm({ ...updateForm, CCCD: e.target.value })} />
        <br /><br />
        <Input placeholder="Nghề nghiệp" value={updateForm.NGHE_NGHIEP} onChange={(e) => setUpdateForm({ ...updateForm, NGHE_NGHIEP: e.target.value })} />
        <br /><br />
        <Input placeholder="Ghi chú" value={updateForm.GHI_CHU} onChange={(e) => setUpdateForm({ ...updateForm, GHI_CHU: e.target.value })} />
      </Modal>
      <Modal
        title="Xóa"
        visible={visibleDelete}
        onCancel={() => setVisibleDelete(false)}
        onOk={handleDelete}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Xóa bệnh nhân <strong>{selected?.MA_BENH_NHAN}</strong> — {selected?.HO_TEN}?</p>
      </Modal>
    </>
  );
};

export default BenhNhanTab;
