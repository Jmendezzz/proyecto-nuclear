import React from "react";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Classroom.module.css";
import { useEffect, useState } from "react";
import { getClassroomById, updateClassroom } from "../../api/ClassroomApiService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Loading } from "../../UI/loading/Loading";
import { ErrorResponse } from "../../UI/error/ErrorResponse";
import {ClassroomForm} from './ClassroomForm';

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

export const ClassroomEdit = () => {
  const navigate = useNavigate();
  const { classroomId } = useParams();
  const [classroom, setClassroom] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const errorResponseAction = (error) => {
    setIsLoading(false);
    setError(error);
}

  useEffect(() => {
    window.scrollTo(0, 0);
    getClassroomById(classroomId)
      .then((response) => {
        setClassroom(response.data)
        setIsLoading(false)
      })
      .catch((error) => errorResponseAction(error))

  }, [])
  
  if(error){
    return <ErrorResponse errStatus={error.response.status} errMessage={error.response.data.message} />;
}

  const editClassroomHandler = (values) => {
    const classroom = {
      id:classroomId,
      name: values.name,
      location: values.location,
      capability: values.capability,
      elements: values.elements,
      tipology: values.tipology
    }
    updateClassroom(classroom)
      .then(response => succesResponseAlert(response))
      .then(() => navigate("/salones"))
      .catch(error => errorResponseAlert(error))

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
        {classroom &&
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
