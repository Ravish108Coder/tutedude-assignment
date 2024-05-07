import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

let sampleCourses = [
    {
        id: 1,
        title: 'introduction to C programming',
        description: 'Introduction to C programming: Basics of C programming language for beginners',
        src: 'https://imgs.search.brave.com/3SbpPhzanKC_O2ZnGdCV1HDc9rpjoSPkIAGQhoPn2ek/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMzA1MDYx/MTI4MTQvQy1Qcm9n/cmFtbWluZy1MYW5n/dWFnZS5wbmc',
    },
    {
        id: 2,
        title: 'Python',
        description: ' Learn Python programming language, versatile for various applications.',
        src: 'https://imgs.search.brave.com/SirYcrXhlxn_7-14B-nOntg3t5OHA316DvHOP1fQyA8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGFj/a2lmeS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTgvMDkv/TGVhcm4tUHl0aG9u/LTEuanBn'
    },
    {
        id: 3,
        title: 'Data Structures and Algorithms',
        description: ' Essential concepts for organizing and processing data efficiently.',
        src: 'https://imgs.search.brave.com/2Hq8GjW4JGLKdK_M7CiRzCT6i-djSXRPjl3iHTGbLpA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L2Nkbi11/cGxvYWRzLzIwMjMw/ODA3MTMzMDU0L0Rh/dGEtc3RydWN0dXJl/LWFsZ29yaXRobS5w/bmc',
    },
    {
        id: 4,
        title: 'DBMS',
        description: ' Understanding databases and management systems for data storage and retrieval.',
        src: 'https://imgs.search.brave.com/9QwkHqWkPo0t7O977T2lOPmluG9vDSbDp5mMfaYfF5I/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kM25q/amNiaGJvamJvdC5j/bG91ZGZyb250Lm5l/dC9hcGkvdXRpbGl0/aWVzL3YxL2ltYWdl/cHJveHkvaHR0cHM6/Ly9jb3Vyc2VyYS1j/b3Vyc2UtcGhvdG9z/LnMzLmFtYXpvbmF3/cy5jb20vNTEvYTYy/ZDA3OTVjMTRiNjZi/Y2I5ODMyZmJmNDlh/OGMzL1JlbGF0aW9u/YWxEYXRhYmFzZURl/c2lnbi5wbmc_YXV0/bz1mb3JtYXQsY29t/cHJlc3MsJTIwZW5o/YW5jZSZkcHI9MSZ3/PTI2NSZoPTIwNCZm/aXQ9Y3JvcCZxPTUw',
    },
    {
        id: 5,
        title: 'Web developement',
        description: 'Building websites and web applications using HTML, CSS, and JavaScript.',
        src: 'https://imgs.search.brave.com/L3apzgx_GiwlRVC3ok_B_azJks2xLKa98TNdgwoWHsY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kM2Yx/aXlmeHh6OGkxZS5j/bG91ZGZyb250Lm5l/dC9jb3Vyc2VzL2Nv/dXJzZV9pbWFnZS8z/OTE5ZGM3MTE0MDMu/anBn'
    },
    {
        id: 6,
        title: 'Operating system',
        description: ' Fundamentals of operating systems for computer management and resource allocation.',
        src: 'https://imgs.search.brave.com/tfRHn0gMuR8uAf_fAKs2nAlS7kYLBwMKRWgwzYBJ9h8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kM2Yx/aXlmeHh6OGkxZS5j/bG91ZGZyb250Lm5l/dC9jb3Vyc2VzL2Nv/dXJzZV9pbWFnZS8w/ZWVhNTczMTA1OGUu/anBn'
    },
]

export default function CourseCardCont() {
    const [courses, setCourses] = useState(sampleCourses)
    return (
        <div className="flex flex-wrap gap-4 justify-center mb-10">
            {
                courses.map((course) => {
                    return (
                        <CourseCard key={course.id} course={course}  />
                    )
                })
            }
        </div>
    )
}

function CourseCard({ course }) {
    const defaultImg = "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
    const imgSrc = course.src || defaultImg
    const [isAlredyRequested, setIsAlreadyRequested] = useState(false)
    
    // formData.course_name = course.title
    useEffect(()=>{
        const fetchIsAlreadyRequestedCourse = async () => {
            try {
                // const formData = new FormData()
                // formData.append('course_name', course.title)
                const response = await fetch(`${import.meta.env.VITE_SERVER}/api/certificates/isAlreadyRequested`, {
                    method: 'POST',
                    body: JSON.stringify({course_name: course.title}),
                    // body: formData,
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    credentials: 'include'
                  })
                  const data = await response.json()
                //   console.log(data)
                  setIsAlreadyRequested(data.alreadyRequested)
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchIsAlreadyRequestedCourse()
    },[])

    async function handleCreateCourseCertificateRequest() {
        try {
            const course_name = course.title;
            const response = await fetch(`${import.meta.env.VITE_SERVER}/api/certificates/createRequest`, {
                method: 'POST',
                body: JSON.stringify({ course_name }), // Send as JSON
                headers: {
                    'Content-Type': 'application/json', // Specify content type
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                credentials: 'include'
            });
            const data = await response.json();
            setIsAlreadyRequested(true)
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <Card color="cyan" className="w-96 hover:scale-105 transition-transform duration-300 ease-in-out">
            <CardHeader shadow={false} floated={false} className="h-64">
                <img
                    src={imgSrc}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <Typography color="blue-gray" className="font-extrabold text-center mb-2">
                    {course.title}
                </Typography>
                <Typography
                    variant="small"
                    color="black"
                    className="font-normal text-center"
                >
                    {course.description}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    ripple={false}
                    fullWidth={true}
                    className=" text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    color="amber"
                    // onClick={()=>handleRequestCertificate(course.id)}
                    onClick={handleCreateCourseCertificateRequest}
                    disabled={isAlredyRequested}
                >
                    Request Certificate
                </Button>
            </CardFooter>
        </Card>
    );
}