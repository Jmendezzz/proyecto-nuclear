import React from "react";
import style from "./Input.module.css";

export const Input = (props)=>{

    return <input className={style.input} {...props.input}></input>

}