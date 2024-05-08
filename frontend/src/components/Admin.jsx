import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Certificates from './Certificates';
import { Button } from '@material-tailwind/react';
import LogOutBtn from '../components/LogOutBtn'

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
            <LogOutBtn />
            <Link to={'/all-certificates'}>
            <Button color='gray' >All Certificates</Button>
            </Link>
            <Certificates />
        </>
    )
}

export default Admin