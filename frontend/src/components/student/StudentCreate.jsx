import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { saveStudent } from "../../api/StudentApiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../user/UserForm";

const succesResponseAlert = (response) => {
	Swal.fire({
		title: "Estudiante creado",
		text: "Se ha creado el estudiante " + response.data.name,
		icon: "success",
		confirmButtonColor: "green",
		confirmButtonText: "Aceptar"

	})

}

const errorResponseAlert = (error) => {
	Swal.fire({
		title: "Error",
		text: error.response.data.detail,
		icon: "error",
		confirmButtonColor: "red",
		confirmButtonText: "Aceptar"
	})

}


export const StudentCreate = () => {

	const navigate = useNavigate();
	const createStudentHandler = (values) => {
		const student = {
			nid: values.nid,
			name: values.name,
			lastName: values.lastName,
			email: values.email,
			subjects: subjectsAdded.map((subject) => { return { id: subject.id, name: subject.name } }),
			career: studentCareerValue,
			semester: values.semester
		}
		saveStudent(student)
			.then(response => succesResponseAlert(response))
			.then(() => navigate("/estudiantes"))
			.catch(error => errorResponseAlert(error))
	}

	return (
		<Flex
			height={"100%"}
			width={"100%"}
			direction={"column"}
			alignItems={"center"}
			justifyContent={"none"}
		>
			<Header>
				<h2 style={{fontSize: "60px"}}>CREAR ESTUDIANTE</h2>
			</Header>
			<UserForm user={null} role="ESTUDENT" onSubmit={createStudentHandler}/>
		</Flex>
	);

};