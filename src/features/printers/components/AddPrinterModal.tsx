import { Button, Form, Input, InputNumber, Modal, Select, message } from 'antd';
import type { SelectProps } from 'antd';

import {
  useCreatePrinterMutation,
  useLazyDiscoverPrinterQuery
} from '../api/printersApi';
import { useGetOrganizationsQuery } from '../../organizations/api/organizationsApi';
import { useGetLocationsQuery } from '../../locations/api/locationsApi';

import type { CreatePrinterRequestBody } from '../types/api';

type AddPrinterModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddPrinterModal = ({ open, onClose }: AddPrinterModalProps) => {
  const [form] = Form.useForm<CreatePrinterRequestBody>();

  const [createPrinter, { isLoading }] = useCreatePrinterMutation();

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

  const [discoverPrinter, { isFetching: isDiscovering }] =
    useLazyDiscoverPrinterQuery();

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

  const handleSubmit = async (values: CreatePrinterRequestBody) => {
    try {
      await createPrinter(values).unwrap();

      message.success('Принтер додано');

      form.resetFields();
      onClose();
    } catch {
      message.error('Не вдалося додати принтер');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleDiscover = async () => {
    const { ipAddress } = form.getFieldsValue();

    if (!ipAddress) {
      message.warning('Спочатку вкажіть IP адресу');
      return;
    }

    try {
      const discovered = await discoverPrinter(ipAddress).unwrap();

      form.setFieldsValue({
        ipAddress: discovered.ipAddress,
        displayName: discovered.displayName,
        macAddress: discovered.macAddress,
        model: discovered.model,
        serialNumber: discovered.serialNumber
      });

      message.success('Дані принтера отримано');
    } catch {
      message.error('Не вдалося отримати дані принтера');
    }
  };

  return (
    <Modal
      title='Додати принтер'
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnHidden
    >
      <Form<CreatePrinterRequestBody>
        form={form}
        layout='vertical'
        onFinish={(values) => {
          void handleSubmit(values);
        }}
      >
        <Form.Item label='Community' name='community'>
          <Input />
        </Form.Item>

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

        <Form.Item label='IP address' required>
          <div
            style={{
              display: 'flex',
              gap: 8
            }}
          >
            <Form.Item
              name='ipAddress'
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Вкажіть IP адресу'
                }
              ]}
            >
              <Input placeholder='10.1.1.149' />
            </Form.Item>

            <Button
              onClick={() => {
                void handleDiscover();
              }}
              loading={isDiscovering}
            >
              Discover
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          label='macAddress'
          name='macAddress'
          rules={[
            {
              required: true,
              message: 'Вкажіть macAddress'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Location'
          name='locationId'
          rules={[
            {
              required: true,
              message: 'Оберіть локацію'
            }
          ]}
        >
          <Select<string>
            placeholder='Оберіть локацію'
            allowClear
            loading={isLocationsLoading}
            showSearch={{
              optionFilterProp: 'label'
            }}
            options={locationOptions}
          />
        </Form.Item>

        <Form.Item
          label='Model'
          name='model'
          rules={[
            {
              required: true,
              message: 'Вкажіть модель'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Organization'
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
            allowClear
            loading={isOrganizationsLoading}
            showSearch={{
              optionFilterProp: 'label'
            }}
            options={organizationOptions}
          />
        </Form.Item>

        <Form.Item
          label='Profile'
          name='profileId'
          rules={[
            {
              required: true,
              message: 'Вкажіть профіль'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Serial number'
          name='serialNumber'
          rules={[
            {
              required: true,
              message: 'Вкажіть серійний номер'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label='SNMP port' name='snmpPort'>
          <InputNumber min={1} max={65535} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='SNMP version' name='snmpVersion'>
          <Input />
        </Form.Item>

        <Form.Item
          label='Vendor'
          name='vendor'
          rules={[
            {
              required: true,
              message: 'Вкажіть виробника'
            }
          ]}
        >
          <Input />
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

export default AddPrinterModal;
