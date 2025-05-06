import { FC, useEffect, useState } from 'react';
import { Table, Input, Space, Button, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { TableState } from '@/models/SearchSort.model';
import { convertTableStateToApiParams } from '@/utils/apiUtils';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { DEFAULT_PAGE_SIZE } from '@/constants/pagination.constants';
import { User } from '@/models/Users.model';
import { USER_TABLE_COLUMNS } from '@/constants/users.constants';
import { fetchUsersAsync } from '@/redux/actions/usersAction';
import { SearchProps } from 'antd/es/input';
import CreateUserModal from '@/components/users/CreateUserModal';
import EditUserModal from '@/components/users/EditUserModal';
import DeleteUserModal from '@/components/users/DeleteUserModal';

const { Search } = Input;

const UsersPage: FC = () => {
  const dispatch = useAppDispatch();
  const { users, total, loading } = useAppSelector((state) => state.users);

  const [tableState, setTableState] = useState<TableState>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    limit: DEFAULT_PAGE_SIZE,
    skip: 0,
  });

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[],
  ) => {
    const sorterResult = Array.isArray(sorter) ? sorter[0] : sorter;
    setTableState((prev) => ({
      ...prev,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || DEFAULT_PAGE_SIZE,
      sortBy: sorterResult.field as string,
      order: sorterResult.order === 'ascend' ? 'asc' : 'desc',
    }));
  };

  const handleSearch: SearchProps['onSearch'] = (value: string) => {
    setTableState((prev) => ({
      ...prev,
      current: 1,
      q: value,
    }));
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    const apiParams = convertTableStateToApiParams(tableState);
    dispatch(fetchUsersAsync(apiParams));
  }, [dispatch, tableState]);

  return (
    <div className='p-4'>
      <Flex className='flex flex-row mb-4' justify='space-between' align='center'>
        <Space>
          <Search placeholder='Search name' onSearch={handleSearch} className='w-fit' />
        </Space>
        <Button type='primary' icon={<PlusOutlined />} onClick={() => setCreateModalOpen(true)}>
          Add User
        </Button>
      </Flex>
      <Table
        columns={USER_TABLE_COLUMNS({ handleEdit, handleDelete })}
        dataSource={users}
        pagination={{
          current: tableState.current,
          pageSize: tableState.pageSize,
          total: total,
        }}
        onChange={handleTableChange}
        rowKey='id'
        loading={loading}
        scroll={{ x: 'max-content' }}
      />

      <CreateUserModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} />

      <EditUserModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      <DeleteUserModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersPage;
