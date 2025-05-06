import { LoginResponse } from '@/redux/apis/auth.api';
import { UserOutlined, SettingOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const sidebarMenuItems: MenuItem[] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: 'Users',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
    children: [{ key: '/permissions', icon: <TeamOutlined />, label: 'Permissions' }],
  },
];

export const profileMenuItems: (userProfile: LoginResponse) => MenuProps['items'] = (
  userProfile,
) => [
  {
    key: 'Detail',
    label: (
      <div className='flex flex-col gap-1 py-1'>
        <p className='font-medium leading-none'>{userProfile.firstName}</p>
        <p className='text-xs leading-none text-neutral-500'>{userProfile.email}</p>
      </div>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: 'Profile',
    label: (
      <a rel='noopener noreferrer' href='/profile'>
        Profile
      </a>
    ),
  },
  {
    key: 'Settings',
    label: (
      <a target='_blank' rel='noopener noreferrer'>
        Settings
      </a>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: 'Logout',
    label: 'Log out',
  },
];
