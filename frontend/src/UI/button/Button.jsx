import style from "./Button.module.css";

export const Button = ({children,onClick,inLineStyle})=>{

    return(

        <button style={inLineStyle} className={style.button} onClick={onClick}>{children}</button>
        
    )

}