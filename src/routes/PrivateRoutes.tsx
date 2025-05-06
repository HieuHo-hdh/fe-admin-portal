import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '@/constants/localStorage.constants';

const PrivateRoute: FC = () => {
  const auth = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
