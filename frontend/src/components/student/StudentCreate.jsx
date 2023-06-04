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

import { useNavigate } from "react-router-dom";
export const StudentCreate = () => {
  const navigate = useNavigate();

  const {
    value: studentNameValue,
    valueChangeHandler: studentNameValueChangeHandler
  } = useInput();

  const [
    studentCareerValue,
    studentCareerValueChangeHandler
  ] = useState("INGENIERIA_DE_SOFTWARE");

  const {
    value: studentSemesterValue,
    valueChangeHandler: studentSemesterValueChangeHandler
  } = useInput();

  const {
    value: studentSubjectsValue,
    valueChangeHandler: studentSubjectsValueChangeHandler
  } = useInput();

  const {
    value: studentEmailValue,
    valueChangeHandler: studentEmailValueChangeHandler
  }= useInput();

  const createStudentHandler = () => {
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
            <Input style={{ height: "10px" }} input={{ onChange: studentNameValueChangeHandler }} ></Input>
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
              input={{ type: "number", min: 1, max: 8, onChange: studentSemesterValueChangeHandler }}
            ></Input>
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
              input={{ type: "number", min: 1, onChange: studentSubjectsValueChangeHandler }}
            ></Input>
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Email</label>
            <Input style={{ height: "10px" }} input={{ onChange: studentEmailValueChangeHandler }} ></Input>
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