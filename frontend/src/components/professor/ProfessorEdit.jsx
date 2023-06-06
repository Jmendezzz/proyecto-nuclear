import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {Loading} from "../../UI/loading/Loading";
import {Header} from "../../UI/headers/Header";
import {Flex} from "../../UI/flex/Flex";
import style from "./Professor.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getProfessorById, getProfessors, updateProfessors } from "../../api/ProfessorApiService";
import { Button } from "../../UI/button/Button";
import { isEmpty } from "../../validations/InputValidations";
import { getSubjects } from "../../api/SubjectApiService";
import { UserSubjectsModal } from "../user/UserSubjectsModal";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";


const validateForm = (values) => {
	const errors = {};
    if (isEmpty(values.name)) errors.name = 'El nombre no puede ser vacío';
    if (isEmpty(values.lastName)) errors.lastName = 'El apellido no puede ser vacío';
    if (isEmpty(values.email)) errors.email = 'El correo electrónico no puede ser vacío';
    return errors;
};

const succesResponseAlert = (response) => {
	Swal.fire({
		icon: "success",
		title: "Profesor editado",
		text: "Se ha editado el profesor" + response.data.name,
		confirmButtonColor: "green",
		confirmButtonText: "Aceptar",
	});
};

const errorResponseAlert = (error) => {
	Swal.fire({
		icon: "error",
		title: "Error",
		text: error,
		confirmButtonColor: "red",
		confirmButtonText: "Aceptar",
	});
};

export const ProfessorEdit = () => {
    const [subjectsAdded, setSubjectsAdded] = useState([]);
	const [subjectsModal, setSubjectsModal] = useState(undefined);

    const [subjects, setSubjects] = useState([]);
	const succesResponse = (res) => {
		setSubjects(res.data);
	}
    const hideSubjectsModalHandler = () => {
		setSubjectsModal(undefined);
	}
	const showSubjectsModalHandler = () => {
        setSubjectsModal(true);
    }
	const confirmSubjectsAddedHandler = (subjects) =>{
		setSubjectsAdded(subjects);
	}
	const removeSubject = (subjectToRemove) => {
		setSubjectsAdded((prevSubject) => prevSubject.filter((subject) => subject !== subjectToRemove));
	}

	const navigate = useNavigate();
	const {professorId} = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [professor, setProfessor] = useState();

    const editProfessorHandler = (values) =>{
        const professorUpdated = {
            id: professor.id,
            name: values.name,
            lastName: values.lastName,
            email: values.email,
            subjects: subjectsAdded.map((subject) => {return {id: subject.id, name: subject.name}} )
        }
        updateProfessors(professorUpdated)
        .then(response => succesResponseAlert(response))
        .then(()=>navigate("/profesores"))
        .catch(error => errorResponseAlert(error))
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getProfessorById(professorId)
        .then((response) => {
            setProfessor(response.data)
            setSubjectsAdded(response.data.subjects)
            setIsLoading(false)
        })
        .catch((error) => console.log(error))
    }, [])

    useEffect(()=>{
		getSubjects()
		.then((response) => succesResponse(response))
		.catch((error) => console.log(error));
	}, []);

	return isLoading ? (
		<Loading />
	) : (
		<Flex
			height={"100%"}
			width={"100%"}
			direction={"column"}
			alignItems={"center"}
			justifyContent={"none"}
		>
            {subjectsModal && <UserSubjectsModal subjectsAdded={subjectsAdded} subjects={subjects} onConfirm={confirmSubjectsAddedHandler} onClick={hideSubjectsModalHandler} />}
			<Header>
				<h2 style={{fontSize: "60px"}}> EDITAR PROFESOR</h2>
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
                        name: professor.name,
                        lastName: professor.lastName,
                        email: professor.email,
                    }}
                    onSubmit={editProfessorHandler}
                    validate={validateForm}
                    >
                        {({ errors, touched })=>(
                            <Form className={style.form}>
                                <Flex direction={"column"}
                                        height={"auto"}
                                        alignItems={"none"}
                                        justifyContent={"none"}
                                        className={errors.name && touched.name ? style["form__item-error"] : style["form__item"]}>
                                            <label style={{ fontSize: "20px", color: errors.name && touched.name ? "red" : "black" }}>Nombre</label>
                                            <Field name="name" />
                                            <ErrorMessage name="name" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                                </Flex>
                                <Flex direction={"column"}
                                        height={"auto"}
                                        alignItems={"none"}
                                        justifyContent={"none"}
                                        className={errors.name && touched.name ? style["form__item-error"] : style["form__item"]}>
                                            <label style={{ fontSize: "20px", color: errors.name && touched.name ? "red" : "black" }}>Apellido</label>
                                            <Field name="lastName" />
                                            <ErrorMessage name="lastName" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                                </Flex>
                                <Flex direction={"column"}
                                        height={"auto"}
                                        alignItems={"none"}
                                        justifyContent={"none"}
                                        className={errors.name && touched.name ? style["form__item-error"] : style["form__item"]}>
                                            <label style={{ fontSize: "20px", color: errors.name && touched.name ? "red" : "black" }}>Email</label>
                                            <Field name="email" />
                                            <ErrorMessage name="email" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                                </Flex>
                                <Flex direction={"column"}	height={"auto"} alignItems={"none"} justifyContent={"none"}>
									<Flex justifyContent={"none"} gap={"10px"}>
										<label style={{ fontSize: "20px" }}>Materias </label>
										<IoIosAddCircle className={style["button__add-subject"]} onClick={showSubjectsModalHandler} />
									</Flex>
									{subjectsAdded.length === 0 ? <p>No hay materias agregadas</p> : 
									subjectsAdded.map((subject, index) => (
										<Flex key={index} justifyContent={"none"} height={"50px"}>
											<p className={style["subject-list"]}>{subject.name}</p>
											<AiOutlineClose className={style["subject-list__remove"]} onClick={removeSubject.bind(null, subject)} />
										</Flex>
									))}
								</Flex>
                                <Flex>
                                <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px", backgroundColor: "blue" }}>
                                            Guardar
                                        </Button>
                                        <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px" }} onClick={() => navigate("/profesores")}>
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
