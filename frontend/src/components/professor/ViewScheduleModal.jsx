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
                <Flex height={"auto"}
						width={"80%"}
						direction={"column"}
						className={style["main-container"]}
						justifyContent={"none"}
						alignItems={"center"}>
                        {props.professor.schedule ? 
                        <p>El profesor {props.professor.name} no ha asignado disponibilidad</p>
                        :
                        <div>
                            <ScheduleDays schedule={props.professor.schedule} isProfessor={false} />
                        </div>
                        }
                </Flex>
            </div>
        </div>
    )

}