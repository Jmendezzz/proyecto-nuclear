import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import style from "./Student.module.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "../pagination/Pagination";

export const Student = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 7;
    const succesResponses = (res) => {
      console.log(res.data);
      setStudents(res.data);
    };
    useEffect(() => {
      axios
        .get("http://localhost:8080/students")
        .then((response) => succesResponses(response))
        .catch((error) => console.error(error));
    }, []);
    const lastStudentIndex = currentPage * studentsPerPage;
    const firstStudentIndex = lastStudentIndex - studentsPerPage;
    const currentStudents = students.slice(firstStudentIndex, lastStudentIndex);
  
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
              <Button inLineStyle={{ width: "180px", height: "60px" }}>
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
                      <BiEdit />
                    </div>
                    <div className={style["icon__delete"]}>
                      <MdDeleteForever />
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