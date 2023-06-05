import { useEffect, useState } from "react";
import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import { Pagination } from "../pagination/Pagination";
import { getSubjects } from "../../api/SubjectApiService";
import { useNavigate } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import style from "./Professor.module.css";

export const Professor = () => {
    const [professors, setProfessors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const professorsxPage = 7;
    const succesResponse = (res) => {
        setProfessors(res.data);
    };
    useEffect(()=>{
        getSubjects()
        .then((response) => succesResponse(response))
        .catch((error)=>console.error(error));
    })
    const lastProfessorIndex = currentPage * professorsxPage;
    const firstProfessorIndex = lastProfessorIndex -professorsxPage;
    const currentProfessors = professors.slice(firstProfessorIndex, lastProfessorIndex);

    const navigate = useNavigate();

    return(
        <Flex height={"100%"} width={"100%"} direction={"column"} alignItems={"center"} justifyContent={"none"}>
            <Header>
                <h2 style={ {fontSize:"60px"} }>Profesores</h2>
            </Header>
            <Flex height={"auto"} width={"80%"} direction={"column"} alignItems={"center"} justifyContent={"none"} className={style["main-container"]}>
                <Flex height={"200px"} width={"100%%"} direction={"row"} gap={"30px"}>
                    <div style={ {width: "60%", margin: "10px"} }>
                        <Button inLineStyle={ {width: "180px", height: "60px"} } onClick={ ()=>navigate("/professors/crear") }>
                            Crear profesor
                        </Button>
                    </div>
                    <Input input={ {placeholder: "Nombre del Profesor"} } style={ {height: "20px"} }></Input>
                    <Button inLineStyle={ {width: "120px", height: "60px", margin: "10px"} }>Buscar</Button>
                </Flex>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>materias</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentProfessors.map((professor) => (
                                <tr key={professor.id}>
                                    <td className={style.id}>{professor.id}</td>
                                    <td>{professor.name}</td>
                                    <td>{professor.lastName}</td>
                                    {//TODO lista de materias <td>{professor.msubjects}</td>
                                    }
                                    <td className={style["actions__container"]}>
                                        <div className={style["icon__edit"]}>
                                            <BiEdit />
                                        </div>
                                        <div className={style["icon__delete"]}>
                                            <MdDeleteForever />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    professors.length > 8 && (
                        <Pagination totalItems={professors.length} itemsPerPage={professorsxPage} setCurrentPage={setCurrentPage} currentPage={currentPage}>
                        </Pagination>
                    )
                }
            </Flex>
        </Flex>
    );
};