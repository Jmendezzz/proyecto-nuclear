import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import { saveStudent } from "../../api/StudentApiService";
import style from "./Student.module.css";
import { careers } from "../../enums/Career";
import Select from "react-select";
import { useInput } from "../../hooks/use-input";
import { useState } from "react";
import Swal from "sweetalert2";
import { isEmpty } from "../../validations/InputValidations";

import { useNavigate } from "react-router-dom";
export const StudentCreate = () => {
  const navigate = useNavigate();

  const {
    value: studentNameValue,
    isInvalid: studentNameIsInvalid,
    valueChangeHandler: studentNameValueChangeHandler,
    blurChangeHandler: studentNameBlurChangeHandler

  } = useInput(isEmpty);

  const [
    studentCareerValue,
    studentCareerValueChangeHandler
  ] = useState("INGENIERIA_DE_SOFTWARE");

  const {
    value: studentSemesterValue,
    isInvalid: studentSemesterIsInvalid,
    valueChangeHandler: studentSemesterValueChangeHandler,
    blurChangeHandler: studentSemesterBlurChangeHandler

  } = useInput(isEmpty);

  const {
    value: studentSubjectsValue,
    isInvalid: studentSubjectsIsInvalid,
    valueChangeHandler: studentSubjectsValueChangeHandler,
    blurChangeHandler: studentSubjectsBlurChangeHandler
  } = useInput(isEmpty);

  const {
    value: studentEmailValue,
    isInvalid: studentEmailIsInvalid,
    valueChangeHandler: studentEmailValueChangeHandler,
    blurChangeHandler: studentEmailBlurChangeHandler
  }= useInput(isEmpty);

  const createStudentHandler = () => {
    if(studentNameIsInvalid && studentSemesterIsInvalid && studentSubjectsIsInvalid && studentEmailIsInvalid){
      return;
    }
    const student = {
      name: studentNameValue,
      career: studentCareerValue,
      semester: studentSemesterValue,
      subjects: studentSubjectsValue,
      email: studentEmailValue

    }
    saveStudent(student)
      .then(response => Swal.fire({
        title: "estudiante creado",
        text: "se ha creado el estudiante " + response.data.name,
        icon: "success",
        confirmButtonColor: "green",
        confirmButtonText: "Aceptar"

      }))
      .then(()=> navigate("/estudiantes"))
      .catch(error => Swal.fire({
        title: "Error",
        text: error.response.data.detail,
        icon: "error",
        confirmButtonColor: "red",
        confirmButtonText: "Aceptar"
      }))
  }

  const selectCareerHandler = ({ value }) => {
    studentCareerValueChangeHandler(value);
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
        <h2 style={{ fontSize: "60px" }}>CREAR ESTUDIANTE</h2>
      </Header>
      <Flex
        height={"auto"}
        width={"80%"}
        direction={"column"}
        className={style["main-container"]}
        justifyContent={"none"}
        alignItems={"center"}
      >
        <Flex
          justifyContent={"none"}
          alignItems={"center"}
          direction={"column"}
          gap="20px"
          width={"90%"}
          className={style["create-subject-container"]}
        >
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Nombre</label>
            <Input style={{ height: "10px" }} input={{ onChange: studentNameValueChangeHandler, onBlur: studentNameBlurChangeHandler }} ></Input>
            {studentNameIsInvalid && <p style={{color:"red"}}>El nombre no debe estar vacío</p>}
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Carrera</label>
            <Select
              onChange={selectCareerHandler}
              defaultValue={{ label: careers[0].name, value: careers[0].value }}
              noOptionsMessage={() => "No se encontraron estudiantes "}
              className={style.select}
              options={careers.map((career) => ({
                label: career.name,
                value: career.value,
              }))}
            />
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Semestre</label>
            <Input
              style={{ height: "10px" }}
              input={{ type: "number", min: 1, max: 8, onChange: studentSemesterValueChangeHandler, onBlur: studentSemesterBlurChangeHandler }}
            ></Input>
            {studentSemesterIsInvalid && <p style={{color:"red"}}>El semestre no debe estar vacío</p>}
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Materias</label>
            <Input
              style={{ height: "10px" }}
              input={{ type: "number", min: 1, onChange: studentSubjectsValueChangeHandler, onBlur: studentSubjectsBlurChangeHandler }}
            ></Input>
            {studentSubjectsIsInvalid && <p style={{color:"red"}}>xxx falta solucion con lista manin</p>} //TODO: recorrer la lista de materias para mostar
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Email</label>
            <Input style={{ height: "10px" }} 
            input={{ onChange: studentEmailValueChangeHandler, onBlur: studentEmailBlurChangeHandler }} 
            ></Input>
            {studentEmailIsInvalid && <p style={{color:"red"}}>El email no debe estar vacío</p>}
          </Flex>
          <Flex width>
            <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px", backgroundColor: "blue" }} onClick={createStudentHandler}>
              Guardar
            </Button>
            <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px" }} onClick={()=> navigate("/estudiantes") }>
              Cancelar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};