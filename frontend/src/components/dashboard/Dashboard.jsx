import { ProfessorCourseChart } from "./ProfessorCourseChart";
import { StudentsByCourseChart } from "./StudentsByCourseChart";
import { StudentDistributionChart } from "./StudentsDistributionChart";
import style from "./Dashboard.module.css";
import { Header } from "../../UI/headers/Header";
import { CoursesByLocationChart } from "./CoursesByLocationChart";
import { useEffect, useState } from "react";
import { getStudents } from "../../api/StudentApiService";
import { Flex } from "../../UI/flex/Flex";
import { Loading } from "../../UI/loading/Loading";

export const Dashboard = () =>{
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
      useEffect(() => {
        getStudents()
        .then((response) => {
            setStudents(response);
            setIsLoading(false);
        })
        .catch((error) => console.log(error));
      }, []);
    const courses = [{
        id:1,
        professor: {
            id: 6,
            nid: "123456768",
            name: "santiago",
            lastName: "car ",
            email: "asd@email.com",
            schedule: [
                {
                    id: 12,
                    day: "THURSDAY",
                    timeSlots: [
                        {
                            startTime: "16:00:00",
                            endTime: "19:00:00"
                        }
                    ]
                },
                {
                    id: 13,
                    day: "TUESDAY",
                    timeSlots: [
                        {
                            startTime: "13:00:00",
                            endTime: "19:00:00"
                        },
                        {
                            startTime: "16:00:00",
                            endTime: "18:00:00"
                        }
                    ]
                },
                {
                    id: 16,
                    day: "MONDAY",
                    timeSlots: [
                        {
                            startTime: "13:00:00",
                            endTime: "15:00:00"
                        }
                    ]
                }
            ],
            subjects: [
                {
                    id: 10,
                    name: "oe",
                    career: "INGENIERIA_DE_SOFTWARE",
                    academicHours: 96,
                    period: "SEMESTRAL",
                    semester: 2,
                    credits: 3
                }
            ]
        },
        subject: {
            id: 10,
            name: "oe",
            career: "INGENIERIA_DE_SOFTWARE",
            academicHours: 96,
            period: "SEMESTRAL",
            semester: 2,
            credits: 3
        },
        students: [{
            id: 12,
            nid: "1234",
            name: "alan",
            lastName: "west",
            email: "asdf@gmail.com",
            career: "INGENIERIA_DE_SOFTWARE",
            semester: 2,
            subjects: [
                {
                    id: 10,
                    name: "oe",
                    academicHours: 96,
                    career: "INGENIERIA_DE_SOFTWARE",
                    period: "SEMESTRAL",
                    semester: 2,
                    credits: 3
                },
                {
                    id: 11,
                    name: "calculo",
                    academicHours: 96,
                    career: "INGENIERIA_DE_SOFTWARE",
                    period: "TRIMESTRAL",
                    semester: 3,
                    credits: 3
                }
            ]
        },
    ],
        courseSchedule: [
            {
                id: 12,
                classroom: {
                    id:1,
                    name:"102",
                    location:"",
                    capability:"50"
                },
                day: "THURSDAY",
                timeSlots: [
                    {
                        startTime: "16:00:00",
                        endTime: "19:00:00"
                    }
                ]
            },
            {
                id: 13,
                classroom: {
                    id:2,
                    name:"107",
                    location:"",
                    capability:"50"
                },
                day: "TUESDAY",
                timeSlots: [
                    {
                        startTime: "13:00:00",
                        endTime: "19:00:00"
                    },
                    {
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    }
                ]
            },
            {
                id: 16,
                classroom: {
                    id:3,
                    name:"104",
                    location:"",
                    capability:"50"
                },
                day: "MONDAY",
                timeSlots: [
                    {
                        startTime: "13:00:00",
                        endTime: "15:00:00"
                    }
                ]
            }
        ]
    }]
    return isLoading ? ( <Loading/> )
    :(
        <div className={style["container"]}>
            <Header>
                <h2 style={{ fontSize: "60px" }}>Dashboard</h2>
            </Header>

            <div className={style["main-container"]}>

                <div className = {style["content"]}>

                <div className = {style["item"]}>
                    <h3>Cursos por ubicación</h3>
                    <CoursesByLocationChart courses={courses} />
                </div>

                <div className = {style["item"]}>
                    <h3>Profesores por curso </h3>
                    <ProfessorCourseChart courses={courses} />
                </div>

                <div className = {style["item"]}>
                    <h3>Estudiantes por curso </h3>
                    <StudentsByCourseChart courses={courses} />
                </div>
                
                <div className = {style["item"]}>
                    <h3>Estudiantes </h3>
                    <StudentDistributionChart students={students} />
                </div>
                </div>
                
            </div>
        </div>
    );
}