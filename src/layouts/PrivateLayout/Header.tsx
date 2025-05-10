import { profileMenuItems } from '@/constants/menuConfig.constants';
import { Avatar, Dropdown, Layout, theme } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { logout } from '@/redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '@/constants/localStorage.constants';

const { Header: AntHeader } = Layout;

const Header: FC = () => {
  const { userProfile } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'Logout') {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <AntHeader
      style={{ background: colorBgContainer }}
      className='flex justify-end items-center'
    >
      <Dropdown
        menu={{
          items: profileMenuItems(userProfile),
          onClick: handleMenuClick,
        }}
        placement='bottomRight'
        trigger={['click']}
      >
        <Avatar src={userProfile?.image} icon={<UserOutlined />} className='cursor-pointer' />
      </Dropdown>
    </AntHeader>
  );
};

export default Header;
