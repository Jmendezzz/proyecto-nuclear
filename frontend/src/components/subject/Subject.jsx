import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import style from "./Subject.module.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { Pagination } from "../pagination/Pagination";
import { getSubjects, deleteSubjectById } from "../../api/SubjectApiService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const succesResponseAlert= (response)=>{
  Swal.fire(
    'Eliminado!',
    `La asignatura ${response.data.name} ha sido eliminada`,
    'success',
  )
}
const errorResponseAlert = (error)=>{
  Swal.fire({
    title: "Error",
    text: error.response.data.message,
    icon: "error",
    confirmButtonColor: "red",
    confirmButtonText: "Aceptar",
  })

}

export const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsChange, setSubjectsChange] = useState(false);
  const subjectsPerPage = 7;
  const succesResponse = (res) => {
    setSubjects(res.data);
  };
  useEffect(() => {
    getSubjects()
      .then((response) => succesResponse(response))
      .catch((error) => console.log(error));
    setSubjectsChange(false);
  }, [subjectsChange]);
  const lastSubjectIndex = currentPage * subjectsPerPage;
  const firstSubjectIndex = lastSubjectIndex - subjectsPerPage;
  const currentSubjects = subjects.slice(firstSubjectIndex, lastSubjectIndex);

  const navigate = useNavigate();
  const deleteSubjectHandler = (id) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar esta asignatura?',
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
          deleteSubjectById(id)
            .then((response) => {
              succesResponseAlert(response);
              setSubjectsChange(true) //Indicates to the useEffect to update the subject list
            }
            )
            .catch((error) => {
              errorResponseAlert(error);              
            })
        }
      })

  }

  return (
    <Flex
      height={"100%"}
      width={"100%"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"none"}
    >
      <Header>
        <h2 style={{ fontSize: "60px" }}>ASIGNATURAS</h2>
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
              onClick={() => navigate("/asignaturas/crear")}
            >
              Crear asignatura
            </Button>
          </div>
          <Input
            input={{ placeholder: "Nombre de la asignatura" }}
            style={{ height: "20px" }}
          ></Input>
          <Button
            inLineStyle={{ width: "120px", height: "60px", margin: "10px" }}
          >
            Buscar
          </Button>
        </Flex>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Semestre</th>
              <th>Créditos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentSubjects.map((subject) => (
              <tr key={subject.id}>
                <td className={style.id}>{subject.id}</td>
                <td>{subject.name}</td>
                <td>{subject.career}</td>
                <td>{subject.semester}</td>
                <td>{subject.credits}</td>
                <td className={style["actions__container"]}>
                  <div className={style["icon__edit"]}>
                    <BiEdit onClick={() => navigate(`/asignaturas/editar/${subject.id}`)} />
                  </div>
                  <div className={style["icon__delete"]}>
                    <MdDeleteForever onClick={deleteSubjectHandler.bind(null, subject.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subjects.length > 8 && (
          <Pagination
            totalItems={subjects.length}
            itemsPerPage={subjectsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          ></Pagination>
        )}
      </Flex>
    </Flex>
  );
};
