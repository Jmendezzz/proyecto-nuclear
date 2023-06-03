import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import style from "./Subject.module.css";
import { careers } from "../../enums/Career";
export const SubjectCreate = () => {
  return (
    <Flex
      height={"100%"}
      width={"100%"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"none"}
    >
      <Header>
        <h2 style={{ fontSize: "60px" }}>CREAR ASGINATURA</h2>
      </Header>
      <Flex
        height={"auto"}
        width={"80%"}
        direction={"column"}
        className={style["main-container"]}
        justifyContent={"none"}
        alignItems={"center"}
      >
        <Flex justifyContent={"none"} alignItems={"none"} direction={"column"} gap="20px" width={"90%"}>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Nombre</label>
            <Input style={{ height: "10px" }}></Input>
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Carrera</label>
            <Input style={{ height: "10px" }}></Input>
          </Flex>
          <Flex
            direction={"column"}
            height={"auto"}
            alignItems={"none"}
            justifyContent={"none"}
          >
            <label style={{ fontSize: "20px" }}>Semestre</label>
            <Input style={{ height: "10px" }} type="number"></Input>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
