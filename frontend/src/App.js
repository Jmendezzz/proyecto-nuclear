import { Login } from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Subject } from "./components/subject/Subject";
import {Classroom} from './components/classroom/Classroom'
import { SubjectCreate } from "./components/subject/SubjectCreate";
import { Student } from "./components/student/Student";
import { StudentCreate } from "./components/student/StudentCreate";
import { Professor } from "./components/professor/Professor";

function App() {
  return (
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/asignaturas" element={<Subject/>}></Route>
            <Route path="/salones" element={<Classroom/>}></Route>
            <Route path="/estudiantes" element={<Student/>}></Route>
            <Route path="/professors" element={<Professor/>}></Route>
            <Route path="/asignaturas/crear" element={<SubjectCreate/>} ></Route>
            <Route path="/estudiantes/crear" element={<StudentCreate/>} ></Route>
          </Routes>
        </Sidebar>
      </BrowserRouter>
  );
}

export default App;
