import React from "react";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Classroom.module.css";
import { useEffect, useState } from "react";
import { useInput } from "../../hooks/use-input";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../UI/inputs/Input";
import { location } from "../../enums/Location";
import { tipologies } from "../../enums/Tipology";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { isEmpty } from "../../validations/InputValidations";
import { Button } from "../../UI/button/Button";
import { saveClassroom } from "../../api/ClassroomApiService";
import Swal from "sweetalert2";



const validateForm = (values) => {
  const errors = {};
  if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';

  if ((values.capability <= 0 || values.capability > 40)) errors.capability = "La capacidad debe ser válida";

  if (isEmpty(values.capability.toString())) errors.capability = 'La capacidad no debe estar vacío';

  if (isEmpty(values.elements.toString())) errors.elements = 'El número de elementos no debe estar vacío';

  if (values.elements <= 1) errors.elements = "El número de elementos deber ser válido";

  return errors;

}

const succesResponseAlert = (response) => {
  Swal.fire({
    title: "Salon editado",
    text: "Se ha editado el salon " + response.data.name,
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




export const ClassroomEdit = () => {
    const navigate=useNavigate();
    const {classroomId}=useParams();
    const [classroom,setClassroom]=useState();
 
  const [
    classroomLocationValue,
    classroomLocationValueChangeHandler
  ] = useState("PRINCIPAL");

  const [
    classroomTipologyValue,
    classroomTipologyValueChangeHandler
  ]= useState("NORMAL");

 
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     getSubjectById(subjectId)
//         .then((response) => {
//             setSubject(response.data)
//             setIsLoading(false)
//         })
//         .catch((error) => console.log(error))

// }, [])


  const editClassroomHandler = (values) => {
    const classroom = {
      name: values.name,
      location: classroomLocationValue,
      capability: values.capability,
      elements:values.elements, 
      tipology: classroomTipologyValue
    }
    saveClassroom(classroom)
      .then(response => succesResponseAlert(response))
      .then(() => navigate("/salones"))
      .catch(error => errorResponseAlert(error))

  }

  const selectLocationHandler = ({ value }) => {
    classroomLocationValueChangeHandler(value);
  }
 const selectTipologyHandler=({value})=>{
  classroomTipologyValueChangeHandler(value)
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
          className={style["create-classroom-container"]}
        >
          <Formik
            initialValues={{
              name: "",
              capability: "",
              elements: ""
            }}
            onSubmit={editClassroomHandler}
            validate={validateForm}
          >
            {({ errors, touched }) => (
              <Form className={style.form}>
                <Flex
                  direction={"column"}
                  height={"auto"}
                  alignItems={"none"}
                  justifyContent={"none"}
                  className={errors.name && touched.name ? style["form__item-error"] : style["form__item"]}
                >
                  <label style={{ fontSize: "20px", color: errors.name && touched.name ? "red" : "black" }}>Nombre</label>
                  <Field name="name" />
                  <ErrorMessage name="name" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                </Flex>
                <Flex
                  direction={"column"}
                  height={"auto"}
                  alignItems={"none"}
                  justifyContent={"none"}
                  className={style["form__item"]}
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
                  className={errors.capability && touched.capability ? style["form__item-error"] : style["form__item"]}
                >
                  <label style={{ fontSize: "20px", color: errors.capability && touched.capability ? "red" : "black" }}>Capacidad</label>
                  <Field name="capability" type="number" />
                  <ErrorMessage name="capability" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                </Flex>
                <Flex
                  direction={"column"}
                  height={"auto"}
                  alignItems={"none"}
                  justifyContent={"none"}
                  className={errors.elements && touched.elements ? style["form__item-error"] : style["form__item"]}
                >
                  <label style={{ fontSize: "20px", color: errors.elements && touched.elements ? "red" : "black" }}>Elementos</label>
                  <Field name="elements" />
                  <ErrorMessage name="elements" style={{ fontSize: "17px", color: "red" }} component={"small"} />
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
                  <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px", backgroundColor: "blue" }}>
                    Guardar
                  </Button>
                  <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px" }} onClick={() => navigate("/salones")}>
                    Cancelar
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>

        </Flex>
      </Flex>
    </Flex>

    );
};
