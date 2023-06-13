import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { TimeSlots } from "./TimeSlot";
import Select from "react-select";
import { days } from "../../../enums/Days"
import { IoIosAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import { setScheduleProfessor } from "../../../api/ProfessorApiService";
import style from "./Schedule.module.css";
import { Button } from "../../../UI/button/Button";




export const ScheduleModal = (props) => {

    const [day, setDay] = useState(days[0].value);
    const [slots, setSlots] = useState([]);
    const [error, setError] = useState('');

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
        if (slots.length < 7) {
            setSlots([...slots, { startTime: '', endTime: '' }]);
        }
    };
    const handleRemoveSlot = (index) => {
        const updatedSlots = [...slots];
        updatedSlots.splice(index, 1);
        setSlots(updatedSlots);
    };
    const handleError = (slots) => {
        if (slots.length === 0) {
            setError('Debe agregar al menos un campo');
            return true;
        }
        const hasEmptySlots = slots.some((slot) => slot.startTime === '' || slot.endTime === '');
        const hasDuplicates = slots.some((slot, index) =>
            slots.some(
                (otherSlot, otherIndex) =>
                    index !== otherIndex &&
                    (slot.startTime === otherSlot.startTime || slot.endTime === otherSlot.endTime)
            )
        );
        if (hasEmptySlots) {
            setError('Debe llenar todos los campos, o eliminar los vacios');
            return true;
        }
        if (hasDuplicates) {
            setError('No pueden haber campos iguales');
            return true;
        }
        setError("");
    }

    const handleSubmit = () => {
        if (!handleError(slots)) {
            const professorSchedule = slots.map((slot) => ({
                day: day,
                timeSlots: [{
                    startTime: slot.startTime,
                    endTime: slot.endTime
                }]
            }));
            props.updateSchedulesProfessor(professorSchedule);
            props.onClick();
        }
    };

    const setDayHandler = ({ value }) => {
        setDay(value);
    }

    return (
        <div className={style.backdrop}>
            <div className={style.modal}>
                <header className={style.header}>
                    <h2 >Disponibilidad</h2>
                    <AiFillCloseCircle onClick={props.onClick} className={style["close__modal"]} style={{ fontSize: '24px', cursor: 'pointer' }} />
                </header>
                <div className={style["schedule-container"]}>
                    <Select
                        className={style.select_modal}
                        onChange={setDayHandler}
                        defaultValue={{ label: days[0].name, value: days[0].value }}
                        noOptionsMessage={() => "No se encontraron días"}
                        options={days.map((day) => ({
                            label: day.name,
                            value: day.value
                        }))}
                    />
                    <div className={style.timeSlots}>
                        <div style={{width:"80%"}}>
                            <p className={style.startTime}>Hora inicio</p>
                            <p className={style.endTime}>Hora fin</p>
                        </div>

                        <IoIosAddCircle onClick={handleAddSlot}
                            className={style.btnAdd}
                            style={{
                                fontSize: '24px',
                                cursor: slots.length >= 7 ? 'not-allowed' : 'pointer',
                                opacity: slots.length >= 7 ? '0.5' : '1',
                                pointerEvents: slots.length >= 7 ? 'none' : 'auto'
                            }} />
                    </div>
                    {
                        slots.map((slot, index) => (
                            <div key={index} className={style.timeSlotContainer}>
                                <TimeSlots onStartTimeChange={(startTime) => handleStartTimeChange(index, startTime)}
                                    onEndTimeChange={(endTime) => handleEndTimeChange(index, endTime)} />
                                <button
                                    className={style.removeButton}
                                    onClick={() => handleRemoveSlot(index)}
                                >
                                    <IoMdRemoveCircle />
                                </button>
                            </div>
                        ))
                    }
                    {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                    <Button
                        inLineStyle={{ width: "140px", height: "40px", margin: "10px" }}
                        onClick={handleSubmit}
                        disabled={slots.length === 0 || slots.some((slot) => !slot.startTime || !slot.endTime)}
                    >
                        Enviar
                    </Button>
                </div>
            </div>
        </div>
    );
}