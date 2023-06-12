import { AiFillCloseCircle } from "react-icons/ai";
import style from "./professorSchedule/Schedule.module.css";
import { Flex } from "../../UI/flex/Flex";
import { ScheduleDays } from "./professorSchedule/ScheduleDays";

export const ViewScheduleModal = (props) => {
    

    return (
        <div className={style.backdrop}>
            <div className={style.modal}>
                <header className={style.header}>
                    <h2>Disponibilidad del profesor {props.professor.name} </h2>
                    <AiFillCloseCircle onClick={props.onClick} className={style["close__modal"]} style={{ fontSize: '24px', cursor: 'pointer' }} />
                </header>
                <Flex height={"400px"}
						width={"80%"}
						direction={"column"}
						className={style["main-container"]}
						justifyContent={"center"}
						alignItems={"center"}>
                        {props.professor.schedule.length === 0 ? 
                        <b style={{ alignItems: "center",fontSize: "20px",color: "red"}}>El profesor {props.professor.name} no ha asignado disponibilidad</b>
                        :
                        <div style={{ alignItems: "center"}}>
                            <ScheduleDays schedule={props.professor.schedule} isProfessor={false} />
                        </div>
                        }
                </Flex>
            </div>
        </div>
    )

}