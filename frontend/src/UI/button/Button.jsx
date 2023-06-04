import style from "./Button.module.css";

export const Button = ({children,onClick,inLineStyle,isDisabled})=>{

    return(

        <button style={inLineStyle} className={style.button} disabled={isDisabled || false} onClick={onClick}>{children}</button>
        
    )

}