import { AnimatePresence, motion } from "framer-motion";
import style from "./Sidebar.module.css";
import { AiOutlineDashboard } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { HiUserGroup, HiOutlineBookOpen } from "react-icons/hi";
import { BiChalkboard } from "react-icons/bi";
import logo from "../assets/images/logo-cue-avh.png";
import { useState } from "react";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <AiOutlineDashboard />,
  },
  {
    path: "/profesores",
    name: "Profesores",
    icon: <GiTeacher />,
  },
  {
    path: "/estudiantes",
    name: "Estudiantes",
    icon: <HiUserGroup />,
  },
  {
    path: "/salones",
    name: "Salones",
    icon: <BiChalkboard />,
  },
  {
    path: "/asignaturas",
    name: "Asignaturas",
    icon: <HiOutlineBookOpen />,
  },
];

export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const showAnimation = {
    hidden: {
      display: "none",
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    show: {
      display: "block",
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={style["main-container"]}>
      <motion.div
        animate={{ width: isOpen ? "300px" : "100px" }}
        className={style.sidebar}
      >
        <div className={style["top-section"]}>
          <motion.img
            src={logo}
            animate={{
              width: isOpen ? "210px" : "95px",
              height: isOpen ? "220px" : "120px",
            }}
          ></motion.img>
        </div>
        <div className={style.bar}>
          <FaBars onClick={toggle} />
        </div>
        <section className={style.routes}>
          {routes.map((route) => (
            <NavLink
              to={route.path}
              className={isOpen ? style.link : style["link-closed"]}
              key={route.name}
            >
              <div className="icon">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};
