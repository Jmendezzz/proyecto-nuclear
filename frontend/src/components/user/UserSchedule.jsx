
import React from "react";
import DataTable from "react-data-table-component";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import style from "../subject/Subject.module.css";


const tablaComponentes =[
    {horas:"7am",lunes:"yowi"},
    {horas:"8am",lunes:"yowi"}

]


const columna = [
    {
        name: "Horas",
        selector: "horas",
        sortable: true
    },
    {
        name: "Lunes",
        selector: "lunes",
        sortable: true
    },
    {
        name: "Martes",
        selector: "martes",
        sortable: true
    },
    {
        name: "Miercoles",
        selector: "miercoles",
        sortable: true
    },
    {
        name: "Jueves",
        selector: "jueves",
        sortable: true
    },
    {
        name: "Viernes",
        selector: "viernes",
        sortable: true
    }
]

export const Scheduler = () => {

    return (
        <Flex
            height={"100%"}
            width={"100%"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"none"}
        >
            <Header>
                <h2 style={{ fontSize: "60px" }}>HORARIO</h2>
            </Header>
            <Flex
                height={"auto"}
                width={"80%"}
                direction={"column"}
                className={style["main-container"]}
                justifyContent={"none"}
                alignItems={"center"}
            >
                <Flex
                    justifyContent={"none"}
                    alignItems={"center"}
                    direction={"column"}
                    gap="20px"
                    width={"90%"}
                    className={style["create-subject-container"]}
                >
                    <DataTable
                        columns={columna}
                        data={tablaComponentes}
                    />

                </Flex>
            </Flex>
        </Flex>
    );

}