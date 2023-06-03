import { Login } from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Subject } from "./components/subject/Subject";
import {Student } from "./components/student/Student";
import { useEffect } from "react";
import axios from "axios";
function App() {

  const [professor, setProfessor] = useState([]);
  

  useEffect(() => {
    axios
    .get("http://localhost:8080/professor")
    .then((response) => succesResponse(response)
    .catch((error) => console.error(error)));
  }, []);

  return (
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/asignaturas" element={<Subject/>}></Route>
            <Route path="/estudiantes" element={<Student/>}></Route>
            <Route path="/professor" element={<Professor/>}></Route>
          </Routes>
        </Sidebar>
      </BrowserRouter>
  );
}
