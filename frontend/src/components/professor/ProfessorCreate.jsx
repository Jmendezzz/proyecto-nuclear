import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {Flex} from "../../UI/flex/Flex";
import {Header} from "../../UI/headers/Header";
import {ErrorMessage, Field, Form, Formik} from "formik";
import { saveProfessor } from "../../api/ProfessorApiService";
import { Button } from "../../UI/button/Button";
import { isEmpty } from "../../validations/InputValidations";
import style from "./Professor.module.css";


const validateForm = (values) => {
	const errors = {};
    if (isEmpty(values.nid)) errors.nid = 'El nid no puede ser vacío';
    if (isEmpty(values.name)) errors.name = 'El nombre no puede ser vacío';
    if (isEmpty(values.lastname)) errors.lastname = 'El apellido no puede ser vacío';
    if (isEmpty(values.email)) errors.email = 'El email no puede ser vacío';
    return errors;
};
const succesResponseAlert = (response) => {
	Swal.fire({
		title: "Profesor creado",
		text: "Se ha creado el profesor " + response.data.name,
		icon: "success",
		confirmButtonColor: "green",
		confirmButtonText: "Aceptar",
	});
};
const errorResponseAlert = (error) => {
	Swal.fire({
		icon: "error",
		title: "Oops...",
		text: error.response.data.detail,
		confirmButtonColor: "red",
		confirmButtonText: "Aceptar",
	});
};

export const ProfessorCreate = () => {
	const navigate = useNavigate();
	const createProfessorHandler = (values) => {
		const professor = {
			nid: values.nid,
			name: values.name,
			lastName: values.lastName,
			email: values.email,
			//TODO assign subjects
		};
		saveProfessor(professor)
			.then((response) => succesResponseAlert(response))
			.then(() => navigate("/profesores"))
			.catch((error) => errorResponseAlert(error));
	};
	return (
		<Flex
			height={"100%"}
			width={"100%"}
			direction={"column"}
			alignItems={"center"}
			justifyContent={"none"}
		>
			<Header>
				<h2 style={{fontSize: "60px"}}>CREAR PROFESOR</h2>
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
                        nid: "",
                        name: "",
                        lastName: "",
                        email: "",
                    }} onSubmit={createProfessorHandler}
                    validate={validateForm}>
						{({errors, touched}) => (
							<Form className={style.form}>
								<Flex
									direction={"column"}
									height={"auto"}
									alignItems={"none"}
									justifyContent={"none"}
									className={ errors.name && touched.name ? style["form__item-error"] : style["form__item"] }
								>
									<label
										style={{
											fontSize: "20px",
											color: errors.name && touched.name ? "red" : "black" }}>
										Numero de identificación
									</label>
									<Field name="nid" />
									<ErrorMessage name="nid" style={{ fontSize: "17px", color: "red" }} component={"small"} />
								</Flex>
                                <Flex
									direction={"column"}
									height={"auto"}
									alignItems={"none"}
									justifyContent={"none"}
									className={ errors.name && touched.name ? style["form__item-error"] : style["form__item"] }
								>
									<label
										style={{
											fontSize: "20px",
											color: errors.name && touched.name ? "red" : "black" }}>
										Nombre
									</label>
									<Field name="name" />
									<ErrorMessage name="name" style={{ fontSize: "17px", color: "red" }} component={"small"} />
								</Flex>
                                <Flex
									direction={"column"}
									height={"auto"}
									alignItems={"none"}
									justifyContent={"none"}
									className={ errors.name && touched.name ? style["form__item-error"] : style["form__item"] }
								>
									<label
										style={{
											fontSize: "20px",
											color: errors.name && touched.name ? "red" : "black" }}>
										Apellido
									</label>
									<Field name="lastName" />
									<ErrorMessage name="lastName" style={{ fontSize: "17px", color: "red" }} component={"small"} />
								</Flex>
                                <Flex
									direction={"column"}
									height={"auto"}
									alignItems={"none"}
									justifyContent={"none"}
									className={ errors.name && touched.name ? style["form__item-error"] : style["form__item"] }
								>
									<label
										style={{
											fontSize: "20px",
											color: errors.name && touched.name ? "red" : "black" }}>
										Email
									</label>
									<Field name="email" />
									<ErrorMessage name="email" style={{ fontSize: "17px", color: "red" }} component={"small"} />
								</Flex>
                                <Flex>
                                    <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px", backgroundColor: "blue" }}>Guardar</Button>
                                    <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px" }} onClick={() => navigate("/profesores")}></Button>
                                </Flex>
							</Form>
						)}
					</Formik>
				</Flex>
			</Flex>
		</Flex>
	);
};
