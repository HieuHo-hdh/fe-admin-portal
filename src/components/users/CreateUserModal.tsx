import { FC, useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { addUserAsync } from '@/redux/actions/usersAction';
import { DATE_DISPLAY_FORMAT } from '@/constants/datetime.constant';
import { CreateUserForm } from '@/models/Users.model';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateUserModal: FC<CreateUserModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { loadingCreate } = useAppSelector((state) => state.users);

  const handleSubmit = async (values: CreateUserForm) => {
    try {
      await dispatch(addUserAsync(values));
      onClose();
      form.resetFields();
    } catch { /* empty */ }
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
          <Button onClick={() => onClose()} loading={loadingCreate}>Cancel</Button>
          <Button type='primary' onClick={() => form.submit()} loading={loadingCreate}>
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
          <DatePicker format={DATE_DISPLAY_FORMAT} className='w-full' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
