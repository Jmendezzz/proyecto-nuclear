import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getSubjectById, updateSubject } from "../../api/SubjectApiService";
import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Subject.module.css";
import { careers } from "../../enums/Career";
import Select from "react-select";
import { saveSubject } from "../../api/SubjectApiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../../validations/InputValidations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Loading } from "../../UI/loading/Loading";

const validateForm = (values) => {
    const errors = {};
    if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';

    if ((values.semester <= 0 || values.semester > 10)) errors.semester = "El semestre deber ser válido";

    if (isEmpty(values.semester.toString())) errors.semester = 'El semestre no debe estar vacío';

    if (isEmpty(values.credits.toString())) errors.credits = 'El número de créditos no debe estar vacío';

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

    const [subject, setSubject] = useState();
    const [
        subjectCareerValue,
        subjectCareerValueChangeHandler
    ] = useState("INGENIERIA_DE_SOFTWARE");

    const selectCareerHandler = ({ value }) => {
        subjectCareerValueChangeHandler(value);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getSubjectById(subjectId)
            .then((response) => {
                setSubject(response.data)
                setIsLoading(false)
            })
            .catch((error) => console.log(error))

    }, [])
    const editSubjectHandler = (values) => {
        const subjectUpdated = {
            id: subject.id,
            name: values.name,
            career: subjectCareerValue,
            semester: values.semester,
            credits: values.credits
        }
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
                                credits: subject.credits
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
                                    <Flex width>
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
            </Flex>
    );


}