import { AiFillCloseCircle } from "react-icons/ai";
import { Header } from "../../../UI/headers/Header";
import { useState } from "react";
import { TimeSlots } from "./TimeSlot";
import Select from "react-select/dist/declarations/src/Select";
import { days } from "../../../enums/Days"
import { IoIosAddCircle } from 'react-icons/io';
import { setScheduleProfessor } from "../../../api/ProfessorApiService";

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

export const ScheduleModal = (props) => {

    const [day, setDay] = useState('');
    const [slots, setSlots] = useState([]);

    const handleStartTimeChange = (index, startTime) => {
        const updatedSlots = [...slots];
        updatedSlots[index].startTime = startTime;
        setSlots(updatedSlots)
    };

    const handleEndTimeChange = (index, endTime) => {
        const updatedSlots = [...slots];
        updatedSlots[index].endTime = endTime;
        setSlots(updatedSlots)
    };

    const handleAddSlot = () => {
        setSlots([...slots, { startTime: '', endTime: '' }]);
    };

    handleSubmit = () => {
        const professorSchedule = {
            day: day,
            timeSlots: slots.map((slot) => ({
                startTime: slot.startTime,
                endTime: slot.endTime,
            })),
        };

        setScheduleProfessor(props.professor.id, professorSchedule)
            .then((response) => {
                succesResponseAlert(response);
            })
            .catch((error) => {
                errorResponseAlert(error);
            });
    };

    const setDayHandler = ({ day }) => {
        setDay(day);
    }

    return (
        <div>
            <div>
                <Header>
                    <h2>Disponibilidad</h2>
                    <AiFillCloseCircle onClick={props.onClick} />
                </Header>

                <Select
                    onChange={setDayHandler}
                    defaultValue={{ label: days[0].name, value: days[0].value }}
                    noOptionsMessage={() => "No se encontraron días"}
                    options={days.map((day) => ({
                        label: day.name,
                        value: day.value
                    }))}
                />

                {
                    slots.map((slot, index) => (
                        <div key={index}>
                            <TimeSlots onStartTimeChange={(startTime) => handleStartTimeChange(index, startTime)}
                                onEndTimeChange={(endTime) => handleEndTimeChange(index, endTime)} />
                        </div>
                    ))
                }
                <div>
                    <IoIosAddCircle onClick={handleAddSlot} style={{ fontSize: '24px', cursor: 'pointer' }} />                </div>
                <button onClick={handleSubmit}>Enviar</button>
            </div>
        </div>
    );
}