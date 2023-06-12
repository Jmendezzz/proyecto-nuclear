import { useState } from "react";
import style from "./Schedule.module.css";

export const TimeSlots = ( {onStartTimeChange, onEndTimeChange } ) => {
    const [isTimeValid, setIsTimeValid] = useState(true);

    const handleStartTimeChange = (event) => {
        const startTime = event.target.value;
        const [hour, minute] = startTime.split(":").map(Number);
    if (hour >= 7 && hour <= 22 && minute === 0) {
        onStartTimeChange(startTime);
        setIsTimeValid(true);
    } else {
        setIsTimeValid(false);
    }
    }

    const handleEndTimeChange = (event) => {
        const endTime = event.target.value;
        const [hour, minute] = endTime.split(":").map(Number);
    if (hour >= 7 && hour <= 22 && minute === 0) {
        onEndTimeChange(endTime);
        setIsTimeValid(true);
    } else {
        setIsTimeValid(false);
    }
    }

    return (
        <div className={style.TimeSlots}>
            <input className={style.slotsInp} type="time" step="3600000" onChange={handleStartTimeChange}/>
            {!isTimeValid && ( <div style={{ color: "red" }}> El horario ingresado no es válido </div> ) }
            <input className={style.slotsInp} type="time" step="3600000" onChange={handleEndTimeChange} />
            {!isTimeValid && ( <div style={{ color: "red" }}> El horario ingresado no es válido </div> ) }
        </div>
    );
}
