import { Login } from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Subject } from "./components/subject/Subject";
import {Classroom} from './components/classroom/Classroom'
function App() {
  return (
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/asignaturas" element={<Subject/>}></Route>
            <Route path="/salones" element={<Classroom/>}></Route>


          </Routes>
        </Sidebar>
      </BrowserRouter>
  );
}

export default App;
