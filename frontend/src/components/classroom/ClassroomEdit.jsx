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
        {classroom && // Valida que exista  la materia para poder renderizar el componente ya que si no provocará nulls.
            <>
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
                <ClassroomForm
                    classroom={classroom}
            
                    onSubmit={editClassroomHandler}
                />

                </Flex>
            </>
        }
    </Flex>
 
  );
};
