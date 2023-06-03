import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import style from "./Subject.module.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";

export const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const succesResponses = (res) => {
    console.log(res.data);
    setSubjects(res.data);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/subjects")
      .then((response) => succesResponses(response))
      .catch((error) => console.error(error));
  }, []);

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
            <Button inLineStyle={{ width: "180px", height: "60px" }}>
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
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td className={style.id}>{subject.id}</td>
                <td>{subject.name}</td>
                <td>{subject.career}</td>
                <td>{subject.semester}</td>
                <td>{subject.credits}</td>
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
      </Flex>
    </Flex>
  );
};
