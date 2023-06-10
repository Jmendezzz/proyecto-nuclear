import React from "react";
import style from "./Course.module.css";
import { Button } from "../../UI/button/Button";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Pagination } from "../pagination/Pagination";
import { Input } from "../../UI/inputs/Input";
import { Flex } from "../../UI/flex/Flex";

export const CourseStudentsModal = (props) => {

    const [students, setStudents] = useState(props.students);
    const [currentPage, setCurrentPage] = useState(1);

    const [search, setSearch] = useState("");

    const studentsPerPage = 5;
    const lastStudentIndex = currentPage * studentsPerPage;
    const firstStudentIndex = lastStudentIndex - studentsPerPage;
    let currentStudents = students.slice(firstStudentIndex, lastStudentIndex);

    if (search.trim() !== "") {
        currentStudents = students.filter(student => student.name.toLowerCase().includes(search.toLowerCase()) || student.lastName.toLowerCase().includes(search.toLowerCase()))
    }

    const searchHandler = (event) => {
        setSearch(event.target.value);
    }

    const confirmHandler = () => {
        props.onConfirm();
    }

    return (
        <div className={style.backdrop} >
            <div className={style.modal}>
                <header className={style.header}>
                    <h2>Estudiantes</h2>
                    <AiFillCloseCircle onClick={confirmHandler} className={style["close__modal"]} />
                </header>
                <Flex direction={"column"} height={"100%"} className={style["modal__content"]} >
                    <Flex direction={"row"}>
                        <Input
                            input={{ placeholder: "Nombre del estudiante", onChange: searchHandler }}
                            style={{ height: "5px" }}
                        ></Input>
                        <Button
                            inLineStyle={{ width: "100px", height: "50px", margin: "10px" }}
                        >
                            Buscar
                        </Button>

                    </Flex>


                    {currentStudents.length > 0 ?
                        <>
                            <table className={style.table}>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Semestre</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentStudents.map((student) => (
                                        <tr key={student.id}>
                                            <td>{student.name + " " + student.lastName}</td>
                                            <td>{student.semester}</td>
                                            <td>{student.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {students.length > 5 && (
                                <Pagination
                                    totalitems={students.length}
                                    itemsPerPage={studentsPerPage}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                ></Pagination>
                            )}
                        </>
                        :
                        <p style={{ fontSize: "30px" }}>No hay estudiantes para mostrar</p>
                    }
                    <footer className={style.actions}>
                        <Button onClick={confirmHandler} inLineStyle={{ width: "100px", height:"50px" }}>
                            Confirmar
                        </Button>
                    </footer>


                </Flex>

            </div>
        </div>

    );
}
