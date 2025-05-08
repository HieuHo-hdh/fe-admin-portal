import { FC, useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

const PrivateLayout: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className='p-4'>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
