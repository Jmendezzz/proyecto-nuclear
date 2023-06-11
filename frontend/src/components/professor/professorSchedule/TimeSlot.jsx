import style from "./Schedule.module.css";

export const TimeSlots = ( {onStartTimeChange, onEndTimeChange } ) => {

    const handleStartTimeChange = (event) => {
        const startTime = event.target.value;
        onStartTimeChange(startTime);
    }

    const handleEndTimeChange = (event) => {
        const endTime = event.target.value;
        onEndTimeChange(endTime);
    }

    return (
        <div className={style.TimeSlots}>
            <input className={style.slotsInp} type="time" step="3600000" onChange={handleStartTimeChange}/>
            <input className={style.slotsInp} type="time" step="3600000" onChange={handleEndTimeChange} />
        </div>
    );
}
