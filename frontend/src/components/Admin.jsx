import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Certificates from './Certificates';
import { Button } from '@material-tailwind/react';

const Admin = () => {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (localStorage.getItem('userRole') === 'user') {
    //         navigate('/')
    //     }
    // }, [])
    return (
        <>
            <div>Admin</div>
            <Link to={'/all-certificates'}>
            <Button color='gray' >All Certificates</Button>
            </Link>
            <Certificates />
        </>
    )
}

export default Admin