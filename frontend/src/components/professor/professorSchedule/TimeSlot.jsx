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
        <div>
            <p>Hora inicio</p>
            <input type="time" onChange={handleStartTimeChange}/>
            <p>Hora fin</p>
            <input type="time" onChange={handleEndTimeChange} />
        </div>
    );
}
