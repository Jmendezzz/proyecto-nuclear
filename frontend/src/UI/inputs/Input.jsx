import React from "react";
import style from "./Input.module.css";

export const Input = (props)=>{

    return <input style={props.style} className={style.input} {...props.input}></input>

}