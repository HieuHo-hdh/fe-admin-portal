import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import '@/assets/styles/index.css';
import PrivateLayout from '@/layouts/PrivateLayout';
import PublicLayout from '@/layouts/PublicLayout';
import { PrivateRoutes, PublicRoutes } from '@/routes';
import { handleGenerateRoutes } from '@/utils/generateRoutes';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes.constants';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  const privateRoutes = handleGenerateRoutes(PRIVATE_ROUTES);
  const publicRoutes = handleGenerateRoutes(PUBLIC_ROUTES);

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
