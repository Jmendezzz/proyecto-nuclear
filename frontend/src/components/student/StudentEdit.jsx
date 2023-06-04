import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getStudentById, updateStudent } from "../../api/StudentApiService";
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

const validateForm = (values) => {    
      const errors = {};
      if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';

      if ((values.semester <= 0 || values.semester > 10)) errors.semester = "El semestre deber ser válido";
    
      if (isEmpty(values.semester.toString())) errors.semester = 'El semestre no debe estar vacío';
    
      //TODO:validation for subjects 
    
      if (isEmpty(values.email)) errors.email = 'El email no debe estar vacío';

      if (isEmpty(values.password)) errors.password = 'La contrasena no debe estar vacío';

      
      return errors;
    }

const succesResponseAlert = (response) => {
    Swal.fire({
        title: "Estudiante editado",
        text: "Se ha editado rl estudiante " + response.data.name,
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



export const StudentEdit = () => {
    const navigate = useNavigate();
    const { studentId } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [student, setSubject] = useState();
    const [
        studentCareerValue,
        studentCareerValueChangeHandler
    ] = useState("INGENIERIA_DE_SOFTWARE");

    const selectCareerHandler = ({ value }) => {
        studentCareerValueChangeHandler(value);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getSubjectById(studentId)
            .then((response) => {
                setStudent(response.data)
                setIsLoading(false)
            })
            .catch((error) => console.log(error))

    }, [])
    const editStudentHandler = (values) => {
        const studentUpdated = {
            id: student.id,
            name: values.name,
            career: studentCareerValue,
            semester: values.semester,
            subjects: values.subjects,
            email: values.email,
            password: values.password
        }
        updateStudent(studentUpdated)
            .then(response => succesResponseAlert(response))
            .then(() => navigate("/estudiantes"))
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
                    <h2 style={{ fontSize: "60px" }}>EDITAR ESTUDIANTES</h2>
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
                                name: student.name,
                                semester: student.semester,
                                subject: student.subject,
                                email: student.email,
                                password: student.password
                            }}
                            onSubmit={editStudentHandler}
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
                                        className={errors.subject && touched.subject ? style["form__item-error"] : style["form__item"]}
                                    >
                                        <label style={{ fontSize: "20px", color: errors.subject && touched.subject ? "red" : "black" }}>Materias</label>
                                        <Field name="subject" type="number" />
                                        <ErrorMessage name="subject" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                                    </Flex>

                                    <Flex
                                        direction={"column"}
                                        height={"auto"}
                                        alignItems={"none"}
                                        justifyContent={"none"}
                                        className={errors.email && touched.email ? style["form__item-error"] : style["form__item"]}
                                    >
                                        <label style={{ fontSize: "20px", color: errors.email && touched.email ? "red" : "black" }}>Email</label>
                                        <Field name="email" />
                                        <ErrorMessage name="email" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                                    </Flex>

                                    <Flex
                                        direction={"column"}
                                        height={"auto"}
                                        alignItems={"none"}
                                        justifyContent={"none"}
                                        className={errors.password && touched.password ? style["form__item-error"] : style["form__item"]}
                                    >
                                        <label style={{ fontSize: "20px", color: errors.password && touched.password ? "red" : "black" }}>Contrasena</label>
                                        <Field name="password" />
                                        <ErrorMessage name="password" style={{ fontSize: "17px", color: "red" }} component={"small"} />
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