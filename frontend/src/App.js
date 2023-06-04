import { Login } from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Subject } from "./components/subject/Subject";
import {Classroom} from './components/classroom/Classroom'
import { SubjectCreate } from "./components/subject/SubjectCreate";
import { SubjectEdit } from "./components/subject/SubjectEdit";
function App() {
  return (
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/asignaturas" element={<Subject/>}></Route>
            <Route path="/salones" element={<Classroom/>}></Route>
            <Route path="/asignaturas/crear" element={<SubjectCreate/>} ></Route>
            <Route path="asignaturas/editar/:subjectId" element={<SubjectEdit/>}></Route>
          </Routes>
        </Sidebar>
      </BrowserRouter>
  );
}

export default App;
