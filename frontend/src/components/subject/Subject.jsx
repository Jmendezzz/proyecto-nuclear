import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import style from "./Subject.module.css";
import {BiEdit} from "react-icons/bi";
import {MdDeleteForever} from "react-icons/md";

export const Subject = () => {
  return (
    <Flex
      height={"100%"}
      width={"100%"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"none"}
    >
      <Header>
        <h2 style={{ fontSize: "60px" }}>ASIGNATURAS</h2>
      </Header>
      <Flex
        height={"100%"}
        width={"80%"}
        direction={"column"}
        className={style["main-container"]}
        justifyContent={"none"}
        alignItems={"center"}
      >
        <Flex height={"200px"} width={"100%"} direction={"row"} gap={"30px"}>
          <div style={{ width: "60%", margin: "10px" }}>
            <Button inLineStyle={{ width: "180px", height: "60px" }}>
              Crear asignatura
            </Button>
          </div>
          <Input
            input={{ placeholder: "Nombre de la asignatura" }}
            style={{ height: "20px" }}
          ></Input>
          <Button
            inLineStyle={{ width: "120px", height: "60px", margin: "10px" }}
          >
            Buscar
          </Button>
        </Flex>
        <table className={style.table}>
          <tr>
            <th >Id</th>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Semestre</th>
            <th>Créditos</th>
            <th>Acciones</th>
          </tr>
          <tr>
            <td className={style.id}>1</td>
            <td>Programación</td>
            <td>Ingeniería de Software</td>
            <td>2</td>
            <td>275</td>
            <td className={style["actions__container"]}>
                <div className={style["icon__edit"]} ><BiEdit/></div>
                <div className={style["icon__delete"]}><MdDeleteForever/></div>

            </td>

          </tr>
          <tr>
            <td className={style.id}>3</td>
            <td>Programación</td>
            <td>Ingeniería de Software</td>
            <td>2</td>
            <td>275</td>
            <td className={style["actions__container"]}>
                <div className={style["icon__edit"]} ><BiEdit/></div>
                <div className={style["icon__delete"]}><MdDeleteForever/></div>

            </td>
          </tr>
          <tr>
            <td className={style.id}>2</td>
            <td>Programación</td>
            <td>Ingeniería de Software</td>
            <td>2</td>
            <td>275</td>
            <td className={style["actions__container"]}>
                <div className={style["icon__edit"]} ><BiEdit/></div>
                <div className={style["icon__delete"]}><MdDeleteForever/></div>

            </td>
          </tr>
        </table>
      </Flex>
    </Flex>
  );
};
