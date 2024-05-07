import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  return !localStorage.getItem('userRole') ? (
    <Navigate to='/signin' />
  ) : (
    localStorage.getItem('userRole') === 'user' ? (
      <Outlet />
    ) : (
      <Navigate to='/admin' />
    )
  );
};

export default PrivateRoutes;
