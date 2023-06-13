import { useState } from "react";
import { Header } from "../../UI/headers/Header";
import { Calendar } from "../calendar/Calendar";
import style from "./User.module.css"

export const UserCalendar = () => {
    const [course, setCurse] = useState([]);
    

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