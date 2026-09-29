import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';

import { useCreateLocationMutation } from '../api/locationsApi';
import { useGetOrganizationsQuery } from '../../organizations/api/organizationsApi';

import type { CreateLocationRequestBody } from '../types/api';

type AddLocationModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddLocationModal = ({ open, onClose }: AddLocationModalProps) => {
  const [form] = Form.useForm<CreateLocationRequestBody>();

  const [organizationSearch, setOrganizationSearch] = useState('');
  const [debouncedOrganizationSearch, setDebouncedOrganizationSearch] =
    useState('');

  const [createLocation, { isLoading }] = useCreateLocationMutation();

  const { data: organizationsData, isFetching: isOrganizationsFetching } =
    useGetOrganizationsQuery({
      name: debouncedOrganizationSearch || undefined,
      page: 1,
      pageSize: 20
    });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedOrganizationSearch(organizationSearch);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [organizationSearch]);

  const handleSubmit = async (values: CreateLocationRequestBody) => {
    try {
      await createLocation(values).unwrap();

      form.resetFields();
      setOrganizationSearch('');
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOrganizationSearch('');
    onClose();
  };

  return (
    <Modal
      title='Додати Локацію'
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnHidden
    >
      <Form<CreateLocationRequestBody>
        form={form}
        layout='vertical'
        onFinish={(values) => {
          void handleSubmit(values);
        }}
      >
        <Form.Item label='Адреса' name='address'>
          <Input />
        </Form.Item>

        <Form.Item label='Назва' name='name'>
          <Input />
        </Form.Item>

        <Form.Item label='OGTSU ID' name='ogtsuId'>
          <Input />
        </Form.Item>

        <Form.Item
          label='Організація'
          name='orgId'
          rules={[
            {
              required: true,
              message: 'Оберіть організацію'
            }
          ]}
        >
          <Select
            showSearch
            placeholder='Почніть вводити назву організації'
            filterOption={false}
            loading={isOrganizationsFetching}
            onSearch={setOrganizationSearch}
            options={
              organizationsData?.items.map((organization) => ({
                label: organization.name,
                value: organization.id
              })) ?? []
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading} block>
            Додати
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLocationModal;
