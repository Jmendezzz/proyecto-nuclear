import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

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

export const ProfessorSchedule = () => {

    const {professorId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [professor, setProfessor] = useState();
	const
}
