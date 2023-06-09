import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {ErrorResponse} from "../../UI/error/ErrorResponse";
import Swal from "sweetalert2";
import { getProfessorById } from "../../api/ProfessorApiService";

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
			<ErrorResponse errStatus={error.response.status}
			errMessage={error.response.data.message} />
		);
	}

	const setScheduleHandler = (values) => {
		const professorSchedule = {
			day: values.DayOfWeek,
			timeSlots: values.timeSlots.map((ts) => {
				return {startTime: ts.startTime, endTime: ts.endTime};
			}),
		};
	}

	/*return(

	);*/
}