import React from "react";
import style from "./Course.module.css";
import { Button } from "../../UI/button/Button";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Input } from "../../UI/inputs/Input";
import { Flex } from "../../UI/flex/Flex";


export const CourseScheduleModal = (props)=>{

    let courseSchedules = props.schedule;

    console.log(courseSchedules);

    
    const confirmHandler = () => {
        props.onConfirm();
    }
//TODO: Reformat the day
    return (
        <div className={style.backdrop} >
            <div className={style.modal}>
                <header className={style.header}>
                    <h2>Horarios</h2>
                    <AiFillCloseCircle onClick={confirmHandler} className={style["close__modal"]} />
                </header>
                <Flex direction={"column"} height={"100%"} className={style["modal__content"]} >
    
                    {courseSchedules.length > 0 ?
                        <>
                            <table className={style.table}>
                                <thead>
                                    <tr>
                                        <th>Día</th> 
                                        <th>Espacio</th>
                                        <th>Salón</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseSchedules.map((courseSchedule) => (
                                        <tr key={courseSchedule.id}>
                                            <td>{courseSchedule.day}</td>
                                            <td>{courseSchedule.timeSlot.startTime + " - " + courseSchedule.timeSlot.endTime}</td>
                                            <td>{courseSchedule.classroom.name + " " + courseSchedule.classroom.location}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                           
                        </>
                        :
                        <p style={{ fontSize: "30px" }}>No hay estudiantes para mostrar</p>
                    }
                    <footer className={style.actions}>
                        <Button onClick={confirmHandler} inLineStyle={{ width: "100px", height:"50px" }}>
                            Confirmar
                        </Button>
                    </footer>


                </Flex>

            </div>
        </div>

    );
}