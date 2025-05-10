import { User } from '@/models/Users.model';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DATE_DISPLAY_FORMAT } from './datetime.constant';

export const USER_TABLE_COLUMNS: ({
  handleEdit,
  handleDelete,
}: {
  handleEdit: (record: User) => void;
  handleDelete: (record: User) => void;
}) => ColumnsType<User> = ({ handleEdit, handleDelete }) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (_: string, record: User) => `${record.firstName} ${record.lastName}`,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: true,
  },
  {
    title: 'Birthday',
    dataIndex: 'birthDate',
    key: 'birthDate',
    sorter: true,
    render: (date: string) => dayjs(date).format(DATE_DISPLAY_FORMAT),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_: unknown, record: User) => (
      <Space>
        <Button type='text' icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        <Button type='text' danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
      </Space>
    ),
  },
];
