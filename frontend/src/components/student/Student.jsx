import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import style from "./Student.module.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { Pagination } from "../pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { getStudents, deleteStudentById } from "../../api/StudentApiService";
import Swal from "sweetalert2";

export const Student = () => {
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

    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsChange, setStudentsChange] = useState(false);
    const studentsPerPage = 7;
    const succesResponses = (res) => {
      console.log(res.data);
      setStudents(res.data);
    };
    useEffect(() => {
      getStudents()
      .then((response) => succesResponses(response))
      .catch((error) => console.log(error));
      setStudentsChange(false);
    }, [studentsChange]);
    const lastStudentIndex = currentPage * studentsPerPage;
    const firstStudentIndex = lastStudentIndex - studentsPerPage;
    const currentStudents = students.slice(firstStudentIndex, lastStudentIndex);

    const navigate = useNavigate();

    const deleteStudentHandler = (id) => {
      Swal.fire({
        title: '¿Estas seguro de eliminar el estudiante?',
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
            deleteStudentById(id)
              .then((response) => {
                succesResponseAlert(response);
                setStudentsChange(true) 
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
          <h2 style={{ fontSize: "60px" }}>ESTUDIANTES</h2>
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
              onClick={() => navigate("/estudiantes/crear")}>
                Crear estudiante
              </Button>
            </div>
            <Input
              input={{ placeholder: "Nombre del estudiante" }}
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
                <th>asignaturas</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id}>
                  <td className={style.id}>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.career}</td>
                  <td>{student.semester}</td>
                  <td>{student.subjects}</td>
                  <td>{student.email}</td>
                  <td className={style["actions__container"]}>
                    <div className={style["icon__edit"]}>
                      <BiEdit onClick={() => navigate(`/estudiantes/editar/${student.id}`)}  />
                    </div>
                    <div className={style["icon__delete"]}>
                      <MdDeleteForever onClick={deleteStudentHandler.bind(null, student.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination 
            totalitems={students.length}
            itemsPerPage={studentsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          ></Pagination>
        </Flex>
      </Flex>
    );
  };