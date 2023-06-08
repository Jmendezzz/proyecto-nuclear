import React from "react";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Classroom.module.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { location } from "../../enums/Location";
import { tipologies } from "../../enums/Tipology";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { isEmpty } from "../../validations/InputValidations";
import { useState } from "react";
import { Button } from "../../UI/button/Button";
import { saveClassroom } from "../../api/ClassroomApiService";
import { IoIosAddCircle } from "react-icons/io";
import Swal from "sweetalert2";
import { ClassroomElementsModal } from "./ClassroomElementsModal";
import { AiOutlineClose } from "react-icons/ai";
import ClassroomForm from './ClassroomForm';


const validateForm = (values) => {
  const errors = {};
  if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';

  if ((values.capability <= 0 || values.capability > 40)) errors.capability = "La capacidad debe ser válida";

  if (isEmpty(values.capability.toString())) errors.capability = 'La capacidad no debe estar vacío';


  return errors;

}

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
  
    // Aquí puedes realizar la lógica para guardar el salón
    // Puedes llamar a tu API o servicio correspondiente para guardar los datos
  
    // Ejemplo:
    saveClassroom(classroom)

      .then(response => succesResponseAlert(response))
      .then(() => navigate("/salones"))
      .catch(error => errorResponseAlert(error));
      console.log(classroom);
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
