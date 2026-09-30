import { useState } from 'react';
import { Button, message, Modal, Result, Skeleton, Space, Table } from 'antd';
import {
  BarChartOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { TableProps } from 'antd';

import type { Printer } from '../types/api';
import type { Location } from '../../locations/types/api';

import { useDeletePrinterMutation } from '../api/printersApi';
import EditPrinterModal from '../components/EditPrinterModal';

type PrintersTableProps = {
  printers: Printer[];
  loading: boolean;

  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };

  onPaginationChange: (page: number, pageSize: number) => void;
};

const PrintersTable = ({
  printers,
  loading,
  pagination,
  onPaginationChange
}: PrintersTableProps) => {
  const navigate = useNavigate();

  const [editingPrinter, setEditingPrinter] = useState<Printer | null>(null);

  const [deletePrinter, { isLoading: isDeleting }] = useDeletePrinterMutation();

  const handleDelete = (printer: Printer) => {
    Modal.confirm({
      title: 'Видалити принтер?',
      content: `Ви впевнені, що хочете видалити "${printer.displayName}"?`,
      okText: 'Видалити',
      cancelText: 'Скасувати',

      okButtonProps: {
        danger: true,
        loading: isDeleting
      },

      onOk: async () => {
        try {
          await deletePrinter(printer.id).unwrap();

          message.success('Принтер видалено');
        } catch {
          message.error('Не вдалося видалити принтер');
        }
      }
    });
  };

  const columns: TableProps<Printer>['columns'] = [
    {
      title: "Ім'я",
      dataIndex: 'displayName',
      key: 'displayName'
    },
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: 'Виробник',
      dataIndex: 'vendor',
      key: 'vendor'
    },
    {
      title: 'IP-адреса',
      dataIndex: 'ipAddress',
      key: 'ipAddress'
    },
    {
      title: 'Організація',
      dataIndex: 'location',
      key: 'orgId',
      render: (location: Location) => {
        return `${location.orgDto.code} - ${location.orgDto.name}`;
      }
    },
    {
      title: 'Локація',
      dataIndex: 'location',
      key: 'location',
      render: (location: Location) => {
        return `${location.ogtsuId} - ${location.name}`;
      }
    },
    {
      title: 'Статус',
      dataIndex: 'lastStatus',
      key: 'lastStatus'
    },
    {
      title: 'Дії',
      key: 'actions',

      render: (_, printer) => (
        <Space>
          <Button
            type='link'
            icon={<BarChartOutlined />}
            onClick={() => {
              void navigate(`/printers/${printer.id}/metrics`);
            }}
          >
            Метрики
          </Button>

          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPrinter(printer);
            }}
          >
            Редагувати
          </Button>

          <Button
            type='link'
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete(printer);
            }}
          >
            Видалити
          </Button>
        </Space>
      )
    }
  ];

  if (loading) {
    return <Skeleton active paragraph={{ rows: 5 }} />;
  }

  if (!printers.length) {
    return (
      <Result
        status='info'
        title='Немає доступних принтерів'
        subTitle='Принтери за заданими параметрами не знайдено.'
      />
    );
  }

  return (
    <>
      <EditPrinterModal
        printer={editingPrinter}
        open={editingPrinter !== null}
        onClose={() => {
          setEditingPrinter(null);
        }}
      />

      <Table<Printer>
        columns={columns}
        dataSource={printers}
        rowKey='id'
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,

          showSizeChanger: true,

          onChange: (page, pageSize) => {
            onPaginationChange(page, pageSize);
          }
        }}
      />
    </>
  );
};

export default PrintersTable;
