import { Button, Form, Input, Modal } from 'antd';

import { useCreateOrganizationMutation } from '../api/organizationsApi';
import type { CreateOrganizationRequestBody } from '../types/api';

type AddOrganizationModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddOrganizationModal = ({ open, onClose }: AddOrganizationModalProps) => {
  const [form] = Form.useForm<CreateOrganizationRequestBody>();

  const [createOrganizationModal, { isLoading }] =
    useCreateOrganizationMutation();

  const handleSubmit = async (values: CreateOrganizationRequestBody) => {
    try {
      await createOrganizationModal(values).unwrap();

      form.resetFields();
      onClose();
    } catch (error) {
      console.error(error);
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
      <Form<CreateOrganizationRequestBody>
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
            Додати
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddOrganizationModal;
