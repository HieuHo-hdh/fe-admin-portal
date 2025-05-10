import { Layout, Menu, MenuProps } from 'antd';
import { sidebarMenuItems } from '@/constants/menuConfig.constants';
import { FC, useState, useEffect } from 'react';
import Logo from '@/assets/images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
const { Sider } = Layout;

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (open: boolean) => void;
};

const Sidebar: FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentKey, setCurrentKey] = useState<string>(() => {
    const matchingItem = sidebarMenuItems.find((item) => item?.key === location.pathname);
    return (matchingItem?.key as string) || (sidebarMenuItems[0]?.key as string);
  });

  useEffect(() => {
    const matchingItem = sidebarMenuItems.find((item) => item?.key === location.pathname);
    setCurrentKey((matchingItem?.key as string) || (sidebarMenuItems[0]?.key as string));
  }, [location.pathname]);

  const handleSelectMenuItem: MenuProps['onClick'] = (e) => {
    setCurrentKey(e.key as string);
    navigate(e.key);
  };

  return (
    <Sider
      breakpoint='lg'
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className='text-left'
    >
      <div className='demo-logo-vertical' />

      <div className='text-center w-full p-1'>
        <img src={Logo} alt='logo' className='rounded-lg' />
      </div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[sidebarMenuItems[0]?.key as string]}
        selectedKeys={[currentKey]}
        items={sidebarMenuItems}
        onClick={(e) => handleSelectMenuItem(e)}
      />
    </Sider>
  );
};

export default Sidebar;
