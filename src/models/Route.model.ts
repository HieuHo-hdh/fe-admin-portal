import { JSX } from 'react';

export type Route = {
  key: string;
  path: string;
  element: JSX.Element | null;
  subRoutes?: Array<Route>;
};

export type RouteObject = { [key: string]: Route };
