import style from "./User.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import { Flex } from "../../UI/flex/Flex";
export const SubjectModal=(props)=>{
    return(
        <div className={style.backdrop}>
        <div className={style.modalSubject}>
            <header className={style.header}>
                <h2>Lista de Asignaturas</h2>
                <AiFillCloseCircle onClick={props.onClick} className={style["close__modal"]} />
            </header>
          
            <Flex height={"800px"}
				  width={"80%"}
				  direction={"column"}
				  justifyContent={"center"}
				  alignItems={"center"}>
               <ul>
                {props.subjects.map((subject)=>{
                  return <li style={{ alignItems: "center",fontSize: "20px", }} >{subject.name}</li>
                })}
               </ul>
               
            </Flex>
           
        </div>
    </div>
    )
}