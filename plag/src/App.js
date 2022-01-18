import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import DashbordStudent from "./components/DashbordStudent";
import DashboardTeacher from "./components/DashboardTeacher";
import Createassingment from "./components/Createassingment";
import Viewall from "./components/Viewall";

function App() {
  
  return (

    // <DashboardTeacher/>
   
    <Routes>
      <Route exect path="/" element={<Login />}></Route>
      <Route exect path="/signup-student" element={<Signup  />}></Route>
      <Route exect path="/login-teacher" element={<Login teacher={true} />}></Route>
      <Route exect path="/signup-teacher" element={<Signup teacher={true} />}></Route>
    <Route exect path="/student" element={<DashbordStudent/>}></Route>
    <Route exect path="/teacher" element={<DashboardTeacher />}></Route>
    <Route exect path="/create-assingment" element={<Createassingment />}></Route>
    <Route exect path="/view-all" element={<Viewall />}></Route>

    </Routes> 
  )
}

export default App;
