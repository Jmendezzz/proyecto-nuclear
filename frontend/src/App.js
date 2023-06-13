import { Login } from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Subject } from "./components/subject/Subject";
import { Classroom } from "./components/classroom/Classroom";
import { ClassroomCreate } from "./components/classroom/ClassroomCreate";
import { SubjectCreate } from "./components/subject/SubjectCreate";
import { SubjectEdit } from "./components/subject/SubjectEdit";
import { Student } from "./components/student/Student";
import { ClassroomEdit } from "./components/classroom/ClassroomEdit";
import { StudentCreate } from "./components/student/StudentCreate";
import { StudentEdit } from "./components/student/StudentEdit";
import { Professor } from "./components/professor/Professor";
import { ProfessorCreate } from "./components/professor/ProfessorCreate";
import { ProfessorEdit } from "./components/professor/ProfessorEdit";
import { PageNotFoundError } from "./UI/error/PageNotFoundError";
import { Course } from "./components/course/Course";
import { GenerateCourse } from "./components/course/GenerateCourse";
import { ProfessorSchedule } from "./components/professor/ProfessorSchedule";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import { ProtectedAuthorizationRoutes } from "./components/routes/ProtectedAuthorizationRoutes";
import { roles } from "./enums/Roles";
import { ErrorResponse } from "./UI/error/ErrorResponse";
import { UserConfiguration } from "./components/user/UserConfiguration";
import { UserCalendar } from "./components/user/UserCalendar";
import { Dashboard } from "./components/dashboard/Dashboard";



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Sidebar>
          <Routes>
            {/* public routes*/}
            <Route path="*" element={<PageNotFoundError />}></Route>

            <Route path="/login" element={<Login />}></Route>

            <Route path="/unauthorized" element={<ErrorResponse errStatus={"403"} errMessage={"No estas autorizado para ingresar a esta página"}/>} />

            {/* authenticated routes */}
            <Route element={<ProtectedRoutes/>}>

              {/* admin routes */}

              <Route element={<ProtectedAuthorizationRoutes rolesProvided={[roles.ADMIN]}/>} >

                <Route path="/asignaturas" element={<Subject />}/>
                <Route path="/asignaturas/crear" element={<SubjectCreate/>}/>
                <Route path="asignaturas/editar/:subjectId" element={<SubjectEdit />} />


                <Route path="/salones" element={<Classroom />}/>
                <Route path="/salones/crear" element={<ClassroomCreate />}/>
                <Route path="salones/editar/:classroomId" element={<ClassroomEdit />} />

            <Route path="/salones/crear" element={<ClassroomCreate/>}></Route>
            <Route path="/asignaturas/crear" element={<SubjectCreate/>} ></Route>
            <Route path="/estudiantes/crear" element={<StudentCreate/>} ></Route>
            <Route path="/profesores/crear" element={<ProfessorCreate/>} ></Route>

                <Route path="/estudiantes" element={<Student />}/>
                <Route path="/estudiantes/crear" element={<StudentCreate />}/>
                <Route path="/estudiantes/editar/:studentId" element={<StudentEdit />} />


                <Route path="/profesores" element={<Professor />}/>
                <Route path="/profesores/crear" element={<ProfessorCreate />}/>
                <Route path="profesores/editar/:professorId"element={<ProfessorEdit />}/>
            <Route path="/profesores/disponibilidad" element={<ProfessorSchedule />}></Route>

                <Route path="/cursos" element={<Course />}/>
                <Route path="/cursos/generar" element={<GenerateCourse />}/>

              </Route>

              <Route element={<ProtectedAuthorizationRoutes rolesProvided={[roles.PROFESSOR, roles.STUDENT, roles.ADMIN]}/>} >

                <Route path="/configuracion" element={<UserConfiguration/>}></Route>

              </Route>
              <Route element={<ProtectedAuthorizationRoutes rolesProvided={[roles.PROFESSOR]}/>} >
                <Route path="/disponibilidad" element={<ProfessorSchedule />} />                </Route>



            </Route>


            <Route path="/horario" element={<UserCalendar/>}></Route>

            <Route path="/estadisticas" element={<Dashboard/>}></Route>

          </Routes>

        </Sidebar>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
