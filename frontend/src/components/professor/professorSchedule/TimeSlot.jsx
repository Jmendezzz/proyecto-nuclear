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
            <input className={style.slotsInp} type="time" step="3600000" onChange={handleEndTimeChange} />
            <div>
            {!isTimeValid && ( <div style={{ color: "red" }}> El horario ingresado para la hora no es válido </div> ) }
            </div>
        </div>
        
    );
}
