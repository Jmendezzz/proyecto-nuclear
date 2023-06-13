import { useEffect, useState } from "react";
import { getStudentById, updateStudent } from "../../api/StudentApiService";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Student.module.css";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../UI/loading/Loading";
import {UserForm} from "../user/UserForm";
import {ErrorResponse} from "../../UI/error/ErrorResponse";

const succesResponseAlert = (response) => {
    Swal.fire({
        title: "Estudiante editado",
        text: "Se ha editado el estudiante " + response.data.name,
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
    const [student, setStudent] = useState();
    const [error, setError] = useState(undefined);

    const errorResponseAction = (error) => {
		setIsLoading(false);
		setError(error);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		getStudentById(studentId)
			.then((response) => {
				console.log(student);
				setStudent(response.data);
				setIsLoading(false);
			})
			.catch((error) =>errorResponseAction(error));
	}, []);

    if (error) {
		return (
			<ErrorResponse
				errStatus={error.response.status}
				errMessage={error.response.data.message}
			/>
		);
	}

    const editStudentHandler = (values) => {
		console.log(values);
        const studentUpdated = {
            id: student.id,
            nid: student.nid,
            name: values.name,
            lastName: values.lastName,
            email: values.email,
            career: values.career,
            semester: values.semester,
            subjects: values.subjects.map((subject) => {return {id: subject.id, name: subject.name}} ),

        }
        updateStudent(studentUpdated)
            .then(response => succesResponseAlert(response))
            .then(() => navigate("/estudiantes"))
            .catch(error => console.log(error))

    }

    return isLoading ? (
		<Loading />
	) : (
		<Flex
			height={"100%"}
			width={"100%"}
			direction={"column"}
			alignItems={"center"}
			justifyContent={"none"}>
			{student && (
				<>
					<Header>
						<h2 style={{fontSize: "60px"}}> EDITAR ESTUDIANTE</h2>
					</Header>
					<Flex
						height={"auto"}
						width={"80%"}
						direction={"column"}
						className={style["main-container"]}
						justifyContent={"none"}
						alignItems={"center"}>
						<UserForm
                            user = {student}
							role ="STUDENT"
							onSubmit = {editStudentHandler}
						/>
					</Flex>
				</>
			)}
		</Flex>
	);


}