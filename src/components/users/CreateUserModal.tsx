import { FC, useEffect } from 'react';
import { Modal, Form, Input, Button, message, DatePicker } from 'antd';
import { useAppDispatch } from '@/hooks/useRedux';
import { addUserAsync } from '@/redux/actions/usersAction';
import { CREATE_USER_FAILED, CREATE_USER_SUCCESS } from '@/constants/messages.constants';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

interface CreateUserForm {
  firstName: string;
  lastName: string;
  email: string;
}

const CreateUserModal: FC<CreateUserModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: CreateUserForm) => {
    try {
      onClose();
      await dispatch(addUserAsync(values));
      message.success(CREATE_USER_SUCCESS);
      form.resetFields();
    } catch {
      message.error(CREATE_USER_FAILED);
    }
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title='Create User'
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

        <Form.Item
          name='email'
          label='Email'
          rules={[
            { required: true, message: 'Please input email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
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

export default CreateUserModal;
