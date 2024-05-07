import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
  return !localStorage.getItem('userRole') ? (
    <Outlet />
  ) : (
    localStorage.getItem('userRole') === 'user' ? (
      <Navigate to='/' />
    ) : (
      <Navigate to='/admin' />
    )
  );
};

export default PublicRoutes;