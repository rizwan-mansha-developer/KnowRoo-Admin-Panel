import routes from '../routes/Route';

export const getRouteName = (pathname) => {
  const route = routes.find((route) => route.path === pathname);
  return route ? route.name : '';
};
