import { useState } from "react";
import style from "./User.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import { Button } from "../../UI/button/Button";
import { careers } from "../../enums/Career"
import { Pagination } from "../pagination/Pagination";

const reformatSubjectCareer = (subject) => {
    const foundCareer = careers.find((career) => career.value === subject.career);
    return foundCareer ? foundCareer.name : "";
}

export const UserSubjectsModal = (props) => {
    const [subjectsAdded, setSubjectsAdded] = useState(props.subjectsAdded);
    const [subjects, setSubjects] = useState(props.subjects);
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const subjectsPerPage = 7;
    const lastSubjectIndex = currentPage * subjectsPerPage;
    const firstSubjectIndex = lastSubjectIndex - subjectsPerPage;
    const currentSubject = subjects.slice(firstSubjectIndex, lastSubjectIndex);

    const addSubject = (newSubject) => {
        if (subjectsAdded.includes(newSubject)) {
            removeSubject(newSubject);
        } else {
            setSubjectsAdded((prevSubject)=>[...prevSubject, newSubject]);
        }
    }
    const removeSubject = (subjectToRemove) => {
            setSubjectsAdded((prevSubject) => prevSubject.filter(s => s !== subjectToRemove));
        };
    
    const confirmHandler = () => {
        props.onConfirm(subjectsAdded);
        props.onClick();
    }

    return (
        <div className={style.backdrop}>
            <div className={style.modal}>
                <header className={style.header}>
                    <h2>Elija materias</h2>
                    <AiFillCloseCircle onClick={props.onClick} className={style["close__modal"]} />
                </header>
                <p>Puede seleccionar una o mas asignaturas</p>
                <div className={style["subjects-container"]}>
                    <input input={{placeholder: "Filtrar por nombre"}} style={{ height: "20px" }} />
                    <table>
                        <thead>
                            <tr>
                                <th>Asignatura</th>
                                <th>Carrera</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentSubject.map((subject, index) =>{
                                    const isSelected = subjectsAdded.includes(subject);
                                    const subjectClassName = isSelected ? `${style["subject-item"]} ${style.selected}` : style["subject-item"];
                                    return (
                                        <tr key={index}
                                        className={subjectClassName}
                                        onClick={() => addSubject(subject)}>
                                            <td>
                                                {subject.name}
                                            </td>
                                            <td>
                                                {reformatSubjectCareer(subject)}
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    {subjects.length > 8 && (
                        <Pagination totalItems={subjects.length}
                        itemsPerPage={subjectsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage} ></Pagination>
                    )}
                </div>
                <footer className={style.actions}>
                    <Button onClick={confirmHandler} inLineStyle={ {width: "100px"} }>
                        Confirmar
                    </Button>
                </footer>
            </div>
        </div>
    );
}