import { useState } from "react";
import { Flex } from "../../../UI/flex/Flex";
import { days } from "../../enums/Days"
import { TbEditCircle } from "react-icons/tb";
import { ScheduleModal } from "./ScheduleModal";


const reformatDay = (schedule) => {
    const foundDay = days.find((day) => day.value === schedule.day);
    return foundDay ? foundDay.name : "";
}

export const ScheduleDays = ({ professor }) => {

    const [schedule, setSchedule] = useState(professor.schedule);
    const [scheduleModal, setScheduleModal] = useState(undefined);

    const showScheduleModalHandler = () => {
        setScheduleModal(true);
    }
    const hideScheduleModalHandler = () => {
            setScheduleModal(undefined);
    }

    return (
        <Flex>
            {scheduleModal && (
					<ScheduleModal onClick={hideScheduleModalHandler} professor={professor} />
				)}
            <div>{reformatDay(schedule)}</div>
            <div>
                {
                    schedule.map(schedule => (
                        <div>
                            <h2>{schedule.day}</h2>
                            {schedule.timeslots.map(ts => (
                                <div>
                                    <h3>{ts.startTime} - {ts.endTime}</h3>
                                    {//TODO BUTTON TO DELETE THE TIMESLOT 
                                    }
                                </div>)
                            )}
                            <TbEditCircle onClick={showScheduleModalHandler}/>
                        </div>
                    )
                    )
                }
            </div>
        </Flex>
    );
};