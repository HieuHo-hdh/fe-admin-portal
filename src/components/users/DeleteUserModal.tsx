import { FC } from 'react';
import { Modal, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { deleteUserAsync } from '@/redux/actions/usersAction';
import { User } from '@/redux/apis/users.api';

type DeleteUserModalProps = {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const DeleteUserModal: FC<DeleteUserModalProps> = ({ open, onClose, user }) => {
  const dispatch = useAppDispatch();
  const { loadingDelete } = useAppSelector((state) => state.users);
  
  const handleDelete = async () => {
    if (!user) return;

    try {
      await dispatch(deleteUserAsync(user.id));
      onClose();
    } catch { /* empty */ }
  };

  return (
    <Modal
      title='Delete User'
      open={open}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose} loading={loadingDelete}>
          Cancel
        </Button>,
        <Button key='delete' type='primary' danger onClick={handleDelete} loading={loadingDelete}>
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
