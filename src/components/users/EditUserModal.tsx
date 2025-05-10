import { FC, useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { updateUserAsync } from '@/redux/actions/usersAction';
import { User } from '@/redux/apis/users.api';
import dayjs from 'dayjs';
import { DATE_DISPLAY_FORMAT } from '@/constants/datetime.constant';
import { EditUserForm } from '@/models/Users.model';

type EditUserModalProps = {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const EditUserModal: FC<EditUserModalProps> = ({ open, onClose, user }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { loadingUpdate } = useAppSelector((state) => state.users);

  const handleSubmit = async (values: EditUserForm) => {
    if (!user) return;
    try {
      await dispatch(updateUserAsync({ id: user.id, ...values }));
      onClose();
      form.resetFields();
    } catch { /* empty */ }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthDate: dayjs(user.birthDate),
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
          <Button onClick={() => onClose()} loading={loadingUpdate}>Cancel</Button>
          <Button type='primary' onClick={() => form.submit()} loading={loadingUpdate}>
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
          <DatePicker format={DATE_DISPLAY_FORMAT} className='w-full' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
