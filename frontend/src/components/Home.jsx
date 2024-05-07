import React, { useEffect } from 'react'
import LogOutBtn from './LogOutBtn'
import CourseCardCont from './CourseCard'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const Home = () => {
  const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('token')) navigate('/signin')
        if(localStorage.getItem('userRole') === 'admin') {
            navigate('/admin')
        }else{
          navigate('/')
        }
    }, [])
  return (
    <>
        <div>Home</div>
        <LogOutBtn />
        <Link to={'/my-certificates'}>
            <Button color='gray' >My Certificates</Button>
            </Link>
        <CourseCardCont />
    </>
  )
}

export default Home