import { RouteObject } from '@/models/Route.model';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import ProfilePage from '@/pages/ProfilePage';
import UsersPage from '@/pages/UsersPage';

export const PRIVATE_ROUTES: RouteObject = {
  home: {
    key: 'home',
    path: '/',
    element: <HomePage />,
  },
  users: {
    key: 'users',
    path: '/users',
    element: <UsersPage />,
  },
  profile: {
    key: 'profile',
    path: '/profile',
    element: <ProfilePage />,
  }
};

export const PUBLIC_ROUTES: RouteObject = {
  login: {
    key: 'login',
    path: '/login',
    element: <LoginPage />,
  },
};