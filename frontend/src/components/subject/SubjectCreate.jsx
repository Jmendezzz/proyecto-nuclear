import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import style from "./Subject.module.css";
import { careers } from "../../enums/Career";
import Select from "react-select";
import { useInput } from "../../hooks/use-input";
import { saveSubject } from "../../api/SubjectApiService";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const SubjectCreate = () => {
  const navigate = useNavigate();


  const {
    value: subjectNameValue,
    valueChangeHandler: subjectNameValueChangeHandler
  } = useInput();

  const [
    subjectCareerValue,
    subjectCareerValueChangeHandler
  ] = useState("INGENIERIA_DE_SOFTWARE");

  const {
    value: subjectSemesterValue,
    valueChangeHandler: subjectSemesterValueChangeHandler
  } = useInput();

  const {
    value: subjectCreditsValue,
    valueChangeHandler: subjectCreditsValueChangeHandler
  } = useInput();


  const createSubjectHandler = () => {
    const subject = {
      name: subjectNameValue,
      career: subjectCareerValue,
      semester: subjectSemesterValue,
      credits: subjectCreditsValue
    }
    saveSubject(subject)
      .then(response => Swal.fire({
        title: "Asignatura creada",
        text: "Se ha creado la asignatura " + response.data.name,
        icon: "success",
        confirmButtonColor: "green",
        confirmButtonText: "Aceptar"

      }))
      .then(()=> navigate("/asignaturas"))
      .catch(error => Swal.fire({
        title: "Error",
        text: error.response.data.detail,
        icon: "error",
        confirmButtonColor: "red",
        confirmButtonText: "Aceptar"
      }))

  }

  const selectCareerHandler = ({ value }) => {
    subjectCareerValueChangeHandler(value);
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
            <Input style={{ height: "10px" }} input={{ onChange: subjectNameValueChangeHandler }} ></Input>
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
              noOptionsMessage={() => "No se encontraron carreras "}
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
              input={{ type: "number", min: 1, max: 8, onChange: subjectSemesterValueChangeHandler }}
            ></Input>
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Créditos</label>
            <Input
              style={{ height: "10px" }}
              input={{ type: "number", min: 1, onChange: subjectCreditsValueChangeHandler }}
            ></Input>
          </Flex>
          <Flex width>
            <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px", backgroundColor: "blue" }} onClick={createSubjectHandler}>
              Guardar
            </Button>
            <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px" }} onClick={()=> navigate("/asignaturas") }>
              Cancelar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
