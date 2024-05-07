import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Button,
  } from "@material-tailwind/react";

const MyCertificate = () => {
 const [myCertficates, setMYCertificates] = useState([])
 useEffect(()=>{
    const fetchMYCertificatesMade = async()=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/api/certificates/made/forUser`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json();
            console.log(data)
            setMYCertificates(data?.data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchMYCertificatesMade()
 },[])
  return (
    <div className='flex flex-wrap gap-8 p-8 justify-center w-[80%] mx-auto'>
        {
            myCertficates.length>0 ?
            myCertficates.map((c)=>{
                return (
                    <BlogCard key={c._id} certificate={c} />
                )
            }) :
            'No Certificates Found'
        }
    </div>
  )
}

export default MyCertificate


   

   
  export function BlogCard({certificate}) {
    return (
      <Card className="min-w-[384px] overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">

        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none flex justify-center scale-110"
        >
          <img
            src={certificate.certificate_thubmnail_link}
            alt="ui/ux review check"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            {certificate.student_email}
          </Typography>
          <Typography variant="h4" color="blue-gray">
            {certificate.course_name}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <Button color="amber" size="lg" onClick={()=>window.location.href = certificate.certificate_view_link}>View</Button>
          <Button color="gray" size="lg" onClick={()=>window.location.href = certificate.certificate_download_link}>Download</Button>
        </CardFooter>
      </Card>
    );
  }