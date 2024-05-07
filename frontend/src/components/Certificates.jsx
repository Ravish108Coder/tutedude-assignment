import React, { useEffect, useRef, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";

import {
    Dialog,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export default function Certificates() {
    const [certificatesRequested, setCertificatesRequested] = useState([])
    const fetchAllCertificatesRequested = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/api/certificates/requested/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        const data = await response.json();
        setCertificatesRequested(data?.data)
    }
    useEffect(() => {
        fetchAllCertificatesRequested()
    }, [certificatesRequested])

    return (
        <div className='flex flex-wrap gap-4 justify-center'>
            {certificatesRequested.length > 0 ?
                certificatesRequested.map((certificate) => {
                    return <CertificateCard key={certificate._id} certificate={certificate}
                        fetchAllCertificatesRequested={fetchAllCertificatesRequested} />
                }) : 
                'No Certificates Requests available...'
            }
        </div>
    )
}

function CertificateCard({ certificate, fetchAllCertificatesRequested }) {
    const [user, setUser] = useState(null)
    const approveRef = useRef(null)
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const id = certificate.student_id;
                const response = await fetch(`${import.meta.env.VITE_SERVER}/api/user/${id}`)
                const data = await response.json();
                setUser(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserDetails()
    }, [])
    const handleDelteThisCertificateRequest = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/api/certificates/${certificate?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                credentials: 'include'
            })
        } catch (error) {

        }
    }
    return (
        <>
            <Card className="w-full max-w-[26rem] shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                {/* <CardHeader floated={false} color="blue-gray">
          <img
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="ui/ux review check"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          <IconButton
            size="sm"
            color="red"
            variant="text"
            className="!absolute top-4 right-4 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </IconButton>
        </CardHeader> */}
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                        {user ? user.username : 'name'}
                    </Typography>
                    <Typography color="gray">
                        {user ? user.email : 'email'}
                    </Typography>
                    <Typography color="gray">
                        {certificate.course_name}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true}
                        onClick={() => approveRef.current.click()}>
                        Approve
                    </Button>
                    <Button color='red' className='mt-4' size="lg" fullWidth={true}
                        onClick={handleDelteThisCertificateRequest}>
                        Reject
                    </Button>
                </CardFooter>
            </Card>
            {
                user && <DialogWithForm key={certificate?._id} certificate={certificate} user={user} approveRef={approveRef}
                    fetchAllCertificatesRequested={fetchAllCertificatesRequested}
                    handleDelteThisCertificateRequest={handleDelteThisCertificateRequest} />
            }

        </>
    );
}



function DialogWithForm({ certificate, user, approveRef, fetchAllCertificatesRequested, handleDelteThisCertificateRequest }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleOpen = () => setOpen((cur) => !cur);
    function formatDate(timestamp) {
        const d = new Date(timestamp);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const [certificateDetails, setCertificateDetails] = useState({
        student_name: user?.username,
        course_name: certificate?.course_name,
        course_completed: formatDate(Date.now())
    })



    const handleCreateCertificate = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_SERVER}/api/certificates/approveAndCreate`, {
                method: 'POST',
                body: JSON.stringify({
                    ...certificateDetails,
                    student_email: user?.email // Using optional chaining to access user.email safely
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                credentials: 'include'
            })

            const data = await (response.json())
            await handleDelteThisCertificateRequest()
            await fetchAllCertificatesRequested()
            let driveData = data?.data?.data;
            console.log(data)
            // window.location.href = driveData.webViewLink
            navigate('/all-certificates')
        } catch (error) {
            console.log(error)
        } finally {
            handleOpen()
            setLoading(false)
        }
    }


    return (
        <>
            <Button className='hidden' ref={approveRef} onClick={handleOpen}>Sign In</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
                dismiss={
                    {
                        outsidePress: false
                    }
                }
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Approve Certificate Request
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Student Name
                        </Typography>
                        <Input disabled={loading} label="Student Name" size="lg" value={certificateDetails.student_name} onChange={(e) => setCertificateDetails((prev) => ({
                            ...prev,
                            student_name: e.target.value
                        }))} />
                        <Typography className="-mb-2" variant="h6">
                            Course Name
                        </Typography>
                        <Input disabled={loading} label="Course Name" size="lg" value={certificateDetails.course_name} onChange={(e) => setCertificateDetails((prev) => ({
                            ...prev,
                            course_name: e.target.value
                        }))} />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleCreateCertificate} fullWidth loading={loading}>
                            Submit
                        </Button>
                        <Button className='mt-3' variant="gradient" color='amber' onClick={handleOpen} fullWidth disabled={loading}>
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>

    );
}