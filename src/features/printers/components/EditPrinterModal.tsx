import { useEffect } from 'react';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import type { SelectProps } from 'antd';

import { useUpdatePrinterMutation } from '../api/printersApi';
import { useGetOrganizationsQuery } from '../../organizations/api/organizationsApi';
import { useGetLocationsQuery } from '../../locations/api/locationsApi';

import type { Printer, UpdatePrinterRequestBody } from '../types/api';

type EditPrinterModalProps = {
  printer: Printer | null;
  open: boolean;
  onClose: () => void;
};

type FormValues = {
  displayName: string;
  ipAddress: string;
  locationId: string;
  orgId: string;
  vendor: string;
};

const EditPrinterModal = ({
  printer,
  open,
  onClose
}: EditPrinterModalProps) => {
  const [form] = Form.useForm<FormValues>();

  const [updatePrinter, { isLoading }] = useUpdatePrinterMutation();

  const { data: organizationsData, isLoading: isOrganizationsLoading } =
    useGetOrganizationsQuery({
      page: 1,
      pageSize: 100
    });

  const { data: locationsData, isLoading: isLocationsLoading } =
    useGetLocationsQuery({
      page: 1,
      pageSize: 100
    });

  const organizationOptions: SelectProps<string>['options'] =
    organizationsData?.items.map((organization) => ({
      label: `${organization.code} — ${organization.name}`,
      value: organization.id
    })) ?? [];

  const locationOptions: SelectProps<string>['options'] =
    locationsData?.items.map((location) => ({
      label: `${location.ogtsuId} — ${location.name}`,
      value: location.id
    })) ?? [];

  useEffect(() => {
    if (!printer) {
      return;
    }

    form.setFieldsValue({
      displayName: printer.displayName,
      ipAddress: printer.ipAddress,
      locationId: printer.location.id,
      orgId: printer.location.orgDto.id,
      vendor: printer.vendor
    });
  }, [printer, form]);

  const handleSubmit = async (values: FormValues) => {
    if (!printer) {
      return;
    }

    const data: UpdatePrinterRequestBody = {
      id: printer.id,
      ...values
    };

    try {
      await updatePrinter({
        id: printer.id,
        data
      }).unwrap();

      message.success('Принтер оновлено');

      onClose();
    } catch {
      message.error('Не вдалося оновити принтер');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title='Редагувати принтер'
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
          label='Display name'
          name='displayName'
          rules={[
            {
              required: true,
              message: 'Вкажіть назву принтера'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='IP address'
          name='ipAddress'
          rules={[
            {
              required: true,
              message: 'Вкажіть IP адресу'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label='Location' name='locationId'>
          <Select<string>
            placeholder='Оберіть локацію'
            loading={isLocationsLoading}
            showSearch={{
              optionFilterProp: 'label'
            }}
            options={locationOptions}
          />
        </Form.Item>

        <Form.Item label='Organization' name='orgId'>
          <Select<string>
            placeholder='Оберіть організацію'
            loading={isOrganizationsLoading}
            showSearch={{
              optionFilterProp: 'label'
            }}
            options={organizationOptions}
          />
        </Form.Item>

        <Form.Item label='Vendor' name='vendor'>
          <Input />
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

export default EditPrinterModal;
