import { useEffect, useState } from "react";
import { Header } from "../../UI/headers/Header";
import { Calendar } from "../calendar/Calendar";
import style from "./User.module.css"
import { getCoursesByProfessorId, getCoursesByStudentId } from "../../api/CourseApiService";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../../UI/loading/Loading";

export const UserCalendar = () => {
    const {userId} = useAuth();
    const {role} = useAuth();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() =>{
        console.log(role === 'PROFESSOR');
        if (role === 'PROFESSOR') {
            getCoursesByProfessorId(userId)
            .then((response)=>{
            console.log(userId);
            console.log(response.data);
            setCourses(response.data);
            setIsLoading(false);
        })
        .catch( (error) => console.log(error) )
        } else {console.log(userId);
        getCoursesByStudentId(userId)
        .then((response) => {
            console.log(response.data);
            setCourses(response.data);
            setIsLoading(false);
        })}
    },[])

    return  isLoading ? (
        <Loading />
    ):(
        <div className={style["container"]}>
            <Header>
                <h2 style={{ fontSize: "60px" }}>Horario</h2>
            </Header>
            <div className={style["main-container"]}>
                <Calendar data={courses} />
            </div>
        </div>
    );
}