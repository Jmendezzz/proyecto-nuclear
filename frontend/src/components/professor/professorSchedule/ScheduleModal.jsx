import { AiFillCloseCircle } from "react-icons/ai";
import { Header } from "../../../UI/headers/Header";
import { useState } from "react";
import { TimeSlots } from "./TimeSlot";
import Select from "react-select";
import { days } from "../../../enums/Days"
import { IoIosAddCircle } from 'react-icons/io';
import { setScheduleProfessor } from "../../../api/ProfessorApiService";
import Swal from "sweetalert2";
import style from "./Schedule.module.css";
import { Button } from "../../../UI/button/Button";
import { useNavigate } from "react-router-dom";


//Alerts
const succesResponseAlert = (response) => {
	Swal.fire({
		title: "Horario guardado",
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

    const navigate = useNavigate();

    const [day, setDay] = useState();
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

    const handleSubmit = () => {
        const professorSchedule = {
            day: day,
            timeSlots: slots.map((slot) => ({
                startTime: slot.startTime,
                endTime: slot.endTime
            })),
        };

        setScheduleProfessor(props.professor.id, professorSchedule)
            .then((response) => {
                succesResponseAlert(response);
                window.location.reload();
            })
            .then(() => navigate(`/profesores/disponibilidad/${props.professor.id}`))
            .catch((error) => {
                errorResponseAlert(error);
            });
    };

    const setDayHandler = ({ value }) => {
        setDay(value);
    }

    return (
        <div className={style.backdrop}>
            <div className={style.modal}>
                <Header className={style.header}>
                    <h2>Disponibilidad</h2>
                    <AiFillCloseCircle onClick={props.onClick} className={style["close__modal"]} style={{ fontSize: '24px', cursor: 'pointer' }} />
                </Header>
                <div className={style["schedule-container"]}>
                <Select
                    onChange={setDayHandler}
                    defaultValue={{ label: days[0].name, value: days[0].value }}
                    noOptionsMessage={() => "No se encontraron días"}
                    options={days.map((day) => ({
                        label: day.name,
                        value: day.value
                    }))}
                />
                {console.log(day)}
                <div className={style.timeSlots}>
                <p className={style.startTime}>Hora inicio</p>
                <p className={style.endTime}>Hora fin</p>
                <IoIosAddCircle onClick={handleAddSlot} className={style.btnAdd} style={{ fontSize: '24px', cursor: 'pointer' }} />
                </div>
                {
                    slots.map((slot, index) => (
                        <div key={index}>
                            <TimeSlots onStartTimeChange={(startTime) => handleStartTimeChange(index, startTime)}
                                onEndTimeChange={(endTime) => handleEndTimeChange(index, endTime)} />
                        </div>
                    ))
                }
                <Button inLineStyle={ {width: "140px", height: "80px", margin: "10px"} } onClick={handleSubmit}>Enviar</Button>
            </div>
            </div>
        </div>
    );
}