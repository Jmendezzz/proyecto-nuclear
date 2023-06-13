import { isEmpty } from "../../validations/InputValidations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { careers } from "../../enums/Career";
import Select from "react-select";
import { Button } from "../../UI/button/Button";
import style from "./Subject.module.css";
import { Flex } from "../../UI/flex/Flex";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




const validateForm = (values) => {
    const errors = {};
    if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';

    if (isEmpty(values.credits.toString())) errors.credits = 'El número de créditos no debe estar vacío';

    if (values.academicHours <= 0  || values.academicHours<32) errors.academicHours = 'El número de horas de trabajo academico debe ser válido'

    if (isEmpty(values.academicHours.toString())) errors.academicHours = 'El número de horas de trabajo academico no debe estar vacío'

    if ((values.semester <= 0 || values.semester > 10)) errors.semester = "El semestre deber ser válido";

    if (isEmpty(values.semester.toString())) errors.semester = 'El semestre no debe estar vacío';

    if (values.credits <= 1) errors.credits = "El número de créditos deber ser válido";

    return errors;

}
export const SubjectForm = ({ subject, onSubmit }) => {
    const navigate = useNavigate();
    const [period, setPeriod] = useState(subject ? subject.period : "SEMESTRAL");

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

    const submitButtonHandler = (values) => {

        onSubmit(  // Con el spread (...) copia todo lo que llegue de values o sea lo que envia el Formik y le adjunto la carrera y periodo al objeto.
            {
                ...values,
                career: subjectCareerValue,
                period
            }
        ); // Llama a la función que llega por parametro, ya sea enviada por el componente de editar o crear.

    }
    return (
        <Flex
            justifyContent={"none"}
            alignItems={"center"}
            direction={"column"}
            gap="20px"
            width={"90%"}
            className={style["create-subject-container"]}
        >
            <Formik
                initialValues={
                    subject ? { // Valida si llega por props una asignatura en caso de que sí, los valores iniciales serán asignados.
                        name: subject.name,
                        semester: subject.semester,
                        credits: subject.credits,
                        academicHours: subject.academicHours,

                    } :
                        {
                            name: "",
                            semester: "",
                            credits: "",
                            academicHours: "",
                        }

                }
                onSubmit={submitButtonHandler}
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
                            <label style={{ fontSize: "20px" }}>Periodo</label>

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

    );

}