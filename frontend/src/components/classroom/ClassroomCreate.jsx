import React from "react";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "./Classroom.module.css";
import { Input } from "../../UI/inputs/Input";
export const ClassroomCreate = () => {
    return(
        <Flex
        height={"100%"}
        width={"100%"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"none"}
      >
        <Header>
        <h2 style={{ fontSize: "60px" }}>CREAR SALONES</h2>
        </Header>
        <Flex
        height={"auto"}
        width={"80%"}
        direction={"column"}
        className={style["main-container"]}
        justifyContent={"none"}
        alignItems={"center"}
      >
        <Flex justifyContent={"none"}alignItems={"none"}gap="20px" width={"90%"}>

     
        <Flex direction="column"
               height={"auto"}
               alignItems={"none"}
               justifyContent={"none"}
        >
            <label style={{fontSize:"20px"}}>Nombre:</label>
            <Input style={{height:"10px"}}></Input>

            <label style={{fontSize:"20px"}}>Ubicación:</label>
            <Input style={{height:"10px"}}></Input>

            <label style={{fontSize:"20px"}}>Capacidad:</label>
            <Input style={{height:"10px"}}></Input>

            <label style={{fontSize:"20px"}}>Elementos:</label>
            <Input style={{height:"10px"}}></Input>

            <label style={{fontSize:"20px"}}>Tipologia:</label>
            <Input style={{height:"10px"}}></Input>

            </Flex>
        </Flex>
      </Flex>
    </Flex>
    );
};
