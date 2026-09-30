import { useState } from 'react';
import { Button, Space, Table, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import AddLocationModal from './AddLocationModal';
import EditLocationModal from './EditLocationModal';

import type { Location } from '../types/api';
import type { Organization } from '../../organizations/types/api';

import { useDeleteLocationMutation } from '../api/locationsApi';

type LocationsTableProps = {
  locations: Location[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
};

const LocationsTable = ({ locations, loading }: LocationsTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  const [deleteLocation, { isLoading: isDeleting }] =
    useDeleteLocationMutation();

  const handleDelete = (location: Location) => {
    Modal.confirm({
      title: 'Видалити локацію?',
      content: `Ви впевнені, що хочете видалити "${location.name}"?`,
      okText: 'Видалити',
      cancelText: 'Скасувати',
      okButtonProps: {
        danger: true,
        loading: isDeleting
      },

      onOk: async () => {
        try {
          await deleteLocation(location.id).unwrap();

          message.success('Локацію видалено');
        } catch {
          message.error('Не вдалося видалити локацію');
        }
      }
    });
  };

  const columns: ColumnsType<Location> = [
    {
      title: 'Адреса',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Назва',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Код',
      dataIndex: 'ogtsuId',
      key: 'ogtsuId'
    },
    {
      title: 'Організація',
      dataIndex: 'orgDto',
      key: 'orgDto',
      render: (orgDto: Organization) => {
        return `${orgDto.code} - ${orgDto.name}`;
      }
    },
    {
      title: 'Дії',
      key: 'actions',
      render: (_, location) => (
        <Space>
          <Button
            type='link'
            onClick={() => {
              setEditingLocation(location);
            }}
          >
            Редагувати
          </Button>

          <Button
            type='link'
            danger
            onClick={() => {
              handleDelete(location);
            }}
          >
            Видалити
          </Button>
        </Space>
      )
    }
  ];

  return (
    <>
      <AddLocationModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />

      <EditLocationModal
        location={editingLocation}
        open={editingLocation !== null}
        onClose={() => {
          setEditingLocation(null);
        }}
      />
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Додати локацію
      </Button>
      <Table<Location>
        rowKey='id'
        columns={columns}
        dataSource={locations}
        loading={loading}
        pagination={false}
      />
    </>
  );
};

export default LocationsTable;
