import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
    return !localStorage.getItem('userRole') ? (
        <Navigate to='/signin' />
    ) : (
        localStorage.getItem('userRole') === 'admin' ? (
            <Outlet />
        ) : (
            <Navigate to='/' />
        )
    );
};

export default AdminRoutes;
