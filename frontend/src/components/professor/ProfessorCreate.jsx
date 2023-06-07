import Swal from "sweetalert2";
import {Flex} from "../../UI/flex/Flex";
import {Header} from "../../UI/headers/Header";
import { saveProfessor } from "../../api/ProfessorApiService";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../user/UserForm";


//Alerts
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
		text: error.response.data.message,
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
			subjects: values.subjects.map((subject) => {return {id: subject.id, name: subject.name}} )
		};
		saveProfessor(professor)
			.then((response) => succesResponseAlert(response))
			.then(() => navigate("/profesores"))
			.catch((error) => console.log(error));
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
			<UserForm user={null} role="PROFESSOR" onSubmit={createProfessorHandler}/>
		</Flex>
	);
};
