import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import DashbordStudent from "./components/DashbordStudent";

function App() {
  return (

    // <DashbordStudent/>
    <Routes>
      <Route exect path="/" element={<Login />}></Route>
      <Route exect path="/signup-student" element={<Signup  />}></Route>
      <Route exect path="/login-teacher" element={<Login teacher={true} />}></Route>
      <Route exect path="/signup-teacher" element={<Signup teacher={true} />}></Route>
    </Routes>
  );
}

export default App;
