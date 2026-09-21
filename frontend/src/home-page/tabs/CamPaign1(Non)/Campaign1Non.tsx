import React, { useMemo, useState } from 'react';
import {Button, Card, Col, DatePicker, Input, message, Popconfirm, Row, Space, Statistic, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, ExportOutlined, LockOutlined, ReloadOutlined, UndoOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import Apis from '../../../utils/Apis';
import { apiClient } from '../../../utils/Funcs';

type CampaignNonIssue = {
  MA_BENH_NHAN: string;
  HO_TEN: string;
  NGAY_SINH: string;
  GIOI_TINH: string;
  SO_DIEN_THOAI: string;
  DIA_CHI: string;
  CCCD: string;
  NGHE_NGHIEP: string;
  GHI_CHU: string;
  NGAY_TAO: string;
  NGAY_CAP_NHAT: string;
  NGAY_NHAN: string;
};

type DateRange = [Moment | null, Moment | null] | null;

const getErrorMessage = (error: unknown, fallback: string) => {
  const response = (error as { response?: { data?: { message?: string | string[] } } })?.response;
  const responseMessage = response?.data?.message;
  return Array.isArray(responseMessage) ? responseMessage.join(', ') : responseMessage || fallback;
};

const formatReceivedDate = (receivedAt: string) => moment(receivedAt).format('DD/MM/YYYY HH:mm');

const csvCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;

const Campaign1Non: React.FC = () => {
  const [unlockKey, setUnlockKey] = useState('');
  const [campaignKey, setCampaignKey] = useState<string | null>(null);
  const [patientCode, setPatientCode] = useState('');
  const [issues, setIssues] = useState<CampaignNonIssue[]>([]);
  const [receivedDateRange, setReceivedDateRange] = useState<DateRange>(null);
  const [unlocking, setUnlocking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [issuing, setIssuing] = useState(false);

  const campaignHeaders = campaignKey ? { headers: { 'x-campaign-key': campaignKey } } : undefined;

  const loadIssues = async () => {
    if (!campaignHeaders) {
      return;
    }
    try {
      setLoading(true);
      const response = await apiClient.get<CampaignNonIssue[]>(Apis.API_TAILER.CAMPAIGN_NON, campaignHeaders);
      setIssues(response.data);
    } catch (error) {
      message.error(getErrorMessage(error, 'Không tải được danh sách đã phát'));
    } finally {
      setLoading(false); 
    }
  };

  const handleUnlock = async () => {
    const key = unlockKey.trim();
    if (!key) {
      message.warning('Vui lòng nhập key để mở Campaign 1');
      return;
    }
    try {
      setUnlocking(true);
      await apiClient.post(`${Apis.API_TAILER.CAMPAIGN_NON}/unlock`, { key });
      setCampaignKey(key);
      message.success('Đã mở Campaign 1');
      const response = await apiClient.get<CampaignNonIssue[]>(Apis.API_TAILER.CAMPAIGN_NON, {
        headers: { 'x-campaign-key': key },
      });
      setIssues(response.data);
    } catch (error) {
      setCampaignKey(null);
      message.error(getErrorMessage(error, 'Không thể mở Campaign 1'));
    } finally {
      setUnlocking(false);
    }
  };

  const handleIssue = async () => {
    const code = patientCode.trim();
    if (!code) {
      message.warning('Vui lòng nhập mã bệnh nhân');
      return;
    }
    if (!campaignHeaders) {
      message.error('Campaign 1 chưa được mở');
      return;
    }
    try {
      setIssuing(true);
      await apiClient.post(
        `${Apis.API_TAILER.CAMPAIGN_NON}/issue`,
        { patientId: code },
        campaignHeaders,
      );
      setPatientCode('');
      message.success('Đã phát nón cho bệnh nhân');
      await loadIssues();
    } catch (error) {
      message.error(getErrorMessage(error, 'Phát nón không thành công'));
    } finally {
      setIssuing(false);
    }
  };

  const handleRevoke = async (issue: CampaignNonIssue) => {
    if (!campaignHeaders) {
      return;
    }
    try {
      setLoading(true);
      await apiClient.delete(`${Apis.API_TAILER.CAMPAIGN_NON}/${issue.MA_BENH_NHAN}`, campaignHeaders);
      message.success(`Đã thu hồi nón của ${issue.HO_TEN}`);
      await loadIssues();
    } catch (error) {
      message.error(getErrorMessage(error, 'Thu hồi không thành công'));
    } finally {
      setLoading(false);
    }
  };

  const filteredIssues = useMemo(() => {
    if (!receivedDateRange) {
      return issues;
    }
    const [fromDate, toDate] = receivedDateRange;
    return issues.filter((issue) => {
      const receivedAt = moment(issue.NGAY_NHAN);
      return (!fromDate || receivedAt.isSameOrAfter(fromDate.clone().startOf('day')))
        && (!toDate || receivedAt.isSameOrBefore(toDate.clone().endOf('day')));
    });
  }, [issues, receivedDateRange]);

  const totalToday = useMemo(
    () => issues.filter((issue) => moment(issue.NGAY_NHAN).isSame(moment(), 'day')).length,
    [issues],
  );

  const handleExport = () => {
    const rows = [
      ['Mã bệnh nhân', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Số điện thoại', 'Địa chỉ', 'CCCD', 'Nghề nghiệp',
        'Ghi chú', 'Ngày tạo', 'Ngày cập nhật', 'Ngày nhận'],
      ...filteredIssues.map((issue) => [
        issue.MA_BENH_NHAN,
        issue.HO_TEN,
        issue.NGAY_SINH,
        issue.GIOI_TINH,
        issue.SO_DIEN_THOAI,
        issue.DIA_CHI,
        issue.CCCD,
        issue.NGHE_NGHIEP,
        issue.GHI_CHU,
        issue.NGAY_TAO,
        issue.NGAY_CAP_NHAT,
        formatReceivedDate(issue.NGAY_NHAN),
      ]),
    ];
    const csv = `\ufeff${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `campaign-1-non-${moment().format('YYYYMMDD-HHmmss')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const columns: ColumnsType<CampaignNonIssue> = [
    { title: 'Mã bệnh nhân', dataIndex: 'MA_BENH_NHAN', key: 'MA_BENH_NHAN', render: (value: string) => <strong>{value}</strong> },
    { title: 'Họ tên', dataIndex: 'HO_TEN', key: 'HO_TEN' },
    { title: 'Ngày sinh', dataIndex: 'NGAY_SINH', key: 'NGAY_SINH' },
    { title: 'Giới tính', dataIndex: 'GIOI_TINH', key: 'GIOI_TINH' },
    { title: 'Số điện thoại', dataIndex: 'SO_DIEN_THOAI', key: 'SO_DIEN_THOAI' },
    { title: 'Địa chỉ', dataIndex: 'DIA_CHI', key:'DIA_CHI' },
    { title: 'CCCD', dataIndex: 'CCCD', key:'CCCD' },
    { title: 'Nghề nghiệp', dataIndex: 'NGHE_NGHIEP', key:'NGHE_NGHIEP' },
    { title: 'Ghi chú', dataIndex: 'GHI_CHU', key:'GHI_CHU' },
    { title: 'Ngày tạo', dataIndex: 'NGAY_TAO', key:'NGAY_TAO' },
    { title: 'Ngày cập nhật', dataIndex: 'NGAY_CAP_NHAT', key:'NGAY_CAP_NHAT' },
    {
      title: 'Ngày nhận',
      dataIndex: 'NGAY_NHAN',
      key: 'NGAY_NHAN',
      render: formatReceivedDate,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      render: (_value, issue) => (
        <Popconfirm
          title={<>Thu hồi nón?<br />Bệnh nhân {issue.HO_TEN} sẽ có thể được phát lại.</>}
          okText="Thu hồi"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
          onConfirm={() => handleRevoke(issue)}
        >
          <Button danger size="small" icon={<UndoOutlined />} style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>Thu hồi</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <p className='h4 text-danger'>Campaign 1: Chiến dịch phát Nón bảo hiểm cho bệnh nhân tới khám</p>
      {!campaignKey ? (
        <Space>
          <Input.Password
            placeholder='Nhập key Campaign 1'
            value={unlockKey}
            onChange={(event) => setUnlockKey(event.target.value)}
            onPressEnter={handleUnlock}
            style={{ width: 300 }}
          />
          <Button danger icon={<LockOutlined />} loading={unlocking} onClick={handleUnlock} style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>Unlock</Button>
        </Space>
      ) : (
        <>
          <Row gutter={16} className='mt-3 mb-3'>
            <Col xs={24} sm={12} md={8}>
              <Card size="small"><Statistic title="Tổng số bệnh nhân đã phát" value={issues.length} /></Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card size="small"><Statistic title="Số bệnh nhân đã phát hôm nay" value={totalToday} /></Card>
            </Col>
          </Row>
          <Space className='mb-3' wrap>
            <Input
              placeholder='Nhập mã bệnh nhân'
              value={patientCode}
              onChange={(event) => setPatientCode(event.target.value)}
              onPressEnter={handleIssue}
              style={{ width: 260 }}
            />
            <Button type="primary" icon={<CheckCircleOutlined />} loading={issuing} onClick={handleIssue} style={{
              display: 'inline-flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}>Phát</Button>
          </Space>
          <div className='d-flex justify-content-end mb-2'>
            <Space wrap>
              <DatePicker.RangePicker
                format="DD/MM/YYYY"
                placeholder={['Từ ngày nhận', 'Đến ngày nhận']}
                onChange={(dates) => setReceivedDateRange(dates as DateRange)}
              />
              <Button icon={<ReloadOutlined />} loading={loading} onClick={loadIssues} style={{
                display: 'inline-flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}>Làm mới</Button>
              <Button type='primary' icon={<ExportOutlined />} onClick={handleExport} style={{
                display: 'inline-flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}>Xuất Excel</Button>
            </Space>
          </div>
          <Table
            rowKey="MA_BENH_NHAN"
            columns={columns}
            dataSource={filteredIssues}
            loading={loading}
            locale={{ emptyText: 'Chưa có bệnh nhân nào được phát nón' }}
          />
        </>
      )}
    </>
  );
};

export default Campaign1Non;
