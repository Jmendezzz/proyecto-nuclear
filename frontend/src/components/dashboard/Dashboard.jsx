import { ProfessorCourseChart } from "./ProfessorCourseChart";
import { StudentsByCourseChart } from "./StudentsByCourseChart";
import { StudentDistributionChart } from "./StudentsDistributionChart";
import style from "./Dashboard.module.css";
import { Header } from "../../UI/headers/Header";
import { CoursesByLocationChart } from "./CoursesByLocationChart";
import { useEffect, useState } from "react";
import { getStudents } from "../../api/StudentApiService";
import { Loading } from "../../UI/loading/Loading";
import { getCourses } from "../../api/CourseApiService";
import { CoursesByLocationTable } from "./CoursesByLocationTable";
import { ProfessorCourseTable } from "./ProfessorCourseTable";
import { StudentsByCourseTable } from "./StudentsByCourseTable";
import { StudentDistributionTable } from "./StudentDistributionTable";


export const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses()
      .then((response) => {
        setCourses(response.data);
      })
    getStudents()
      .then((response) => {
        setStudents(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return isLoading ? (<Loading />)
    : (
      <div className={style["container"]}>
        <Header>
          <h2 style={{ fontSize: "60px" }}>Dashboard</h2>
        </Header>



        <div className={style["main-container"]}>

          <section className={style["dashboard__general-information"]}>

            <div className={style["general-information__item"]}>

              <h2>Estudiantes</h2>

              <div>
                <h2>30</h2>

              </div>

            </div>

          </section>
          <div className={style["content"]}>
            <div className={style["item"]}>
              <h3>Cursos por profesores </h3>
              {courses !== [] ? (
                <>
                  <div className={style["chart-table-container"]}>
                    <ProfessorCourseChart courses={courses} />
                    <ProfessorCourseTable courses={courses} />
                  </div>
                </>
              ) : (
                <p>No hay cursos</p>
              )}
            </div>

            <div className={style["item"]}>
              <h3>Estudiantes por curso </h3>
              {courses !== [] ? (
                <>
                  <div className={style["chart-table-container"]}>
                    <StudentsByCourseChart courses={courses} />
                    <StudentsByCourseTable courses={courses} />
                  </div>
                </>
              ) : (
                <p>No hay cursos</p>
              )}
            </div>

            <div className={style["item"]}>
              <h3>Estudiantes</h3>
              {students !== null ? (
                <>
                  <div className={style["chart-table-container"]}>
                    <StudentDistributionChart students={students} />
                    <StudentDistributionTable students={students} />
                  </div>
                </>
              ) : (
                <p>No hay Estudiantes</p>
              )}
            </div>
          </div>
        </div>
      </div>

    );
}