import { Flex } from "../../UI/flex/Flex";
import { useState, useEffect } from "react";
import { getCourses, deleteCourseById } from "../../api/CourseApiService";
import { Header } from "../../UI/headers/Header";
import style from "./Course.module.css";
import { Button } from "../../UI/button/Button";
import { Input } from "../../UI/inputs/Input";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { CourseStudentsModal } from "./CourseStudentsModal";
import { Pagination } from "../pagination/Pagination";
import { CourseScheduleModal } from "./CourseScheduleModal";
import {AiOutlineSearch} from "react-icons/ai";


const succesResponseAlert = (response) => {
    Swal.fire(
        'Eliminado!',
        `El curso ${response.data.name} ha sido eliminado`,
        'success',
    )
}
const errorResponseAlert = (error) => {
    Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonColor: "red",
        confirmButtonText: "Aceptar",
    })
}

export const Course = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesChange, setCoursesChange] = useState(false);
    const [search, setSearch] = useState("");
    const [showStudentsModal, setShowStudentsModal] = useState(undefined);
    const [showCourseScheduleModal, setShowCourseScheduleModal] = useState(undefined);
    const [courseStudents, setCourseStudents] = useState([]);
    const [courseSchedule, setCourseSchedule] = useState([]);

    const navigate = useNavigate();

    const succesResponse = (res) => {
        setCourses(res.data);
    };

    const coursesPerPage = 5;
    const lastCourseIndex = currentPage * coursesPerPage;
    const firstCourseIndex = lastCourseIndex - coursesPerPage;
    let currentCourses = courses.slice(firstCourseIndex, lastCourseIndex);

    useEffect(() => {
        getCourses()
            .then((response) => succesResponse(response))
            .catch((error) => console.log(error)); // TODO
        setCoursesChange(false);
    }, [coursesChange]);

    const deleteCourseHandler = (courseId) => {
        Swal.fire({
            title: '¿Estas seguro de eliminar este curso?',
            text: "Estos cambios son irreversibles",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteCourseById(courseId)
                        .then((response) => {
                            succesResponseAlert(response);
                            setCoursesChange(true)
                        }
                        )
                        .catch((error) => {
                            errorResponseAlert(error);
                        })
                }
            })


    }
    const showStudentsModalHandler = (students) => {
        setCourseStudents(students);
        setShowStudentsModal(true);
    }
    const hideStudentsModalHandler = () => {
        setShowStudentsModal(undefined);
    }
    const showCourseScheduleModalHandler = (courseSchedule) => {
        setCourseSchedule(courseSchedule);
        setShowCourseScheduleModal(true);
    }
    const hideCourseScheduleModalHandler = () => {
        setShowCourseScheduleModal(undefined);
    }
    const searchHandler = (event) => {
        setSearch(event.target.value);
    }

    if (search.trim() !== "") {
        currentCourses = courses.filter(course => course.subject.name.toLowerCase().includes(search))
    }
    return (
        <Flex
            height={"100%"}
            width={"100%"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"none"}
        >
            {showStudentsModal && <CourseStudentsModal onConfirm={hideStudentsModalHandler} students={courseStudents} />}
            {showCourseScheduleModal && <CourseScheduleModal onConfirm={hideCourseScheduleModalHandler} schedule={courseSchedule} />}

            <Header>
                <h2 style={{ fontSize: "60px" }}>CURSOS</h2>
            </Header>
            <Flex
                height={"auto"}
                width={"80%"}
                direction={"column"}
                className={style["main-container"]}
                justifyContent={"none"}
                alignItems={"center"}
            >
                <Flex height={"200px"} width={"100%"} direction={"row"} gap={"30px"}>
                    <div style={{ width: "60%", margin: "10px" }}>
                        <Button
                            inLineStyle={{ width: "180px", height: "60px" }}
                            onClick={() => navigate("/cursos/generar")}
                        >
                            Generar cursos
                        </Button>
                    </div>
                    <Input
                        input={{ placeholder: "Nombre de la asginatura", onChange: searchHandler }}
                        style={{ height: "20px" }}
                    ></Input>
                    <AiOutlineSearch style={{ fontSize: "40px", color: "red" }} />
                </Flex>
                {currentCourses.length > 0 ?
                    <>
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Asignatura</th>
                                    <th>Profesor</th>
                                    <th>Estudiantes</th>
                                    <th>Horario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCourses.map((course) => (
                                    <tr key={course.id}>
                                        <td className={style.id}>{course.id}</td>
                                        <td>{course.subject.name}</td>
                                        <td style={{ width: "10px" }}>{course.professor.name}</td>
                                        <td><HiUserGroup className={style["students__icon"]} onClick={showStudentsModalHandler.bind(null, course.students)} /></td>
                                        <td><AiOutlineSchedule className={style["schedule__icon"]} onClick={showCourseScheduleModalHandler.bind(null, course.courseSchedule)} /></td>
                                        <td className={style["actions__container"]}>
                                            <BiEdit className={style["icon__edit"]} onClick={() => navigate(`/asignaturas/editar/${course.id}`)} />
                                            <MdDeleteForever className={style["icon__delete"]} onClick={deleteCourseHandler.bind(null, course.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {courses.length >=5 && (
                            <Pagination
                                totalItems={courses.length}
                                itemsPerPage={coursesPerPage}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            ></Pagination>
                        )}
                    </>
                    :
                    <p style={{ fontSize: "30px" }}>No hay cursos por mostrar</p>
                }
            </Flex>

        </Flex>

    );
}
