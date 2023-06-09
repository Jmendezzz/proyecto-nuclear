import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {Loading} from "../../UI/loading/Loading";
import {Header} from "../../UI/headers/Header";
import {Flex} from "../../UI/flex/Flex";
import {ErrorResponse} from "../../UI/error/ErrorResponse";
import style from "./Professor.module.css";
import {getProfessorById, updateProfessors} from "../../api/ProfessorApiService";
import {UserForm} from "../user/UserForm";

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
	const navigate = useNavigate();

	const {professorId} = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [professor, setProfessor] = useState();
	const [error, setError] = useState(undefined);

	const errorResponseAction = (error) => {
		setIsLoading(false);
		setError(error);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		getProfessorById(professorId)
			.then((response) => {
				setProfessor(response.data);
				setIsLoading(false);
			})
			.catch((error) => console.log(error));
	}, []);

	if (error) {
		return (
			<ErrorResponse
				errStatus={error.response.status}
				errMessage={error.response.data.message}
			/>
		);
	}

	const editProfessorHandler = (values) => {
		const professorUpdated = {
			id: professor.id,
            nid: professor.nid,
			name: values.name,
			lastName: values.lastName,
			email: values.email,
			subjects: values.subjects.map((subject) => {
				return {id: subject.id, name: subject.name};
			}),
		};
		updateProfessors(professorUpdated)
			.then((response) => succesResponseAlert(response))
			.then(() => navigate("/profesores"))
			.catch((error) => errorResponseAlert(error));
	};

	return isLoading ? (
		<Loading />
	) : (
		<Flex
			height={"100%"}
			width={"100%"}
			direction={"column"}
			alignItems={"center"}
			justifyContent={"none"}>
			{professor && (
				<>
					<Header>
						<h2 style={{fontSize: "60px"}}> EDITAR PROFESOR</h2>
					</Header>
					<Flex
						height={"auto"}
						width={"80%"}
						direction={"column"}
						className={style["main-container"]}
						justifyContent={"none"}
						alignItems={"center"}>
						<UserForm
                            user = {professor}
							role ="PROFESSOR"
							onSubmit = {editProfessorHandler}
						/>
					</Flex>
				</>
			)}
		</Flex>
	);
};
