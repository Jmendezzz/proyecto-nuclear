import React from "react";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Classroom.module.css";
import { Button } from "../../UI/button/Button";
import { useEffect, useState } from "react";
import { getClassroomById, updateClassroom } from "../../api/ClassroomApiService";
import { useInput } from "../../hooks/use-input";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../UI/inputs/Input";
import { location } from "../../enums/Location";
import { tipologies } from "../../enums/Tipology";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { isEmpty } from "../../validations/InputValidations";
import Swal from "sweetalert2";
import { Loading } from "../../UI/loading/Loading";
import { ClassroomElementsModal } from "./ClassroomElementsModal";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { elements } from "../../enums/Element";
import { ErrorResponse } from "../../UI/error/ErrorResponse";



const validateForm = (values) => {
  const errors = {};
  if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';

  if ((values.capability <= 0 || values.capability > 40)) errors.capability = "La capacidad debe ser válida";

  if (isEmpty(values.capability.toString())) errors.capability = 'La capacidad no debe estar vacío';


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
  console.log(error);
  Swal.fire({
    title: "Error",
    text: error,
    icon: "error",
    confirmButtonColor: "red",
    confirmButtonText: "Aceptar"
  })

}


const reformatElements=(classroomElements)=>{
  return classroomElements.map((element)=>{
    return elements.find((e) => e.value === element);
    
  }) 

  }
export const ClassroomEdit = () => {
  const navigate = useNavigate();
  const { classroomId } = useParams();
  const [classroom, setClassroom] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [elementsModal, setElementsModal] = useState(undefined);
  const [elementsAdded, setElementsAdded] = useState([]);
  const [error, setError] = useState(undefined);
  const [
    classroomLocationValue,
    classroomLocationValueChangeHandler
  ] = useState("PRINCIPAL");

  const [
    classroomTipologyValue,
    classroomTipologyValueChangeHandler
  ] = useState("NORMAL");


  useEffect(() => {
    window.scrollTo(0, 0);
    getClassroomById(classroomId)
      .then((response) => {
        setClassroom(response.data)
        console.log(response.data.elements);
        setElementsAdded(reformatElements(response.data.elements))
        setIsLoading(false)
      })
      .catch((error) => console.log(error))

  }, [])
  const hideElementsModalHandler = () => {
    setElementsModal(undefined);

  }
  const showElementsModalHandler = () => {
    setElementsModal(true)
  }
  const confirmElementsAddedHandler = (elements) => {
    setElementsAdded(elements);
  }

  const removeElement=(elementToRemove)=>{
    setElementsAdded((prevElements) =>
    prevElements.filter((element) => element !== elementToRemove)
  );
  }
  if(error){
    return <ErrorResponse errStatus={error.response.status} errMessage={error.response.data.message} />;
}

  const editClassroomHandler = (values) => {
    const classroom = {
      id:classroomId,
      name: values.name,
      location: classroomLocationValue,
      capability: values.capability,
      elements: elementsAdded.map((element)=>element.value),
      tipology: classroomTipologyValue
    }
    console.log(classroom);
    updateClassroom(classroom)
      .then(response => succesResponseAlert(response))
      .then(() => navigate("/salones"))
      .catch(error => errorResponseAlert(error))

  }

  const selectLocationHandler = ({ value }) => {
    classroomLocationValueChangeHandler(value);
  }
  const selectTipologyHandler = ({ value }) => {
    classroomTipologyValueChangeHandler(value)
  }

  return (
    isLoading ?
      <Loading />
      :
      <Flex
        height={"100%"}
        width={"100%"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"none"}
      >
      {elementsModal && <ClassroomElementsModal elements={elementsAdded} onConfirm={confirmElementsAddedHandler} onClick={hideElementsModalHandler} />}

        <Header>
          <h2 style={{ fontSize: "60px" }}>EDITAR SALONES</h2>
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
                name: classroom.name,
                capability: classroom.capability,
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
                  >
                    <Flex justifyContent={"none"} gap={"10px"} >
                      <label style={{ fontSize: "20px" }}>Elementos</label>
                      <IoIosAddCircle className={style["button__add-element"]} onClick={showElementsModalHandler} />
                    </Flex>
                    {elementsAdded.length === 0 ? <p>Aún no se han agregado elementos</p>
                      :
                      elementsAdded.map((element) => (
                        <Flex justifyContent={"none"} height={"50px"} >
                          <p className={style["element-list"]}>{element.name}</p>
                          <AiOutlineClose className={style["element-list__remove"]} onClick={removeElement.bind(null, element)} />
                        </Flex>
                      ))}

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
