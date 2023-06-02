import { Flex } from "../flex/Flex"
import style from "./Header.module.css";

export const Header = ({children}) =>{
    return (
        <Flex justifyContent={"center"}  width={"80%"} height={"140px"} className={style.container}>
            {children}
        </Flex>
    )
}