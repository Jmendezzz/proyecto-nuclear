import React from "react";

export const Flex = (props)=>{

    const style={
        display: 'flex',
        flexDirection: props.direction || "row",
        wrap: props.wrap || "nowrap",
        alignItems: props.alignItems || "center",
        justifyContent: props.justifyContent || "center",
        height: props.height || "auto",
        width: props.width || "auto",

    }
    return(

        <div className={props.className} style={style}>{props.children}</div>
    );

}