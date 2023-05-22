import { Login } from './components/login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route path="/login" element={<Login/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
