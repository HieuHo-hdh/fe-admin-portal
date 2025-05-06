import { FC } from 'react';
import { Modal, Button, message } from 'antd';
import { useAppDispatch } from '@/hooks/useRedux';
import { deleteUserAsync } from '@/redux/actions/usersAction';
import { User } from '@/redux/apis/users.api';
import { DELETE_USER_FAILED, DELETE_USER_SUCCESS } from '@/constants/messages.constants';

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const DeleteUserModal: FC<DeleteUserModalProps> = ({ open, onClose, user }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (!user) return;

    try {
      await dispatch(deleteUserAsync(user.id));
      message.success(DELETE_USER_SUCCESS);
      onClose();
    } catch {
      message.error(DELETE_USER_FAILED);
    }
  };

  return (
    <Modal
      title='Delete User'
      open={open}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='delete' type='primary' danger onClick={handleDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete{' '}
        <b className='text-red-500'>
          {user?.firstName} {user?.lastName}
        </b>
        ?
      </p>
    </Modal>
  );
};

export default DeleteUserModal;
