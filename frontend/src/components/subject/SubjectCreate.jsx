import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Subject.module.css";
import { careers } from "../../enums/Career";
import Select from "react-select";
import { saveSubject } from "../../api/SubjectApiService";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../../validations/InputValidations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { SubjectForm } from "./SubjectForm";

const validateForm = (values) => {
  const errors = {};
  if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';

  if (isEmpty(values.credits.toString())) errors.credits = 'El número de créditos no debe estar vacío';

  if (values.academicHours <= 0) errors.academicHours = 'El número de horas de trabajo academico debe ser válido'

  if (isEmpty(values.academicHours.toString())) errors.academicHours = 'El número de horas de trabajo academico no debe estar vacío'

  if ((values.semester <= 0 || values.semester > 10)) errors.semester = "El semestre deber ser válido";

  if (isEmpty(values.semester.toString())) errors.semester = 'El semestre no debe estar vacío';

  if (values.credits <= 1) errors.credits = "El número de créditos deber ser válido";


  return errors;

}

const succesResponseAlert = (response) => {
  Swal.fire({
    title: "Asignatura creada",
    text: "Se ha creado la asignatura " + response.data.name,
    icon: "success",
    confirmButtonColor: "green",
    confirmButtonText: "Aceptar"

  })

}

const errorResponseAlert = (error) => {
  console.log(error);
  Swal.fire({
    title: "Error",
    text: error.response.data.detail,
    icon: "error",
    confirmButtonColor: "red",
    confirmButtonText: "Aceptar"
  })
}
//TODO Reformat carrer enum 
export const SubjectCreate = () => {

  const navigate = useNavigate();

  const createSubjectHandler = (values) => {
    const subject = {
      name: values.name,
      career: values.career,
      semester: values.semester,
      credits: values.credits,
      academicHours: values.academicHours,
      period: values.period
    }
    console.log(subject);
    saveSubject(subject)
      .then(response => succesResponseAlert(response))
      .then(() => navigate("/asignaturas"))
      .catch(error => errorResponseAlert(error))

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
        <h2 style={{ fontSize: "60px" }}>CREAR ASGINATURA</h2>
      </Header>
      <Flex
        height={"auto"}
        width={"80%"}
        direction={"column"}
        className={style["main-container"]}
        justifyContent={"none"}
        alignItems={"center"}
      >
        <SubjectForm

          onSubmit={createSubjectHandler}

        />

      </Flex>
    </Flex>
  );
};
