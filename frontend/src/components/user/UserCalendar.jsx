import { Header } from "../../UI/headers/Header";
import { Calendar } from "../calendar/Calendar";
import style from "./User.module.css"

export const UserCalendar = () => {
    const course = [{
        id:1,
        professor: {
            id: 1,
            nid: 1234,
            name: "pepe",
            lastName: "caro",
            email:"safa@dasda.com"
        },
        subject: {
            id:1,
            name:"calculus",
            career: "software",
            academicHours:96,
            period: "TRIMESTRAL",
            semester: 1,
            credits: 3
        },
        students: [{
            id:1,
            name:"pepito"
        }],
        courseSchedule: [
            {
                id: 1,
                classroom: {
                    id:1,
                    name:"203"
                },
                day:"FRIDAY",
                timeSlot: {
                    startTime: "16:00:00",
                    endTime: "19:00:00"
                }
            },
            {
                id: 1,
                classroom: {
                    id:1,
                    name:"203"
                },
                day:"THURSDAY",
                timeSlot: {
                    startTime: "16:00:00",
                    endTime: "19:00:00"
                }
            }
        ]
    }]
    return (
        <div className={style["container"]}>
            <Header>
                <h2 style={{ fontSize: "60px" }}>Horario</h2>
            </Header>
            <div className={style["main-container"]}>
                <Calendar data={course} />
            </div>
        </div>
    );
}