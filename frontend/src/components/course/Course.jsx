import { Flex } from "../../UI/flex/Flex";
import { useState, useEffect } from "react";
import { getCourses } from "../../api/CourseApiService";
import { Header } from "../../UI/headers/Header";
import style from "./Course.module.css";
import { Button } from "../../UI/button/Button";
import { Input } from "../../UI/inputs/Input";
import { useNavigate } from "react-router-dom";

export const Course = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesChange, setCoursesChange] = useState(false);
    const [search, setSearch] = useState("");

    const succesResponse = (res) => {
        setCourses(res.data);
    };
    const searchHandler = (event)=>{
        setSearch(event.target.value);
      }
    
      if(search.trim() !== ""){
        currentCourses = courses.filter(subject=> subject.name.toLowerCase().includes(search))
      }
      const coursesPerPage = 7;
      const lastCourseIndex = currentPage * coursesPerPage;
      const firstCourseIndex = lastCourseIndex - coursesPerPage;
      let currentCourses = courses.slice(firstCourseIndex, lastCourseIndex);

    useEffect(() => {
        getCourses()
            .then((response) => succesResponse(response))
            .catch((error) => console.log(error)); // TODO
        setCoursesChange(false);
    }, [coursesChange]);


    return (
        <Flex
            height={"100%"}
            width={"100%"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"none"}
        >
            <Header>
                <h2 style={{ fontSize: "60px" }}>CURSOS</h2>
            </Header>
            <Flex
                height={"auto"}
                width={"80%"}
                direction={"column"}
                className={style["main-container"]}
                justifyContent={"none"}
                alignItems={"center"}
            >
                <Flex height={"200px"} width={"100%"} direction={"row"} gap={"30px"}>
                    <div style={{ width: "60%", margin: "10px" }}>
                        <Button
                            inLineStyle={{ width: "180px", height: "60px" }}
                            onClick={() => navigate("/cursos/crear")}
                        >
                            Crear curso
                        </Button>
                    </div>
                    <Input
                        input={{ placeholder: "Nombre del curso", onChange: searchHandler }}
                        style={{ height: "20px" }}
                    ></Input>
                    <Button
                        inLineStyle={{ width: "120px", height: "60px", margin: "10px" }}
                    >
                        Buscar
                    </Button>
                </Flex>
            </Flex>

        </Flex>

    );
}