import { useEffect, useState } from "react";
import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import { Pagination } from "../pagination/Pagination";
import { useNavigate } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import style from "./Professor.module.css";
import Swal from "sweetalert2";
import { deleteProfessorById, getProfessors } from "../../api/ProfessorApiService";
import { IoIosListBox } from "react-icons/io";
import { ViewScheduleModal } from "./ViewScheduleModal";
import { AiOutlineSearch } from "react-icons/ai";

const succesResponseAlert = (response) => {
    Swal.fire(
        'Eliminado',
        `El profesor ${response.data.name} ha sido eliminado`,
        'success',
    )
}

const errorResponseAlert = (error) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
        confirmButtonColor: 'red',
        confirmButtonText: 'Aceptar',
    })
}

export const Professor = () => {
    const [professors, setProfessors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [professorsChange, setProfessorsChange] = useState(false);
    const professorsxPage = 7;
    const succesResponse = (res) => {
        setProfessors(res.data);
    };
    const [search, setSearch] = useState("");

    //modal view schedule
    const [viewScheduleModal, setViewScheduleModal] = useState(undefined);
    const [professor, setProfessor] = useState();
    const showScheduleModalHandler = (professor) => {
        setProfessor(professor);
        setViewScheduleModal(true);
    }
    const hideScheduleModalHandler = () => {
        setViewScheduleModal(undefined)
    }

    useEffect(()=>{
        getProfessors()
        .then((response) => succesResponse(response))
        .catch((error)=>console.error(error));
        setProfessorsChange(false);
    }, [professorsChange]);

    const lastProfessorIndex = currentPage * professorsxPage;
    const firstProfessorIndex = lastProfessorIndex -professorsxPage;
    let currentProfessors = professors.slice(firstProfessorIndex, lastProfessorIndex);

    const navigate = useNavigate();
    const deleteProfessorHandler = (id) => {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar este profesor?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        })
        .then((result) => {
            if (result.isConfirmed) {
                deleteProfessorById(id)
                .then((response) => {
                    succesResponseAlert(response);
                    setProfessorsChange(true)
                }).catch((error) => {
                    errorResponseAlert(error);
                })
            }
        })
    }

    const searchHandler = (event) => {
        setSearch(event.target.value);
    }
    if (search.trim() !== ""){
        currentProfessors = professors.filter(professor => professor.name.toLowerCase().includes(search))
    };
    
    return(
        <Flex height={"100%"} width={"100%"} direction={"column"} alignItems={"center"} justifyContent={"none"}>
            {viewScheduleModal && (
                <ViewScheduleModal
                professor = {professor}
                onClick={hideScheduleModalHandler} />
            )}
            <Header>
                <h2 style={ {fontSize:"60px"} }>Profesores</h2>
            </Header>
            <Flex height={"auto"} width={"80%"} direction={"column"} alignItems={"center"} justifyContent={"none"} className={style["main-container"]}>
                <Flex height={"200px"} width={"100%"} direction={"row"} gap={"30px"}>
                    <div style={ {width: "60%", margin: "10px"} }>
                        <Button inLineStyle={ {width: "180px", height: "60px"} } onClick={ ()=>navigate("/profesores/crear") }>
                            Crear profesor
                        </Button>
                    </div>
                    <Input input={ {placeholder: "Nombre del Profesor", onChange:searchHandler} } style={ {height: "20px"} }></Input>
                    <AiOutlineSearch style={{ fontSize: "40px", color: "red" }} />

                </Flex>
                {
                    currentProfessors.length === 0 ? <>
                    <p style={{ fontSize: "30px" }}>No hay profesores por mostrar</p>
                    </> :<>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Asignaturas</th>   
                            <th>Disponibilidad</th>                         
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentProfessors.map((professor) => (
                                <tr key={professor.id}>
                                    <td className={style.id}>{professor.id}</td>
                                    <td>{professor.name}</td>
                                    <td>{professor.lastName}</td>
                                    <td>{professor.email}</td>
                                    <td >
                                    <ul>
                                        {professor.subjects.map((subject)=>(
                                            <li key={subject.id} >{subject.name}</li>
                                        ))}
                                    </ul>
                                    </td>
                                    <td>
                                        <IoIosListBox className={style["schedule__icon"]} onClick={showScheduleModalHandler.bind(null, professor)} />
                                    </td>
                                    <td className={style["actions__container"]}>
                                            <BiEdit className={style["icon__edit"]} onClick={()=>navigate(`/profesores/editar/${professor.id}`)}/>
                                            <MdDeleteForever className={style["icon__delete"]} onClick={deleteProfessorHandler.bind(null, professor.id)}/>
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
                </>
                }
            </Flex>
        </Flex>
    );
};