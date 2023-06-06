import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getSubjectById, updateSubject } from "../../api/SubjectApiService";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Subject.module.css";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../UI/loading/Loading";
import { ErrorResponse } from "../../UI/error/ErrorResponse";
import { SubjectForm } from "./SubjectForm";



const succesResponseAlert = (response) => {
    Swal.fire({
        title: "Asignatura editada",
        text: "Se ha editado la asignatura " + response.data.name,
        icon: "success",
        confirmButtonColor: "green",
        confirmButtonText: "Aceptar"

    })

}

const errorResponseAlert = (error) => {
    Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonColor: "red",
        confirmButtonText: "Aceptar"
    })

}


export const SubjectEdit = () => {
    const navigate = useNavigate();
    const { subjectId } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(undefined);

    const [subject, setSubject] = useState();

    const errorResponseAction = (error) => {
        setIsLoading(false);
        setError(error);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getSubjectById(subjectId)
            .then((response) => {
                setSubject(response.data)
                setIsLoading(false)
            })
            .catch((error) => errorResponseAction(error))

    }, [])

    if (error) {
        return <ErrorResponse errStatus={error.response.status} errMessage={error.response.data.message} />;
    }

    const editSubjectHandler = (values) => {
        const subjectUpdated = {
            id: subject.id,
            name: values.name,
            career:values.career,
            semester: values.semester,
            credits: values.credits,
            academicHours: values.academicHours,
            period:values.period
        }
        console.log(subjectUpdated)
        updateSubject(subjectUpdated)
            .then(response => succesResponseAlert(response))
            .then(() => navigate("/asignaturas"))
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
                {subject && // Valida que exista  la materia para poder renderizar el componente ya que si no provocará nulls.
                    <>
                        <Header>
                            <h2 style={{ fontSize: "60px" }}>EDITAR ASGINATURA</h2>
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
                            subject={subject}
                    
                            onSubmit={editSubjectHandler}
                        />

                        </Flex>
                    </>
                }
            </Flex>
    );
}