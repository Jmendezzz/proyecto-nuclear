import { Flex } from "../../../UI/flex/Flex";
import { days } from "../../../enums/Days";
import style from "./Schedule.module.css";
import { deleteScheduleProfessor } from "../../../api/ProfessorApiService";
import Swal from "sweetalert2";
import { IoIosTrash } from "react-icons/io";

const reformatDay = (schedule) => {
    console.log(schedule);
    const foundDay = days.find((day) => day.value == schedule.day);
    console.log(foundDay)
    return foundDay ? foundDay.name : "";
}
const succesResponseAlert = (response) => {

    Swal.fire({
        title: "Horario Eliminado",
        icon: "success",
        confirmButtonColor: "green",
        confirmButtonText: "Aceptar",
    });
};

export const ScheduleDays = (props) => {

    const schedule = props.schedule;
    const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
    const sortedSchedule = schedule.sort((a, b) => {
        return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
      });

    const deleteScheduleHandler = (id) => {
        deleteScheduleProfessor(id)
            .then((response) => {
                succesResponseAlert(response);
                props.reload(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Flex>
            <div className={style["card-container"]}>
                {sortedSchedule.map((sc, index) => (
                    <div key={index} className={style.card}>
                        {console.log(reformatDay(sc))}
                        {console.log(sc)}
                        <h2>{reformatDay(sc)}</h2>
                        {sc.timeSlots.map((ts, index) => (
                            <h3 key={index}>{ts.startTime} - {ts.endTime}</h3>
                        ))}
                        {(props.isProfessor &&  sc.id) && (
                            
                             <IoIosTrash className={style["delete_btn"]} onClick={deleteScheduleHandler.bind(null, sc.id)} />
                        )}
                    </div>
                ))}
            </div>
        </Flex>
    );
};
