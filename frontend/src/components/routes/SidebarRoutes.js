import { GiTeacher } from "react-icons/gi";
import { HiUserGroup, HiOutlineBookOpen } from "react-icons/hi";
import { BiChalkboard } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { BsFillGearFill } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdEventAvailable } from "react-icons/md";
import {AiOutlineSchedule} from "react-icons/ai";

export const adminRoutes = [
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
  {
    path: "/cursos",
    name: "Cursos",
    icon: <SiGoogleclassroom />,
  },
  {
    path: "/configuracion",
    name: "Configuración",
    icon: <BsFillGearFill />,
  },
];

export const professorRoutes = [
  {
    path: "/horario",
    name: "Horario",
    icon: <AiOutlineSchedule />,
  },
  {
    path: "/configuracion",
    name: "Mi disponibilidad",
    icon: <MdEventAvailable />,
  },
  {
    path: "/configuracion",
    name: "Configuración",
    icon: <BsFillGearFill />,
  },
];


export const studentRoutes  = [
    {
        path: "/horario",
        name: "Horario",
        icon: <AiOutlineSchedule/>,
      },
      {
        path: "/configuracion",
        name: "Configuración",
        icon: <BsFillGearFill />,
      },
]