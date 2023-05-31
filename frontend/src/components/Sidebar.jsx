import { motion } from "framer-motion";
import style from "./Sidebar.module.css";
import { AiOutlineDashboard} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import {FaBars} from "react-icons/fa";
import {GiTeacher} from "react-icons/gi";
import logo from '../assets/images/logo-cue-avh.png';

const routes = [
    {
        path:"/",
        name: "Dashboard",
        icon: <AiOutlineDashboard/>
    },
    {
        path:"/profesores",
        name: "Profesores",
        icon: <GiTeacher/>

    }
]

export const Sidebar = ({children}) =>{
    return (
        <div className={style["main-container"]}>
            <motion.div animate={{width: "300px"}} className={style.sidebar}>
                <div className={style["top-section"]}>
                    <img src={logo} className={style.logo}></img>
                </div>
                <div className={style.bar} >
                    <FaBars/>
                </div>
                <section className={style.routes} >
                    {routes.map((route)=>(
                        <NavLink to={route.path} className={style.link} key={route.name}>
                            <div className="icon">{route.icon}</div>
                            <p>{route.name}</p>

                        </NavLink>

                    ))}
                </section>
            </motion.div>
            <main>{children}</main>

        </div>
    );

}