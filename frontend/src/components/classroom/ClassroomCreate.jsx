import React from "react";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Classroom.module.css";
import { useNavigate } from "react-router-dom";
import { saveClassroom } from "../../api/ClassroomApiService";
import Swal from "sweetalert2";
import {ClassroomForm} from './ClassroomForm';

const succesResponseAlert = (response) => {
  Swal.fire({
    title: "Salón creado",
    text: "Se ha creado el salón " + response.data.name,
    icon: "success",
    confirmButtonColor: "green",
    confirmButtonText: "Aceptar"

  })

}

const errorResponseAlert = (error) => {
  Swal.fire({
    title: "Error",
    text: error.response.data.detail,
    icon: "error",
    confirmButtonColor: "red",
    confirmButtonText: "Aceptar"
  })

}

export const ClassroomCreate = () => {

  const navigate = useNavigate();

  const createClassroomHandler = (values) => {
    const classroom = {
      name: values.name,
      location: values.location,
      capability: values.capability,
      elements: values.elements,
      tipology: values.tipology
    };
    saveClassroom(classroom)

      .then(response => succesResponseAlert(response))
      .then(() => navigate("/salones"))
      .catch(error => errorResponseAlert(error));
  };
  return (
    <Flex
      height={"100%"}
      width={"100%"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"none"}
    >
   
      <Header>
        <h2 style={{ fontSize: "60px" }}>CREAR SALONES</h2>
      </Header>
      <Flex
        height={"auto"}
        width={"80%"}
        direction={"column"}
        className={style["main-container"]}
        justifyContent={"none"}
        alignItems={"center"}
      >
        <ClassroomForm onSubmit={createClassroomHandler}/>
        
      </Flex>
    </Flex>

  );
};
