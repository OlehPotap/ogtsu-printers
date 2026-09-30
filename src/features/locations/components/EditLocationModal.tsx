import { useEffect } from 'react';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import type { SelectProps } from 'antd';

import { useUpdateLocationMutation } from '../api/locationsApi';
import { useGetOrganizationsQuery } from '../../organizations/api/organizationsApi';

import type { Location } from '../types/api';
import type { Organization } from '../../organizations/types/api';

type EditLocationModalProps = {
  location: Location | null;
  open: boolean;
  onClose: () => void;
};

type FormValues = {
  address: string;
  name: string;
  ogtsuId: string;
  orgDto: Organization;
};

const EditLocationModal = ({
  location,
  open,
  onClose
}: EditLocationModalProps) => {
  const [form] = Form.useForm<FormValues>();

  const [updateLocation, { isLoading }] = useUpdateLocationMutation();

  const { data: organizationsData, isLoading: isOrganizationsLoading } =
    useGetOrganizationsQuery({
      page: 1,
      pageSize: 100
    });

  const organizationOptions: SelectProps<string>['options'] =
    organizationsData?.items.map((organization) => ({
      label: `${organization.code} — ${organization.name}`,
      value: organization.id
    })) ?? [];

  useEffect(() => {
    if (location) {
      form.setFieldsValue({
        address: location.address,
        name: location.name,
        ogtsuId: location.ogtsuId,
        orgDto: location.orgDto
      });
    }
  }, [location, form]);

  const handleSubmit = async (values: FormValues) => {
    if (!location) {
      return;
    }

    try {
      await updateLocation({
        id: location.id,
        data: values
      }).unwrap();

      message.success('Локацію оновлено');

      onClose();
    } catch {
      message.error('Не вдалося оновити локацію');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title='Редагувати локацію'
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnHidden
    >
      <Form<FormValues>
        form={form}
        layout='vertical'
        onFinish={(values) => {
          void handleSubmit(values);
        }}
      >
        <Form.Item
          label='Адреса'
          name='address'
          rules={[
            {
              required: true,
              message: 'Вкажіть адресу'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Назва'
          name='name'
          rules={[
            {
              required: true,
              message: 'Вкажіть назву'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='OGTSU ID'
          name='ogtsuId'
          rules={[
            {
              required: true,
              message: 'Вкажіть код'
            }
          ]}
        >
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
          <Select<string>
            placeholder='Оберіть організацію'
            loading={isOrganizationsLoading}
            showSearch={{
              optionFilterProp: 'label'
            }}
            options={organizationOptions}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading} block>
            Застосувати зміни
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditLocationModal;
