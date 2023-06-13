import {useEffect, useState} from "react";
import {getSubjects} from "../../api/SubjectApiService";
import {useNavigate} from "react-router-dom";
import {Flex} from "../../UI/flex/Flex";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "../../UI/button/Button";
import {isEmpty} from "../../validations/InputValidations";
import {UserSubjectsModal} from "../user/UserSubjectsModal";
import {IoIosAddCircle} from "react-icons/io";
import {AiOutlineClose} from "react-icons/ai";
import style from "./User.module.css";
import Select from "react-select";
import { careers } from "../../enums/Career";

export const UserForm = ({user, role, onSubmit}) => {
	const validateForm = (values) => {
		const errors = {};
		if (role === "PROFESSOR") {
			if (isEmpty(values.nid)) errors.nid = "El nid no puede ser vacío";
			if (isEmpty(values.name))
				errors.name = "El nombre no puede ser vacío";
			if (isEmpty(values.lastName))
				errors.lastName = "El apellido no puede ser vacío";
			if (isEmpty(values.email))
				errors.email = "El email no puede ser vacío";

		} else {
			if (isEmpty(values.nid)) errors.nid = "El nid no debe estar vacío";
			if (isEmpty(values.name))
				errors.name = "El nombre no debe estar vacío";
			if (isEmpty(values.lastName))
				errors.lastName = "El apellido no puede ser vacío";
			if (values.semester <= 0 || values.semester > 10)
				errors.semester = "El semestre deber ser válido";
			if (isEmpty(values.semester.toString()))
				errors.semester = "El semestre no debe estar vacío";
			if (isEmpty(values.email))
				errors.email = "El email no debe estar vacío";
			if(values.nid.length < 8) errors.nid = "El nid debe ser valido."

		}
		return errors;
	};

	const navigate = useNavigate();

	const [subjects, setSubjects] = useState([]);
	const succesResponse = (res) => {
		setSubjects(res.data);
	};

	useEffect(() => {
		getSubjects()
			.then((response) => succesResponse(response))
			.catch((error) => console.log(error));
	}, []);

	const [subjectsAdded, setSubjectsAdded] = useState( user ? user.subjects : []);
	const [subjectsModal, setSubjectsModal] = useState(undefined);

	const hideSubjectsModalHandler = () => {
		setSubjectsModal(undefined);
	};
	const showSubjectsModalHandler = () => {
		setSubjectsModal(true);
	};
	const confirmSubjectsAddedHandler = (subjects) => {
		setSubjectsAdded(subjects);
	};
	const removeSubject = (subjectToRemove) => {
		setSubjectsAdded((prevSubject) =>
			prevSubject.filter((subject) => subject !== subjectToRemove)
		);
	};

	const submitButtonHandler = (values) => {
		onSubmit({...values, subjects: subjectsAdded, career:studentCareerValue});
	};

    const [
        studentCareerValue,
        studentCareerValueChangeHandler
    ] = useState("INGENIERIA_DE_SOFTWARE");

    const selectCareerHandler = ({ value }) => {
        studentCareerValueChangeHandler(value);
    }

    
	let initialValues = 
		role === "PROFESSOR"
			? {
					nid: "",
					name: "",
					lastName: "",
					email: "",
			}
			: {
					nid:  "",
					name: "",
					lastName: "",
					email: "",
					semester: "",
					career: "",
			};
            if (user) {
                initialValues = 
                    role === "PROFESSOR"
                    ? {
                            nid: user.nid,
                            name: user.name,
                            lastName: user.lastName,
                            email: user.email,
                    }
                    : {
                            nid:  user.nid ,
                            name: user.name,
                            lastName: user.lastName,
                            email: user.email,
                            semester: user.semester,
                            career: user.career,
                    };
            }
	return (
		<Flex
			height={"auto"}
			width={"80%"}
			direction={"column"}
			className={style["main-container"]}
			justifyContent={"none"}
			alignItems={"center"}>
			{subjectsModal && (
				<UserSubjectsModal
					subjectsAdded={subjectsAdded}
					subjects={subjects}
					onConfirm={confirmSubjectsAddedHandler}
					onClick={hideSubjectsModalHandler}
				/>
			)}
			<Flex
				justifyContent={"none"}
				alignItems={"center"}
				direction={"column"}
				gap="20px"
				width={"90%"}
				className={style["create-subject-container"]}>
				<Formik
					initialValues={initialValues}
					onSubmit={submitButtonHandler}
					validate={validateForm}>
					{({errors, touched}) => (
						<Form className={style.form}>
							<Flex
								direction={"column"}
								height={"auto"}
								alignItems={"none"}
								justifyContent={"none"}
								className={
									errors.name && touched.name
										? style["form__item-error"]
										: style["form__item"]
								}>
								<label
									style={{
										fontSize: "20px",
										color:
											errors.name && touched.name
												? "red"
												: "black",
									}}>
									Nombre
								</label>
								<Field name="name" />
								<ErrorMessage
									name="name"
									style={{fontSize: "17px", color: "red"}}
									component={"small"}
								/>
							</Flex>
							<Flex
								direction={"column"}
								height={"auto"}
								alignItems={"none"}
								justifyContent={"none"}
								className={
									errors.lastName && touched.lastName
										? style["form__item-error"]
										: style["form__item"]
								}>
								<label
									style={{
										fontSize: "20px",
										color:
											errors.lastName && touched.lastName
												? "red"
												: "black",
									}}>
									Apellido
								</label>
								<Field name="lastName" />
								<ErrorMessage
									name="lastName"
									style={{fontSize: "17px", color: "red"}}
									component={"small"}
								/>
							</Flex>
							<Flex
								direction={"column"}
								height={"auto"}
								alignItems={"none"}
								justifyContent={"none"}
								className={
									errors.nid && touched.nid
										? style["form__item-error"]
										: style["form__item"]
								}>
								<label
									style={{
										fontSize: "20px",
										color:
											errors.nid && touched.nid
												? "red"
												: "black",
									}}>
									Numero de identificación
								</label>
                                {user ? (
                                    <p>{user.nid}</p>
                                ): (
                                    <>
                                    <Field name="nid" />
								<ErrorMessage
									name="nid"
									style={{fontSize: "17px", color: "red"}}
									component={"small"}
								/>
                                    </>
                                )}
							</Flex>
							<Flex
								direction={"column"}
								height={"auto"}
								alignItems={"none"}
								justifyContent={"none"}
								className={
									errors.email && touched.email
										? style["form__item-error"]
										: style["form__item"]
								}>
								<label
									style={{
										fontSize: "20px",
										color:
											errors.email && touched.email
												? "red"
												: "black",
									}}>
									Email
								</label>
								<Field name="email" />
								<ErrorMessage
									name="email"
									style={{fontSize: "17px", color: "red"}}
									component={"small"}
								/>
							</Flex>
                            { role === "STUDENT" && (
                                <>
                            <Flex
								direction={"column"}
								height={"auto"}
								alignItems={"none"}
								justifyContent={"none"}
								className={
									errors.semester && touched.semester
										? style["form__item-error"]
										: style["form__item"]
								}>
								<label
									style={{
										fontSize: "20px",
										color:
											errors.semester && touched.semester
												? "red"
												: "black",
									}}>
									Semestre
								</label>
								<Field name="semester" type="number" />
								<ErrorMessage
									name="semester"
									style={{fontSize: "17px", color: "red"}}
									component={"small"}
								/>
							</Flex>
							<Flex
								direction={"column"}
								height={"auto"}
								alignItems={"none"}
								justifyContent={"none"}
								className={style["form__item"]}>
								<label style={{fontSize: "20px"}}>
									Carrera
								</label>
								<Select
									onChange={selectCareerHandler}
									defaultValue={{
										label: careers[0].name,
										value: careers[0].value,
									}}
									noOptionsMessage={() =>
										"No se encontraron carreras "
									}
									className={style.select}
									options={careers.map((career) => ({
										label: career.name,
										value: career.value,
									}))}
								/>
							</Flex> </>)}
							<Flex
								direction={"column"}
								height={"auto"}
								alignItems={"none"}
								justifyContent={"none"}>
								<Flex justifyContent={"none"} gap={"10px"}>
									<label style={{fontSize: "20px"}}>
										Materias{" "}
									</label>
									<IoIosAddCircle
										className={style["button__add-subject"]}
										onClick={showSubjectsModalHandler}
									/>
								</Flex>
								{subjectsAdded.length === 0 ? (
									<p>No hay materias agregadas</p>
								) : (
									subjectsAdded.map((subject, index) => (
										<Flex
											key={index}
											justifyContent={"none"}
											height={"50px"}>
											<p
												className={
													style["subject-list"]
												}>
												{subject.name}
											</p>
											<AiOutlineClose
												className={
													style[
														"subject-list__remove"
													]
												}
												onClick={removeSubject.bind(
													null,
													subject
												)}
											/>
										</Flex>
									))
								)}
							</Flex>
							<Flex>
								<Button
									inLineStyle={{
										width: "120px",
										height: "40px",
										margin: "10px",
										backgroundColor: "blue",
									}}>
									Guardar
								</Button>
								<Button
									inLineStyle={{
										width: "120px",
										height: "40px",
										margin: "10px",
									}}
									onClick={() => navigate("/profesores")}>
									Cancelar
								</Button>
							</Flex>
						</Form>
					)}
				</Formik>
			</Flex>
		</Flex>
	);
};
