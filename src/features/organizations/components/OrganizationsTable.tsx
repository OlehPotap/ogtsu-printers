import { useState } from 'react';
import { Button, Space, Table, message, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { Organization } from '../types/api';
import AddOrganizationModal from './AddOrganizationModal';
import EditOrganizationModal from './EditOrganizationModal';
import { useDeleteOrganizationMutation } from '../api/organizationsApi';

type AdminOrganizationsTableProps = {
  organizations: Organization[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
};

const AdminOrganizationsTable = ({
  organizations,
  loading
}: AdminOrganizationsTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrganization, setEditingOrganization] =
    useState<Organization | null>(null);

  const [deleteOrganization, { isLoading: isDeleting }] =
    useDeleteOrganizationMutation();

  const handleDelete = (organization: Organization) => {
    Modal.confirm({
      title: 'Видалити організацію?',
      content: `Ви впевнені, що хочете видалити "${organization.name}"?`,
      okText: 'Видалити',
      cancelText: 'Скасувати',
      okButtonProps: {
        danger: true,
        loading: isDeleting
      },

      onOk: async () => {
        try {
          await deleteOrganization(organization.id).unwrap();

          message.success('Організацію видалено');
        } catch {
          message.error('Не вдалося видалити організацію');
        }
      }
    });
  };

  const columns: ColumnsType<Organization> = [
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Назва',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Дії',
      key: 'actions',
      render: (_, organization) => (
        <Space>
          <Button
            type='link'
            onClick={() => {
              setEditingOrganization(organization);
            }}
          >
            Редагувати
          </Button>

          <Button
            type='link'
            danger
            onClick={() => {
              handleDelete(organization);
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
      <AddOrganizationModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />

      <EditOrganizationModal
        organization={editingOrganization}
        open={editingOrganization !== null}
        onClose={() => {
          setEditingOrganization(null);
        }}
      />
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Додати організацію
      </Button>
      <Table<Organization>
        rowKey='id'
        columns={columns}
        dataSource={organizations}
        loading={loading}
        pagination={false}
      />
    </>
  );
};

export default AdminOrganizationsTable;
