import { useState } from "react";
import { Flex } from "../../../UI/flex/Flex";
import { days } from "../../../enums/Days";
import style from "./Schedule.module.css";

const reformatDay = (schedule) => {
    const foundDay = days.find((day) => day.value === schedule.day);
    console.log(foundDay);
    return foundDay ? foundDay.name : "";
}

export const ScheduleDays = ({ professor }) => {

    const [schedule, setSchedule] = useState(professor.schedule);

    return (
        <Flex>
            <div  className={style["card-container"]}>
            {schedule.map((schedule, index) => (
            <div key={index} className={style.card}>
                <h2>{reformatDay(schedule)}</h2>
                {schedule.timeSlots.map((ts, index) => (
                    <h3 key={index}>{ts.startTime} - {ts.endTime}</h3>
                ))}
                {/* TODO: BUTTON TO DELETE THE TIMESLOT */}
            </div>
        ))}
            </div>
        </Flex>
    );
};
