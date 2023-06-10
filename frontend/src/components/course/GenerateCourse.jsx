import { Flex } from "../../UI/flex/Flex";
import { useState, useEffect } from "react";
import { getCourses, deleteCourseById } from "../../api/CourseApiService";
import { Header } from "../../UI/headers/Header";
import style from "./Course.module.css";
import { Button } from "../../UI/button/Button";
import { Input } from "../../UI/inputs/Input";
import { getSubjects } from "../../api/SubjectApiService";
import { Pagination } from "../pagination/Pagination";

export const CreateCourse = () => {

    const [subjects, setSubjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [subjectsAdded, setSubjectsAdded] = useState([]);

    const createCourseHandler = () => {

    }

    const addSubjectHandler = (subject) => {

        if (!subjects.includes(subject)){

            setSubjects(prevSubjects => setSubjectsAdded([...prevSubjects],subject));
        }else{
            setSubjects(prevSubjects=> prevSubjects.filter(s=> s.id != subject.id));
        }

    }


    useEffect(() => {
        getSubjects()
            .then((res) => setSubjects(res.data))
            .catch((err) => console.log(err))
        window.scrollTo(0, 0);
    }, []);
    const subjectsPerPage = 7;
    const lastSubjectIndex = currentPage * subjectsPerPage;
    const firstSubjectIndex = lastSubjectIndex - subjectsPerPage;
    let currentSubjects = subjects.slice(firstSubjectIndex, lastSubjectIndex);

    return (
        <Flex
            height={"100%"}
            width={"100%"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"none"}
        >
            <Header>
                <h2 style={{ fontSize: "60px" }}>GENERAR CURSOS</h2>
            </Header>
            <Flex
                height={"auto"}
                width={"80%"}
                direction={"column"}
                className={style["main-container"]}
                justifyContent={"none"}
                alignItems={"center"}
            >

                {currentSubjects.length > 0 ?
                    <>
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Semestre</th>
                                    <th>Carrera</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSubjects.map((subject) => {
                                const isSelected  = subjectsAdded.includes(subject);
                                const classStyle = isSelected
                                ? `${style["element-item"]} ${style.selected}`
                                : style["element-item"];
                                return(
                                                       
                                    <tr key={subject.id} className={classStyle} onClick={addSubjectHandler.bin(null,subject)}>
                                        <td>{subject.name}</td>
                                        <td>{subject.semester}</td>
                                        <td>{subject.career}</td>
                                    </tr>
                                    
                                )
                                })}
                            </tbody>
                        </table>
                        {subjects.length > 5 && (
                            <Pagination
                                totalitems={subjects.length}
                                itemsPerPage={subjectsPerPage}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            ></Pagination>
                        )}
                    </>
                    :
                    <p style={{ fontSize: "30px" }}>No hay estudiantes para mostrar</p>
                }
            </Flex>

        </Flex>
    );
}