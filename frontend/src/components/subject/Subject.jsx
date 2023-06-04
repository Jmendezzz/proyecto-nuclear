import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import style from "./Subject.module.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { Pagination } from "../pagination/Pagination";
import { getSubjects } from "../../api/SubjectApiService";

import { useNavigate } from "react-router-dom";

export const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPerPage = 7;
  const succesResponse = (res) => {
    setSubjects(res.data);
  };
  useEffect(() => {
    getSubjects()
      .then((response) => succesResponse(response))
      .catch((error) => console.log(error));
  }, []);
  const lastSubjectIndex = currentPage * subjectsPerPage;
  const firstSubjectIndex = lastSubjectIndex - subjectsPerPage;
  const currentSubjects = subjects.slice(firstSubjectIndex, lastSubjectIndex);

  const navigate = useNavigate();

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
                    <BiEdit onClick={()=>navigate(`/asignaturas/editar/${subject.id}`)} />
                  </div>
                  <div className={style["icon__delete"]}>
                    <MdDeleteForever />
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
