import { Login } from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Subject } from "./components/subject/Subject";
import {Classroom} from './components/classroom/Classroom'
import {ClassroomCreate} from'./components/classroom/ClassroomCreate'
import { SubjectCreate } from "./components/subject/SubjectCreate";
import { SubjectEdit } from "./components/subject/SubjectEdit";
import { Student } from "./components/student/Student";
import{ClassroomEdit}from "./components/classroom/ClassroomEdit"
import { StudentCreate } from "./components/student/StudentCreate";
import { StudentEdit } from "./components/student/StudentEdit";
import { Professor } from "./components/professor/Professor";
import { ProfessorCreate } from "./components/professor/ProfessorCreate";
import { ProfessorEdit } from "./components/professor/ProfessorEdit";
import { PageNotFoundError } from "./UI/error/PageNotFoundError";



function App() {
  return (
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="*" element={<PageNotFoundError/>}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/asignaturas" element={<Subject/>}></Route>
            <Route path="/salones" element={<Classroom/>}></Route>
            <Route path="/estudiantes" element={<Student/>}></Route>
            <Route path="/profesores" element={<Professor/>}></Route>



            <Route path="/salones/crear" element={<ClassroomCreate/>}></Route>
            <Route path="/asignaturas/crear" element={<SubjectCreate/>} ></Route>
            <Route path="/estudiantes/crear" element={<StudentCreate/>} ></Route>
            <Route path="/profesores/crear" element={<ProfessorCreate/>} ></Route>


            <Route path="asignaturas/editar/:subjectId" element={<SubjectEdit/>}></Route>
            <Route path="salones/editar/:classroomId" element={<ClassroomEdit/>}></Route>
            <Route path="profesores/editar/:professorId" element={<ProfessorEdit/>}></Route>

            <Route path="/estudiantes/editar/:studentId" element={<StudentEdit/>}></Route>

          </Routes>
        </Sidebar>
      </BrowserRouter>
  );
}

export default App;
