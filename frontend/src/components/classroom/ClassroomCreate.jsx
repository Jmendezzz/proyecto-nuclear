import React from "react";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Classroom.module.css";
import { useInput } from "../../hooks/use-input";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Input } from "../../UI/inputs/Input";
import { location } from "../../enums/Location";
import { tipologies } from "../../enums/Tipology";
import { useState } from "react";
import { Button } from "../../UI/button/Button";
import { saveClassroom } from "../../api/ClassroomApiService";
import Swal from "sweetalert2";
export const ClassroomCreate = () => {
  const navigate = useNavigate();


  const {
    value: classroomNameValue,
    valueChangeHandler: classroomNameValueChangeHandler
  } = useInput();

  const [
    classroomLocationValue,
    classroomLocationValueChangeHandler
  ] = useState("PRINCIPAL");

  const {
    value: classroomCapabilityValue,
    valueChangeHandler: classroomCapabilityValueChangeHandler
  } = useInput();

  const {
    value: classroomElementsValue,
    valueChangeHandler: classroomElementsValueChangeHandler
  } = useInput();

  const [
    classroomTipologyValue,
    classroomTipologyValueChangeHandler
  ]= useState("NORMAL");


  const createClassroomHandler = () => {
    const classroom = {
      name: classroomNameValue,
      location: classroomLocationValue,
      capability: classroomCapabilityValue,
      elements: classroomElementsValue,
      tipology:classroomTipologyValue
      
    }
    saveClassroom(classroom)
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

  const selectLocationHandler = ({ value }) => {
    classroomLocationValueChangeHandler(value);
  }
  const selectTipologyHandler = ({ value }) => {
    classroomTipologyValueChangeHandler(value);
  }
    return(
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
            className={style["create-classroom-container"]}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Nombre</label>
            <Input style={{ height: "10px" }} input={{ onChange: classroomNameValueChangeHandler }} ></Input>
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Ubicacion</label>
            <Select
              onChange={selectLocationHandler}
              defaultValue={{ label: location[0].name, value: location[0].value }}
              noOptionsMessage={() => "No se encontraron carreras "}
              className={style.select}
              options={location.map((location) => ({
                label: location.name,
                value: location.value,
              }))}
            />
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Capacidad</label>
            <Input
              style={{ height: "10px" }}
              input={{ type: "number", min: 1, max: 8, onChange: classroomCapabilityValueChangeHandler }}
            ></Input>
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Elementos</label>
            <Input
              style={{ height: "10px" }}
              input={{ type: "number", min: 1, onChange: classroomElementsValueChangeHandler }}
            ></Input>
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Tipologia</label>
            <Select
              onChange={selectTipologyHandler}
              defaultValue={{ label: tipologies[0].name, value: tipologies[0].value }}
              noOptionsMessage={() => "No se encontraron carreras "}
              className={style.select}
              options={tipologies.map((tipology) => ({
                label: tipology.name,
                value: tipology.value,
              }))}
            />
          </Flex>
          <Flex width>
            <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px", backgroundColor: "blue" }} onClick={createClassroomHandler}>
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
