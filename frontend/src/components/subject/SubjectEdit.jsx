import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getSubjectById, updateSubject } from "../../api/SubjectApiService";
import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Subject.module.css";
import { careers } from "../../enums/Career";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../../validations/InputValidations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Loading } from "../../UI/loading/Loading";
import { ErrorResponse } from "../../UI/error/ErrorResponse";

const validateForm = (values) => {
    console.log(values)
    const errors = {};
    if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';

    if (isEmpty(values.credits.toString())) errors.credits = 'El número de créditos no debe estar vacío';
  
    if (values.academicHours <= 0) errors.academicHours = 'El número de horas de trabajo academico debe ser válido'
  
    if (isEmpty(values.academicHours.toString())) errors.academicHours = 'El número de horas de trabajo academico no debe estar vacío'
  
    if ((values.semester <= 0 || values.semester > 10)) errors.semester = "El semestre deber ser válido";
  
    if (isEmpty(values.semester.toString())) errors.semester = 'El semestre no debe estar vacío';
  
    if (values.credits <= 1) errors.credits = "El número de créditos deber ser válido";

    return errors;

}

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

    const [period, setPeriod] = useState();

    const periodHandler = (event) => {
        setPeriod(event.target.value);
    }

    const [
        subjectCareerValue,
        subjectCareerValueChangeHandler
    ] = useState("INGENIERIA_DE_SOFTWARE");

    const selectCareerHandler = ({ value }) => {
        subjectCareerValueChangeHandler(value);
    }
    const errorResponseAction = (error) => {
        setIsLoading(false);
        setError(error);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getSubjectById(subjectId)
            .then((response) => {
                setSubject(response.data)
                console.log(response)
                setPeriod(response.data.period)
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
            career: subjectCareerValue,
            semester: values.semester,
            credits: values.credits,
            academicHours: values.academicHours,
            period:period
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
                            <Flex
                                justifyContent={"none"}
                                alignItems={"center"}
                                direction={"column"}
                                gap="20px"
                                width={"90%"}
                                className={style["create-subject-container"]}
                            >
                                <Formik
                                    initialValues={{
                                        name: subject.name,
                                        semester: subject.semester,
                                        credits: subject.credits,
                                        academicHours: subject.academicHours,

                                    }}
                                    onSubmit={editSubjectHandler}
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
                                                className={errors.semester && touched.semester ? style["form__item-error"] : style["form__item"]}
                                            >
                                                <label style={{ fontSize: "20px", color: errors.semester && touched.semester ? "red" : "black" }}>Semestre</label>
                                                <Field name="semester" type="number" />
                                                <ErrorMessage name="semester" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                                            </Flex>
                                            <Flex
                                                direction={"column"}
                                                height={"auto"}
                                                alignItems={"none"}
                                                justifyContent={"none"}
                                                className={style["form__item"]}
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
                                                className={errors.credits && touched.credits ? style["form__item-error"] : style["form__item"]}
                                            >
                                                <label style={{ fontSize: "20px", color: errors.credits && touched.credits ? "red" : "black" }}>Créditos</label>
                                                <Field name="credits" type="number" />
                                                <ErrorMessage name="credits" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                                            </Flex>
                                            <Flex
                                                direction={"column"}
                                                height={"auto"}
                                                alignItems={"none"}
                                                justifyContent={"none"}
                                                className={errors.academicHours && touched.academicHours ? style["form__item-error"] : style["form__item"]}
                                            >
                                                <label style={{ fontSize: "20px", color: errors.academicHours && touched.academicHours ? "red" : "black" }}>No. horas de trabajo acacémico</label>
                                                <Field name="academicHours" type="number" />
                                                <ErrorMessage name="academicHours" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                                            </Flex>
                                            <Flex
                                                direction={"column"}
                                                height={"auto"}
                                                alignItems={"none"}
                                                justifyContent={"none"}

                                            >
                                                <label style={{ fontSize: "20px"}}>Periodo</label>

                                                <label>
                                                    Semestral
                                                    <input type="checkbox" style={{ margin: "10px" }} value={"SEMESTRAL"} group="period" checked={period == "SEMESTRAL"} onChange={periodHandler} />

                                                </label>

                                                <label>
                                                    Trimestral
                                                    <input type="checkbox" style={{ margin: "10px" }} value={"TRIMESTRAL"} group="period" checked={period == "TRIMESTRAL"} onChange={periodHandler} />

                                                </label>

                                            </Flex>

                                            <Flex >
                                                <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px", backgroundColor: "blue" }}>
                                                    Guardar
                                                </Button>
                                                <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px" }} onClick={() => navigate("/asignaturas")}>
                                                    Cancelar
                                                </Button>
                                            </Flex>
                                        </Form>
                                    )}
                                </Formik>

                            </Flex>
                        </Flex>
                    </>
                }
            </Flex>
    );
}