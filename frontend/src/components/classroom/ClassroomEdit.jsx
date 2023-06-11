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



/**
 * This function validates a form by checking if the name and capability fields are not empty and if
 * the capability value is within a valid range.
 * @returns The function `validateForm` returns an object `errors` that contains error messages for any
 * validation errors found in the `values` object passed as an argument. The error messages are
 * specific to the validation rules defined in the function.
 */
const validateForm = (values) => {
  const errors = {};
  if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';

  if ((values.capability <= 0 || values.capability > 40)) errors.capability = "La capacidad debe ser válida";

  if (isEmpty(values.capability.toString())) errors.capability = 'La capacidad no debe estar vacío';


  return errors;

}

/**
 * The function displays a success alert message with the name of the edited salon.
 */
const succesResponseAlert = (response) => {
  Swal.fire({
    title: "Salon editado",
    text: "Se ha editado el salon " + response.data.name,
    icon: "success",
    confirmButtonColor: "green",
    confirmButtonText: "Aceptar"

  })

}

/**
 * The function displays an error message using the Swal library.
 */
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


/**
 * The function reformatElements maps an array of elements to a new array of elements with matching
 * values from a predefined array.
 * @returns The function `reformatElements` takes an array `classroomElements` as input and returns a
 * new array of objects where each object has a `value` property that matches an element in the
 * `elements` array. The `find` method is used to search for the matching element in the `elements`
 * array. The returned array contains the objects with the matching `value` property.
 */
const reformatElements=(classroomElements)=>{
  return classroomElements.map((element)=>{
    return elements.find((e) => e.value === element);
    
  }) 

  }
export const ClassroomEdit = () => {
/* These lines of code are defining and initializing state variables and hooks used in the
`ClassroomEdit` component. */
  const navigate = useNavigate();
  const { classroomId } = useParams();
  const [classroom, setClassroom] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [elementsModal, setElementsModal] = useState(undefined);
  const [elementsAdded, setElementsAdded] = useState([]);
  const [error, setError] = useState(undefined);
/* These lines of code are defining and initializing state variables and hooks used in the
`ClassroomEdit` component. */
  const [
    classroomLocationValue,
    classroomLocationValueChangeHandler
  ] = useState("PRINCIPAL");

  const [
    classroomTipologyValue,
    classroomTipologyValueChangeHandler
  ] = useState("NORMAL");


/* The above code is using the `useEffect` hook in a React component to fetch data for a classroom by
its ID and set the state of the component with the retrieved data. It also sets the `isLoading`
state to `false` once the data has been retrieved. Additionally, it scrolls the window to the top of
the page. The `reformatElements` function is likely used to transform the data into a format that is
easier to work with in the component. */
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
/**
 * The function hides a modal by setting its state to undefined.
 */
  const hideElementsModalHandler = () => {
    setElementsModal(undefined);

  }
 /**
  * This function sets the state of a modal to true, indicating that it should be shown.
  */
  const showElementsModalHandler = () => {
    setElementsModal(true)
  }
 /**
  * This function sets the state of "elementsAdded" to the provided "elements" parameter.
  */
  const confirmElementsAddedHandler = (elements) => {
    setElementsAdded(elements);
  }

  const removeElement=(elementToRemove)=>{
    setElementsAdded((prevElements) =>
    prevElements.filter((element) => element !== elementToRemove)
  );
  }
  if(error){
    console.log(error)
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