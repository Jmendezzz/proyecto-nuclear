import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorResponse } from "../../UI/error/ErrorResponse";
import { getProfessorById } from "../../api/ProfessorApiService";
import { Loading } from "../../UI/loading/Loading";
import { Header } from "../../UI/headers/Header";
import { Flex } from "../../UI/flex/Flex";
import { Button } from "../../UI/button/Button";
import { ScheduleDays } from "./professorSchedule/ScheduleDays";
import { ScheduleModal } from "./professorSchedule/ScheduleModal";


export const ProfessorSchedule = () => {

	const { professorId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [professor, setProfessor] = useState();
	const [error, setError] = useState(undefined);
	const [scheduleModal, setScheduleModal] = useState(undefined);
	const [subjectThreeHours, setSubjectsThreeHours] = useState([])

	const showScheduleModalHandler = () => {
        setScheduleModal(true);
    }
    const hideScheduleModalHandler = () => {
            setScheduleModal(undefined);
    }

	const errorResponseAction = (error) => {
		setIsLoading(false);
		setError(error);
	};

	const filterSubjects = (subjects) => {
    	return subjects.filter(subject => subject && subject.period === 'TRIMESTRAL' && subject.academicHours === 96);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		getProfessorById(professorId)
			.then((response) => {
				setProfessor(response.data);
				setSubjectsThreeHours( filterSubjects( response.data.subjects ) );
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

	return isLoading ? (
		<Loading />
	) : (
		<Flex height={"100%"}
			width={"100%"}
			direction={"column"}
			alignItems={"center"}
			justifyContent={"none"}>
				{scheduleModal && (
					<ScheduleModal onClick={hideScheduleModalHandler} professor={professor} />
				)}
				<Header>
					<h2>AGREGUE SU DISPONIBILIDAD</h2>
				</Header>
				{console.log(subjectThreeHours)}
				{
					subjectThreeHours.length !== 0 ?
					<h3>Recuerde ingresar al menos tres intervalos de tres horas para las materias {subjectThreeHours.map(s=> s.name)} </h3>
					: 
					<h3>Recuerde ingresar intervalos de dos horas para las materias: {professor.subjects.map(s=> s.name)} </h3>
				}
			{
				professor.schedule ? <>
					<div>
						<ScheduleDays professor={professor} />
					</div>
				<Button inLineStyle={ {width: "140px", height: "80px", margin: "10px"} } onClick={showScheduleModalHandler}>Ingrese su horario</Button>
				</> : <>
				<Button inLineStyle={ {width: "140px", height: "80px", margin: "10px"} } onClick={showScheduleModalHandler}>Ingrese su horario</Button>
				</>
			}
		</Flex>
	);
}
