import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { Route as RouteOptions, RouteObject } from '@/models/Route.model';

export const handleGenerateRoutes: (routesObject: RouteObject) => ReactElement[] = (
  routesObject: RouteObject,
): ReactElement[] => {
  const routesOptions = Object.values(routesObject)
  const results: ReactElement[] = [];
  const generate = (routes: RouteOptions[]): void => {
    routes?.forEach((route: RouteOptions): void => {
      results.push(<Route key={route.key} path={route.path} element={route.element} />);
      if (route?.subRoutes && route.subRoutes?.length > 0) {
        generate(route.subRoutes as RouteOptions[]);
      }
    });
  };
  generate(routesOptions);

  return results;
};
