import { FC, useEffect } from 'react';
import { Modal, Form, Input, Button, message, DatePicker } from 'antd';
import { useAppDispatch } from '@/hooks/useRedux';
import { updateUserAsync } from '@/redux/actions/usersAction';
import { User } from '@/redux/apis/users.api';
import { UPDATE_USER_FAILED, UPDATE_USER_SUCCESS } from '@/constants/messages.constants';

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

interface EditUserForm {
  firstName: string;
  lastName: string;
  email: string;
}

const EditUserModal: FC<EditUserModalProps> = ({ open, onClose, user }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: EditUserForm) => {
    if (!user) return;
    try {
      onClose();
      await dispatch(updateUserAsync({ id: user.id, ...values }));
      message.success(UPDATE_USER_SUCCESS);
      form.resetFields();
    } catch {
      message.error(UPDATE_USER_FAILED);
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user, form]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title='Edit User'
      open={open}
      onCancel={onClose}
      footer={
        <div className='flex justify-end gap-2'>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button type='primary' onClick={() => form.submit()}>
            Submit
          </Button>
        </div>
      }
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          name='firstName'
          label='First Name'
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='lastName'
          label='Last Name'
          rules={[{ required: true, message: 'Please input last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='email' label='Email'>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name='birthDate'
          label='Birthday'
          rules={[{ required: true, message: 'Please select birthday!' }]}
        >
          <DatePicker format='MM/DD/YYYY' className='w-full' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
