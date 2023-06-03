import React from "react";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Button } from "../../UI/button/Button";
import { Input } from "../../UI/inputs/Input";
import style from "./Classroom.module.css";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import { useState, useEffect } from "react";
export const Classroom = () => {
    const [classroom, setClassroom] = useState([]);
    const succesResponses = (res) => {
      console.log(res.data);
      setClassroom(res.data);
    };
    useEffect(() => {
      axios
        .get("http://localhost:8080/classrooms")
        .then((response) => succesResponses(response))
        .catch((error) => console.error(error));
    }, []);

    return(
        <Flex
        height={"100%"}
        width={"100%"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"none"}
      >
        <Header>
        <h2 style={{ fontSize: "60px" }}>SALONES</h2>
        </Header>
        <Flex
        height={"auto"}
        width={"90%"}
        direction={"column"}
        className={style["main-container"]}
        justifyContent={"none"}
        alignItems={"center"}
      >
         <Flex height={"200px"} width={"100%"} direction={"row"} gap={"30px"}>
          <div style={{ width: "60%", margin: "10px" }}>
            <Button inLineStyle={{ width: "180px", height: "60px" }}>
              Crear salon
            </Button>
          </div>
          <Input
            input={{ placeholder: "Nombre del id" }}
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
              <th>Ubicacion</th>
              <th>Capacidad</th>
              <th>Elementos</th>
              <th>Tipologia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {classroom.map((classroom) => (
              <tr key={classroom.id}>
                <td className={style.id}>{classroom.id}</td>
                <td>{classroom.name}</td>
                <td>{classroom.location}</td>
                <td>{classroom.capability}</td>
                <td>{classroom.elements}</td>
                <td>{classroom.tipology}</td>
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
}