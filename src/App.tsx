import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, notification } from 'antd';
import '@/assets/styles/index.css';
import PrivateLayout from '@/layouts/PrivateLayout';
import PublicLayout from '@/layouts/PublicLayout';
import { PrivateRoutes, PublicRoutes } from '@/routes';
import { handleGenerateRoutes } from '@/utils/generateRoutes';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes.constants';
import NotFoundPage from '@/pages/NotFoundPage';
import { useEffect } from 'react';
import { useAppSelector } from './hooks/useRedux';

function App() {
  const privateRoutes = handleGenerateRoutes(PRIVATE_ROUTES);
  const publicRoutes = handleGenerateRoutes(PUBLIC_ROUTES);
  const { notification: appNotification } = useAppSelector((state) => state.app);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (appNotification) {
      api[appNotification.type]({
        message: appNotification.message,
        description: appNotification.description,
      });
    }
  }, [api, appNotification]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerHeight: '48px',
            headerPadding: '0 16px',
            footerPadding: '14px 16px',
            footerBg: 'white',
          },
        },
      }}
    >
      {contextHolder}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route element={<PublicLayout />}>{publicRoutes}</Route>
          </Route>
          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route element={<PrivateLayout />}>{privateRoutes}</Route>
          </Route>
          {/* 404 Route */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
