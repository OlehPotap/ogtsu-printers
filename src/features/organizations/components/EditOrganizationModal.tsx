import { useEffect } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';

import { useUpdateOrganizationMutation } from '../api/organizationsApi';
import type { Organization } from '../types/api';

type AddOrganizationModalProps = {
  organization: Organization | null;
  open: boolean;
  onClose: () => void;
};

type FormValues = {
  code: string;
  name: string;
};

const EditOrganizationModal = ({
  organization,
  open,
  onClose
}: AddOrganizationModalProps) => {
  const [form] = Form.useForm<FormValues>();

  const [updateOrganization, { isLoading }] = useUpdateOrganizationMutation();

  useEffect(() => {
    if (organization) {
      form.setFieldsValue({
        code: organization.code,
        name: organization.name
      });
    }
  }, [organization, form]);

  const handleSubmit = async (values: FormValues) => {
    if (!organization) {
      return;
    }

    try {
      await updateOrganization({
        id: organization.id,
        data: values
      }).unwrap();

      message.success('Організацію оновлено');

      onClose();
    } catch {
      message.error('Не вдалося оновити організацію');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title='Додати Організацію'
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
        <Form.Item label='name' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='code' name='code'>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading} block>
            Примінити зміни
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrganizationModal;
