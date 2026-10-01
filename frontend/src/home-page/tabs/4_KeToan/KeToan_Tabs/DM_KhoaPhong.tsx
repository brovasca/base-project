import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Button, Input, message, Modal, Space, Table } from 'antd';
import { createKhoaPhong, deleteKhoaPhong, getKhoaPhong, KhoaPhong, updateKhoaPhong } from '../../../../app-reducers/SessionKhoaPhongReducer';

const emptyForm = {
  TEN: '',
  GHI_CHU: '',
};

const DMKhoaPhong: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<KhoaPhong[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [updateForm, setUpdateForm] = useState(emptyForm);
  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [selected, setSelected] = useState<KhoaPhong | null>(null);
  const [visibleDelete, setVisibleDelete] = useState(false);

  useEffect(() => {
    loadKhoaPhong();
  }, []);

  const loadKhoaPhong = async () => {
    try{
      setLoading(true);
      setData(await getKhoaPhong());
    } catch (error) {
      console.error('Lỗi', error);
      message.error('Không tải được');
    } finally {
      setLoading(false);
    }
  }

  const columns: ColumnsType<KhoaPhong> = [
      { title: 'ID', dataIndex: 'ID', key: 'ID', render: (value: number) => <strong>{value}</strong> },
      { title: 'TEN', dataIndex: 'TEN', key: 'TEN', render: (value: string) => <strong>{value}</strong> },
      { 
        title: 'GHI_CHU', dataIndex: 'GHI_CHU', key: 'GHI_CHU',
      },
      { title: 'NGAYSD', dataIndex: 'NGAYSD', key: 'NGAYSD' }
    ];

  const handleSubmit = async () => {
    try {
      await createKhoaPhong(form);
      message.success('Thành công');
      setVisible(false);
      setForm(emptyForm);
      await loadKhoaPhong();
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
      TEN: selected.TEN,
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
      await updateKhoaPhong(selected.ID, updateForm);
      message.success('Thành công');
      setVisibleUpdate(false);
      setSelected(null);
      setUpdateForm(emptyForm);
      await loadKhoaPhong();
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
        await deleteKhoaPhong(selected.ID);
        message.success(`Đã xóa ${selected.ID}`);
        setVisibleDelete(false);
        setSelected(null);
        await loadKhoaPhong();
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
      return [item.ID?.toString() ?? '', item.TEN ?? ''].some((field) =>
        field.toLowerCase().includes(keyword),
      );
    });

  return (
  <>
    <h3>Nhập tên phòng để tìm</h3>
    <Input.Search
      placeholder="Nhập tên phòng để tìm"
      allowClear
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      style={{ width: 500}}
    />
    <Space direction='horizontal' className='d-flex justify-content-end'>
      <Button onClick={() => { setForm(emptyForm); setVisible(true); }}><PlusOutlined style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyItems: 'center',
      }} />Thêm khoa phòng</Button>
      <Button onClick={openUpdate} disabled={!selected}><EditOutlined style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyItems: 'center',
      }} />Sửa</Button>
      <Button danger onClick={openDelete} disabled={!selected}><DeleteOutlined style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyItems: 'center',
      }} />Xóa</Button>
    </Space>
    <Table
      rowKey="ID"
      columns={columns}
      dataSource={filteredData}
      loading={loading}
      rowClassName={(record) => record.ID === selected?.ID ? 'ant-table-row-selected' : ''}
       onRow={(record) => ({
        onClick: () => setSelected(record),
      })}
    />
    <Modal title="Thêm" visible={visible} onCancel={() => setVisible(false)} onOk={handleSubmit} okText="Xác nhận thêm" cancelText="Hủy">
      <Input placeholder="Tên khoa phòng" value={form.TEN} onChange={(e) => setForm({ ...form, TEN: e.target.value })} />
      <br /><br />
      <Input placeholder='Ghi chú' value={form.GHI_CHU} onChange={(e) => setForm({ ...form, GHI_CHU: e.target.value })} />
      <br /><br />
    </Modal>
    <Modal title="Sửa" visible={visibleUpdate} onCancel={() => setVisibleUpdate(false)} onOk={handleUpdateSubmit} okText="Xác nhận" cancelText="Hủy">
      <p>ID <strong>{selected?.ID}</strong></p>
      <Input placeholder="Tên" value={updateForm.TEN} onChange={(e) => setUpdateForm({ ...updateForm, TEN: e.target.value })} />
      <br /><br />
      <Input placeholder='Ghi chú' value={updateForm.GHI_CHU} onChange={(e) => setUpdateForm({ ...updateForm, GHI_CHU: e.target.value })} />
      <br /><br />
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
      <p>Xóa máy <strong>{selected?.ID}</strong> — {selected?.TEN}?</p>
    </Modal>
  </>
  );
};

export default DMKhoaPhong;
